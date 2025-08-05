import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification, User } from "firebase/auth";
import { auth, db } from "../../Server/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { HandleError } from "../../error";
import { clearUserData, setUserData } from "../user";
import { sendPasswordResetEmail } from "firebase/auth";
import { setLoadData } from "../load";

export const loginWithEmail = createAsyncThunk(
	"auth/loginWithEmail",
	async ({ email, password }: { email: string; password: string }, { dispatch, rejectWithValue }) => {
		const verifyEmail = async (user: User) => {
			if (!user.emailVerified) {
				await sendEmailVerification(user);
				throw new Error("Conta não confirmada, verifique o link enviado em seu e-mail antes de continuar!");
			}
		};

		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);

			const user = userCredential.user;

			if (!user.emailVerified) {
				await verifyEmail(user);
				await dispatch(logout());
				return rejectWithValue("E-mail não verificado. Verifique seu e-mail e tente novamente.");
			}

			const userRef = doc(db, "usuario", user.uid);
			const docSnap = await getDoc(userRef);

			const acessQuery = query(collection(db,"acesso"),where("id","==",user.uid),where("status","==",true));
			const accessSnapShot = await getDocs(acessQuery);

			if (!docSnap.exists() || !docSnap.data()) {
				HandleError("Dados do usuário não encontrados!");
				await dispatch(logout());
				return rejectWithValue("Dados do usuário não encontrados!");
			}

			if (!accessSnapShot.docs[0]) {
				HandleError("Dados de acesso do usuario não encontrados!");
				await dispatch(logout());
				return rejectWithValue("Dados de acesso do usuario não encontrados!");
			}


			if (!docSnap.data().status) {
				HandleError("Usuário inativo na plataforma!");
				await dispatch(logout());
				return rejectWithValue("Usuário inativo na plataforma!");
			}

			if (docSnap.data().status && accessSnapShot.docs[0].data().status) {
				const dados = docSnap.data();

				const usuario = {
					uid: user.uid,
					nome: dados.name,
					email: user.email??"",
					telefone: dados.telefone,
					role: accessSnapShot.docs[0].data().nivel,
					status: dados.status,
					dinamico: dados.dinamico,
					currentSession: dados.currentSession,
				};

				dispatch(setUserData(usuario));
				return usuario;
			}
		} catch (error: unknown) {
			// console.error("Erro real de login:", error.code || "", error.message || "", error);
			// console.log("Erro detalhado", JSON.stringify(error, null, 2));

			// HandleError(error)

			// await dispatch(logout());
			return rejectWithValue(error|| "Erro ao fazer login");
		}
	}
);

export const observeAuthState = createAsyncThunk<
  { uid: string; email: string | null } | null
>("auth/observeAuthState", async () => {
  const user = await new Promise<{ uid: string; email: string | null } | null>(
    (resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve({
            uid: user.uid,
            email: user.email,
          });
        } else {
          resolve(null);
        }
      });
    }
  );

  return user;
});

export const logout = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
	try {
		await signOut(auth);
		dispatch(clearUserData());
	} catch (error) {
		HandleError(error);
		throw error;
	}
});

export const resetPassword = createAsyncThunk("auth/resetPassword", async (email: string,{dispatch}) => {
	dispatch(setLoadData({status:true}))
	try {
		console.log("Enviando...")
		await sendPasswordResetEmail(auth, email);
		dispatch(setLoadData({status:false}))
		return true;
	} catch (error) {
		HandleError(error);
		dispatch(setLoadData({status:false}))
		return false;
	}
});

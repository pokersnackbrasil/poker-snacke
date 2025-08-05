import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification, User } from "firebase/auth";
import { auth, db } from "../../Server/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { HandleError } from "../../error";
import { clearUserData, setUserData } from "../user";
import { sendPasswordResetEmail } from "firebase/auth";

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
		} catch (error: any) {
			console.error("Erro real de login:", error.code || "", error.message || "", error);
			// console.log("Erro detalhado", JSON.stringify(error, null, 2));

			// HandleError(error)

			// await dispatch(logout());
			return rejectWithValue(error.message || "Erro ao fazer login");
		}
	}
);

export const observeAuthState = createAsyncThunk<{ uid: string; email: string | null } | null>(
	"auth/observeAuthState",
	async (_, { dispatch }) => {
		return new Promise((resolve) => {
			// console.log(dispatch)
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
		});
	}
);

export const logout = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
	try {
		await signOut(auth);
		dispatch(clearUserData());
	} catch (error) {
		HandleError(error);
		throw error;
	}
});

export const resetPassword = createAsyncThunk("auth/resetPassword", async (email: string, { rejectWithValue }) => {
	try {
		await sendPasswordResetEmail(auth, email);
		return "E-mail de redefinição enviado com sucesso.";
	} catch (error) {
		HandleError(error);
		return rejectWithValue(error || "Erro ao redefinir senha.");
	}
});

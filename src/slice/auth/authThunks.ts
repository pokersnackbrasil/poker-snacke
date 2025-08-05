import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification, User } from "firebase/auth";
import { auth, db } from "../../Server/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { HandleError } from "../../error";
import { clearUserData, setUserData } from "../user";
import { sendPasswordResetEmail } from "firebase/auth";
import { setLoadData } from "../load";
import { globalValues } from "../../globalValues";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";

export const loginWithEmail = createAsyncThunk(
	"auth/loginWithEmail",
	async ({ email, password }: { email: string; password: string }, { dispatch, rejectWithValue }) => {
		const verifyEmail = async (user: User) => {
			if (!user.emailVerified) {

				throw new Error("Unconfirmed account. Please check the link sent to your email before continuing!");
			}
		};

		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);

			const user = userCredential.user;

			if (!user.emailVerified) {
				await sendEmailVerification(user);
				await dispatch(logout());
				const msg = "Email not verified. Please check your email and try again."
				toast.error(msg)
				return rejectWithValue(msg);
			}

			const userRef = doc(db, "usuario", user.uid);
			const docSnap = await getDoc(userRef);

			const acessQuery = query(
				collection(db, "acesso"),
				where("id", "==", user.uid),
				where("status", "==", true)
			);
			const accessSnapShot = await getDocs(acessQuery);

			if (!docSnap.exists() || !docSnap.data()) {
				toast.error("User data not found!");
				await dispatch(logout());
				return rejectWithValue("User data not found!");
			}

			if (!accessSnapShot.docs[0]) {
				toast.error("User access data not found!");
				await dispatch(logout());
				return rejectWithValue("User access data not found!");
			}

			if (!docSnap.data().status) {
				toast.error("User inactive on the platform!");
				await dispatch(logout());
				return rejectWithValue("User inactive on the platform!");
			}

			if (docSnap.data().status && accessSnapShot.docs[0].data().status) {
				const dados = docSnap.data();

				const usuario = {
					uid: user.uid,
					nome: dados.name,
					email: user.email ?? "",
					telefone: dados.telefone,
					role: accessSnapShot.docs[0].data().nivel,
					status: dados.status,
					dinamico: dados.dinamico,
					currentSession: dados.currentSession,
				};

				dispatch(setUserData(usuario));
				try{
					const idTokenResult = await user.getIdTokenResult(true);
					const claimAdmin = idTokenResult.claims?.admin === true;
					const firestoreAdmin = accessSnapShot.docs[0].data().nivel === "0";

					if (claimAdmin !== firestoreAdmin) {
						console.warn("Desalinhamento entre claim e Firestore. Sincronizando...");
						await SincronizarPermissao(user.uid);
						await user.getIdToken(true);
					}
				}
				catch{
					console.error("User admin, não verificado!")
				}

				console.log(usuario)


				return usuario;
			}
		} catch (error: unknown) {
			HandleError(error)
			return rejectWithValue((error as FirebaseError).message || "Erro ao fazer login");
		}
	}
);

export const observeAuthState = createAsyncThunk<{ uid: string; email: string | null } | null>(
	"auth/observeAuthState",
	async () => {
		const user = await new Promise<{ uid: string; email: string | null } | null>((resolve) => {
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

		return user;
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

export const resetPassword = createAsyncThunk("auth/resetPassword", async (email: string, { dispatch }) => {
	dispatch(setLoadData({ status: true }));
	try {
		console.log("Enviando...");
		await sendPasswordResetEmail(auth, email);
		dispatch(setLoadData({ status: false }));
		return true;
	} catch (error) {
		HandleError(error);
		dispatch(setLoadData({ status: false }));
		return false;
	}
});

export const SincronizarPermissao = async (uid: string): Promise<boolean> => {
	const token = await auth.currentUser?.getIdToken();
	try {
		const resposta = await fetch(`${globalValues.URLBASE}/syncClaims`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ uid }),
		});

		console.log("Resposta: -", resposta);

		const mensagem = await resposta.text();
		console.log("Resposta do servidor:", mensagem);

		if (!resposta.ok) {
			const erro = await resposta.text();
			console.error("Erro ao sincronizar claims:", erro);
			return false;
		}

		return true;
	} catch (e) {
		console.error("Erro ao sincronizar claims:", e);
		HandleError(e);
		return false;
	}
};

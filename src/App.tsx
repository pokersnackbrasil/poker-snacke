import { RoutesApp } from "./Routes";
import { RootState } from "./store";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { Loading } from "./componentes/Load";
import { useSelector } from "react-redux";
import { observeAuthState, SincronizarPermissao } from "./slice/auth/authThunks";
import { auth, db } from "./Server/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { setUserData } from "./slice/user";

function App() {
	const dispatch = useAppDispatch();
	const loading = useSelector((state: RootState) => state.auth.status === "loading" || state.load.status);
	const rehydrated = useSelector((state: any) => state._persist?.rehydrated);

	useEffect(() => {
		if (!rehydrated) return;

		const syncClaimsIfNeeded = async () => {
			const user = auth.currentUser;
			if (!user) return;

			// Força o refresh do ID token e pega os claims atuais
			const idTokenResult = await user.getIdTokenResult(true);
			const claims = idTokenResult.claims;
			const isClaimAdmin = claims?.admin === true;

			// Busca os dados do Firestore
			const userRef = doc(db, "usuario", user.uid);
			const docSnap = await getDoc(userRef);

			if (!docSnap.exists()) return;

			const dados = docSnap.data();
			const firestoreAdmin = Array.isArray(dados.role) && dados.role.includes("admin");

			// Se claims estiverem desatualizados, sincroniza e força novo token
			if (isClaimAdmin !== firestoreAdmin) {
				console.warn("🔁 Synchronizing claims with Firestore...");
				await SincronizarPermissao(user.uid);
				await user.getIdToken(true); // força refresh
			}

			// Verifica também os dados de acesso do usuário
			const acessQuery = query(
				collection(db, "acesso"),
				where("id", "==", user.uid),
				where("status", "==", true)
			);
			const accessSnapShot = await getDocs(acessQuery);
			const accessData = accessSnapShot.docs[0]?.data();

			if (!accessData) return;

			dispatch(
				setUserData({
					uid: user.uid,
					nome: dados.name,
					email: user.email ?? "",
					telefone: dados.telefone,
					role: accessData.nivel,
					status: dados.status,
					dinamico: dados.dinamico,
					currentSession: dados.currentSession ?? null,
				})
			);
		};

		dispatch(observeAuthState());
		syncClaimsIfNeeded();
	}, [rehydrated]);

	return (
		<>
			<RoutesApp />
			{loading && <Loading />}
		</>
	);
}

export default App;

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
		try {
			syncClaimsIfNeeded();
		} catch {
			console.log("Erro ao verificar usuario Admin!");
		}
	}, [rehydrated]);

	useEffect(() => {
		const blockContextMenu = (e: any) => e.preventDefault();
		const blockKeys = (e: any) => {
			if (e.key === "PrintScreen") {
				navigator.clipboard.writeText(""); // limpa clipboard
				alert("Captura de tela desativada!");
			}
			if (e.ctrlKey && (e.key === "s" || e.key === "u")) {
				e.preventDefault();
			}
		};

		document.addEventListener("contextmenu", blockContextMenu);
		document.addEventListener("keydown", blockKeys);

		return () => {
			document.removeEventListener("contextmenu", blockContextMenu);
			document.removeEventListener("keydown", blockKeys);
		};
	}, []);

	useEffect(() => {
		const handleBlur = () => {
			document.body.style.filter = "blur(10px)";
		};
		const handleFocus = () => {
			document.body.style.filter = "none";
		};

		window.addEventListener("blur", handleBlur);
		window.addEventListener("focus", handleFocus);

		return () => {
			window.removeEventListener("blur", handleBlur);
			window.removeEventListener("focus", handleFocus);
		};
	}, []);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "PrintScreen") {
				navigator.clipboard.writeText(""); // apaga o conteúdo
				alert("Captura de tela desativada!");
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	useEffect(() => {
		const blur = () => (document.body.style.filter = "blur(10px)");
		const focus = () => (document.body.style.filter = "none");

		window.addEventListener("blur", blur);
		window.addEventListener("focus", focus);

		return () => {
			window.removeEventListener("blur", blur);
			window.removeEventListener("focus", focus);
		};
	}, []);

	useEffect(() => {
		const appElement = document.getElementById("root"); // ou o id do seu container principal

		const blur = () => (document.body.style.filter = "blur(10px)");
		const focus = () => (document.body.style.filter = "none");

		if (appElement) {
			appElement.addEventListener("mouseleave", blur);
			appElement.addEventListener("mouseenter", focus);
		}

		return () => {
			if (appElement) {
				appElement.removeEventListener("mouseleave", blur);
				appElement.removeEventListener("mouseenter", focus);
			}
		};
	}, []);

	useEffect(() => {
		const handleKeyDown = (e) => {
			// Se for tecla PrintScreen
			if (e.key === "PrintScreen") {
				// Dispara ação genérica
				alert("Captura de tela detectada!");
				document.body.innerHTML = "<h1>Conteúdo protegido</h1>";

				// Opcional: limpa clipboard para impedir colar o print
				navigator.clipboard.writeText("");
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	useEffect(() => {
		const blur = () => {
			document.body.style.filter = "blur(10px)";
			console.log("Possível tentativa de captura");
		};
		const focus = () => {
			document.body.style.filter = "none";
		};

		window.addEventListener("blur", blur);
		window.addEventListener("focus", focus);

		return () => {
			window.removeEventListener("blur", blur);
			window.removeEventListener("focus", focus);
		};
	}, []);

	return (
		<>
			<RoutesApp />
			{loading && <Loading />}
		</>
	);
}

export default App;

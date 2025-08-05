import { RoutesApp } from "./Routes";
import { RootState } from "./store";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { Loading } from "./componentes/Load";
import { useSelector } from "react-redux";
import { observeAuthState } from "./slice/auth/authThunks";

function App() {
	const dispatch = useAppDispatch();
	const loading = useSelector((state: RootState) => state.auth.status === "loading" || state.load.status);
	const rehydrated = useSelector((state: any) => state._persist?.rehydrated);

	useEffect(() => {
		if (rehydrated) {
			dispatch(observeAuthState());
		}
	}, [rehydrated, dispatch]);
	return (
		<>
			<RoutesApp />
			{loading && <Loading />}
		</>
	);
}

export default App;

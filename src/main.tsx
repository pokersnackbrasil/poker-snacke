import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.module.css";
import "./index.css";
import App from "./App.tsx";
import store from "./store";
import { persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Loading } from "./componentes/Load/index.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={<Loading />} persistor={persistor}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
				<ToastContainer position="top-right"/>
			</PersistGate>
		</Provider>
	</StrictMode>
);

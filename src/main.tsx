import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { store } from "./store/Store";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error('Root element "#root" was not found.');
}

ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Store } from "./app/store";
import App from "./App";
import axios from "axios";
import "./index.css";

const baseUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = baseUrl;
createRoot(document.getElementById('root')).render(
  <Provider store={Store} >
    <App />
  </Provider>
)

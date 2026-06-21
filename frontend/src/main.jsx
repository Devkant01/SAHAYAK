import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Store } from "./app/store";
import App from "./App";
import "./index.css";

createRoot(document.getElementById('root')).render(
  <Provider store={Store} >
    <App />
  </Provider>
)

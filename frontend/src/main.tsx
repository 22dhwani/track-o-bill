import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { GroupProvider } from "./context/GroupContext.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <Provider store={store}>
      <GroupProvider>
      <App />
      </GroupProvider>
    </Provider>
  </Router>
);

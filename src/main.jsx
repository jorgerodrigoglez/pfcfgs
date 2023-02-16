import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/styles.scss";

import { NotesApp } from "./NotesApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <NotesApp />
  // </React.StrictMode>
);

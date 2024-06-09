import React from "react";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";

import "./App.css";

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

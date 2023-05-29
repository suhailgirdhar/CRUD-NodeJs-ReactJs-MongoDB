import React from "react";
import ContextProvider from "./Context.js";
import App from "./App";


function Home() {
  return (
    <ContextProvider>
      <App />
    </ContextProvider>
  );
}

export default Home;

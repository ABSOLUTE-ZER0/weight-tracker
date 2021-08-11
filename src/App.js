import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/app.scss";

import React, { Fragment } from "react";
import Routes from "./components/route/Routes";
import { AuthProvider } from "./context/authContext";
import { DbProvider } from "./context/dbContext";

function App() {
  return (
    <AuthProvider>
      <DbProvider>
        <Fragment>
          <Routes />
        </Fragment>
      </DbProvider>
    </AuthProvider>
  );
}

export default App;

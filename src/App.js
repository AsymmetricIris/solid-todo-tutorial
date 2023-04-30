//App.js

import React, { useEffect, useState } from "react";
import { LoginButton } from "@inrupt/solid-ui-react";

const authOptions = {
  clientName: "Solid Todo App",
};

function App() {
const [oidcIssuer, setOidcIssuer] = useState("");

  const handleChange = (event) => {
    setOidcIssuer(event.target.value);
  };

  return (
    <div className="app-container">
    <span>
            Log in with:
            <input
              className="oidc-issuer-input "
              type="text"
              name="oidcIssuer"
              list="providers"
              value={oidcIssuer}
              onChange={handleChange}
            />
          <datalist id="providers">
            <option value="https://broker.pod.inrupt.com/" />
            <option value="https://inrupt.net/" />
          </datalist>
          </span>
      <LoginButton
          oidcIssuer={oidcIssuer}
          redirectUrl={window.location.href}
          authOptions={authOptions}
        />
    </div>
  );
}

export default App;
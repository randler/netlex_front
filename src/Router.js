import React from "react";
import {
  BrowserRouter,
  Route,
} from "react-router-dom";
import Login from "./containers/login";
import { AuthContext } from "./providers/auth";

// This example has 3 pages: a public page, a protected
// page, and a login screen. In order to see the protected
// page, you must first login. Pretty standard stuff.
//
// First, visit the public page. Then, visit the protected
// page. You're not yet logged in, so you are redirected
// to the login page. After you login, you are redirected
// back to the protected page.
//
// Notice the URL change each time. If you click the back
// button at this point, would you expect to go back to the
// login page? No! You're already logged in. Try it out,
// and you'll see you go back to the page you visited
// just *before* logging in, the public page.

export default function Routes() {
    const user = React.useContext(AuthContext);
    console.log(user);
  return (
      <BrowserRouter>
          {user ? <PrivateRouter /> : <PublicRouter />}
      </BrowserRouter>
  );
}


function PrivateRouter() {
    return (
      <div>
        <Routes>
          <Route path="frequency" exact element={<div>1 </div>} />
          <Route path="sentences" exact element={<div>1 </div>} />
          <Route path="tops" exact element={<div>1 </div>} />
        </Routes>
      </div>
    );
  }
  
  function PublicRouter() {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    );
  }
/*
  Using 'ProtectedRoute'
  ----------------------
  1. Wrap the entire component you want to protect with <ProtectedRoute>
  2. Send the allowed roles by passing the 'allowedRoles' props an array of strings (eg. ['user','admin']),
     Make sure you pass an array, even for a single allowed role (eg. ['admin'])
  3. If you wish to allow any authenticated user to pass through, regadlress of his role, please pass ['all'] to allowedRoles
*/

import "./ProtectedRoute.css";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

export default function ProtectedRoute(props) {
  const { allowedRoles } = props;
  const { isAuthenticated, userData } = useContext(AuthContext);

  const pleaseLogin = (
    <React.Fragment>
      <div className="Page">
        <p>עליך להיות מחובר כדי לצפות בתוכן זה !</p>
        <div>
          לחץ <Link to="/Login">כאן</Link> כדי להיכנס.
        </div>
      </div>
    </React.Fragment>
  );

  const notAllowed = (
    <React.Fragment>
      <div className="Page">
        <p>אין לך הרשאות לצפות בתוכן זה !</p>
      </div>
    </React.Fragment>
  );

  const noRolesSet = (
    <React.Fragment>
      <div className="Page">
        <p>!! אף אחד לא יכול לגשת לדף זה מכיוון שטרם הוגדרו אליו הרשאות</p>
      </div>
    </React.Fragment>
  );

  const result = () => {
    if (!allowedRoles) {
      return noRolesSet;
    }

    if (!isAuthenticated) {
      return pleaseLogin;
    }

    if (allowedRoles[0] === "all" || userData.isAdmin === true) {
      return <React.Fragment>{props.children}</React.Fragment>;
    } else {
      return notAllowed;
    }
  };

  return <React.Fragment>{result()}</React.Fragment>;
}

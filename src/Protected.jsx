import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const auth = useAuth();
  return auth ? children : <Navigate to="/auth/login" />;
};

function useAuth() {
  if (useSelector((x) => x.auth.token) === null) {
    /* This returns false if no user is found on the local storage */
    return false;
  } else {
    return true;
  }
}

export default Protected;

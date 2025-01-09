import {Navigate} from "react-router-dom";

function ProtectedRoute({children}) {
    const IsAuthenticated = sessionStorage.getItem("token");
    return IsAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
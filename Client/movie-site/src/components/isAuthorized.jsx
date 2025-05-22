import { Navigate } from 'react-router';

const IsAuthorized = ({ children }) => {
  
  const token = localStorage.getItem('token');
  console.log("IsAuthorized token check:", token);

  if (!token || token === "undefined" || token === "null") {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default IsAuthorized;
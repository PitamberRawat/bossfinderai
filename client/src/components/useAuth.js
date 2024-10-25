import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);
};

export default useAuth;

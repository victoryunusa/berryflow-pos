import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const WithActiveRegisterCheck = (WrappedComponent) => {
  const WithCheck = (props) => {
    const navigate = useNavigate();
    const { activeRegister } = useSelector((state) => state.active_register);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
      if (!activeRegister) {
        navigate("/finance/business_register/add");
      } else {
        setIsVerified(true); // Verification complete
      }
    }, [navigate, activeRegister]);

    if (!isVerified) {
      // Display a loading placeholder or spinner
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  // Set the display name for debugging and React DevTools
  WithCheck.displayName = `WithActiveRegisterCheck(${getDisplayName(
    WrappedComponent
  )})`;

  return WithCheck;
};

// Helper function to get the display name
const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

export default WithActiveRegisterCheck;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const InactivityLogout = ({ logoutTime = 300000 }) => {
  // Default: 5 minutes (in ms)
  const [timeoutId, setTimeoutId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to log the user out
  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    dispatch(reset());
    // Navigate to the login page
    navigate("/auth/login");
  };

  // Reset the inactivity timer
  const resetTimer = () => {
    // Clear the existing timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timer
    const id = setTimeout(() => {
      handleLogout();
    }, logoutTime);

    // Save the timer ID
    setTimeoutId(id);
  };

  // Track user activity
  useEffect(() => {
    // Events to track
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];

    // Reset timer on activity
    const resetOnActivity = () => resetTimer();

    // Attach event listeners
    events.forEach((event) => window.addEventListener(event, resetOnActivity));

    // Set the initial timer
    resetTimer();

    // Clean up on unmount
    return () => {
      // Clear the timer
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Remove event listeners
      events.forEach((event) =>
        window.removeEventListener(event, resetOnActivity)
      );
    };
  }, [logoutTime]); // Only re-run if logoutTime changes

  return null; // No UI is needed for this component
};

export default InactivityLogout;

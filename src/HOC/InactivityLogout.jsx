import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const InactivityLogout = ({ logoutTime = 300000, warningTime = 240000 }) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const [warningTimeoutId, setWarningTimeoutId] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to log the user out
  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    dispatch(reset());
    // Navigate to the login page
    navigate("/auth/login");
  };

  // Function to handle "Stay Logged In"
  const handleStayLoggedIn = () => {
    setShowWarning(false);
    resetTimer();
  };

  // Reset the inactivity timer
  const resetTimer = () => {
    // Clear existing timers
    if (timeoutId) clearTimeout(timeoutId);
    if (warningTimeoutId) clearTimeout(warningTimeoutId);

    // Set warning timer
    const warningId = setTimeout(() => {
      setShowWarning(true);
    }, warningTime);

    // Set logout timer
    const logoutId = setTimeout(() => {
      handleLogout();
    }, logoutTime);

    // Save timers
    setWarningTimeoutId(warningId);
    setTimeoutId(logoutId);
  };

  // Track user activity
  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];

    const resetOnActivity = () => {
      setShowWarning(false); // Hide warning if any activity occurs
      resetTimer();
    };

    events.forEach((event) => window.addEventListener(event, resetOnActivity));

    // Set initial timers
    resetTimer();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (warningTimeoutId) clearTimeout(warningTimeoutId);
      events.forEach((event) =>
        window.removeEventListener(event, resetOnActivity)
      );
    };
  }, [logoutTime, warningTime]);

  return (
    <>
      {showWarning && (
        <div className="modal">
          <div className="modal-content">
            <p>
              You will be logged out due to inactivity. Do you want to stay
              logged in?
            </p>
            <button onClick={handleStayLoggedIn}>Stay Logged In</button>
          </div>
        </div>
      )}
    </>
  );
};

export default InactivityLogout;

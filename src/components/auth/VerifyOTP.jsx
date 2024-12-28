import React from "react";
import OTPInput from "../common/OtpInput";

const VerifyOTP = () => {
  const handleOtpComplete = (otp) => {
    console.log("Complete OTP:", otp);
  };
  return (
    <div>
      <OTPInput length={6} onComplete={handleOtpComplete} />
    </div>
  );
};

export default VerifyOTP;

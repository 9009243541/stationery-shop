import React, { useState } from "react";
import OtpWithEmail from "./OtpWithEmail";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OtpWithEmailWrapper = () => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);

  const API_BASE_URL =
    import.meta.env.VITE_APP_BASE_URL || "http://localhost:3300";
  console.log(API_BASE_URL, "API_BASE_URL");
  const initialValues = {
    email: "",
    otp: ["", "", "", "", "", ""], // Assuming 6-digit OTP
  };

  const handleSendOtp = async (email) => {
    try {
      if (!email) {
        toast.error("Please enter an email before sending OTP");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "OTP sent successfully");
        setOtpSent(true);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("An error occurred while sending OTP");
    }
  };

  const handleVerifyOtp = async (values) => {
    const otpValue = values.otp.join("");
    try {
      const response = await fetch(`${API_BASE_URL}/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, otp: otpValue }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP Verified Successfully!");
        // Pass email to register page
        navigate("/register", { state: { email: values.email } });
      } else {
        toast.error(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred while verifying OTP.");
    }
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleVerifyOtp}>
        {(formikProps) => (
          <Form>
            <OtpWithEmail
              formikProps={formikProps}
              otpSent={otpSent}
              onSendOtp={() => handleSendOtp(formikProps.values.email)}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OtpWithEmailWrapper;

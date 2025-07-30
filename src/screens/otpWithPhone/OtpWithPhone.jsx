import React, { useEffect, useState } from "react";
import AtmTextField from "../../component/atom/AtmTextField";
import AtmButtonField from "../../component/atom/AtmButtonField";

const OtpWithPhone = ({ formikProps, onSendOtp }) => {
  const {
    values,
    handleBlur,
    handleChange,
    isSubmitting,
    setFieldValue,
    touched,
    errors,
  } = formikProps;

  const [otpSent, setOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (otpSent) setFieldValue("otp", Array(6).fill(""));
  }, [otpSent, setFieldValue]);

  useEffect(() => {
    if (!otpSent || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [otpSent, timeLeft]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...values.otp];
      newOtp[index] = value;
      setFieldValue("otp", newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center justify-center pt-12 min-h-screen">
      <div className="w-full max-w-md p-6 shadow-md rounded bg-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Phone Verification</h1>

        {!otpSent && (
          <>
            <AtmTextField
              label="Phone"
              name="phone"
              type="tel"
              maxLength={10}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your phone number"
              className="w-full mb-6"
              error={touched.phone && errors.phone}
            />

            <AtmButtonField
              type="button"
              label="Send OTP"
              onClick={() => {
                setOtpSent(true);
                setTimeLeft(120);
                onSendOtp(values);
              }}
              className="w-full mb-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded transition-all"
            />
          </>
        )}

        {otpSent && (
          <>
            <div className="flex justify-between gap-2 mb-4">
              {values.otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-xl border rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                />
              ))}
            </div>

            <div className="text-sm text-gray-500 mb-4 text-center">
              Time remaining:{" "}
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </div>

            <AtmButtonField
              type="submit"
              disabled={isSubmitting}
              label={isSubmitting ? "Verifying..." : "Verify OTP"}
              className={`w-full p-3 text-white rounded-md shadow-lg transition-all duration-300 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-105"
              }`}
            />

            {timeLeft === 0 && (
              <div className="text-center mt-4">
                <AtmButtonField
                  type="button"
                  label="Resend OTP"
                  onClick={() => {
                    setTimeLeft(120);
                    onSendOtp(values);
                  }}
                  className="text-blue-600 underline"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OtpWithPhone;

import React from "react";
import { Formik, Form } from "formik";
import OtpWithPhone from "./OtpWithPhone";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),
  otp: Yup.array()
    .of(Yup.string().matches(/^\d$/, "Only digits allowed"))
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});

const handleOtpPaste = (e) => {
  const paste = e.clipboardData.getData("text").trim();
  if (/^\d{6}$/.test(paste)) {
    const otpArr = paste.split("");
    setFieldValue("otp", otpArr);
  }
};

const OtpWithPhoneWrapper = () => {
  //   const handleSendOtp = async (values, setFieldError, setOtpSent) => {
  //     try {
  //       const response = await axios.post("http://localhost:3300/send-mobile-otp", {
  //         phone: values.phone,
  //       }, { withCredentials: true });

  //       if (response.data.success) {
  //         setOtpSent(true);
  //       } else {
  //         setFieldError("phone", response.data.message || "Failed to send OTP");
  //       }
  //     } catch (err) {
  //       setFieldError("phone", err?.response?.data?.message || "Error sending OTP");
  //     }
  //   };
  const handleSendOtp = async (values, setFieldError, setOtpSent) => {
    try {
      const response = await axios.post(
        "https://auth.phone.email/submit-login",
        {
          phone_no: values.phone,
          phone_country: "+91",
          client_id: process.env.VITE_APP_PHONE_EMAIL_CLIENT_ID,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setOtpSent(true);
      } else {
        setFieldError("phone", response.data.message || "Failed to send OTP");
      }
    } catch (err) {
      setFieldError(
        "phone",
        err?.response?.data?.message || "Error sending OTP"
      );
    }
  };

  const handleVerifyOtp = async (values, { setSubmitting, setErrors }) => {
    try {
      const fullOtp = values.otp.join("");
      const res = await axios.post(
        "http://localhost:3300/verify-mobile-otp",
        {
          otp: fullOtp,
          fname: "Samyak",
          lname: "Jain",
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("OTP verified successfully!");
      } else {
        setErrors({ otp: "Invalid or expired OTP" });
      }
    } catch (err) {
      setErrors({
        otp: err?.response?.data?.message || "Failed to verify OTP",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ phone: "", otp: Array(6).fill("") }}
      validationSchema={validationSchema}
      onSubmit={handleVerifyOtp}
      onPaste={handleOtpPaste}
    >
      {(formikProps) => (
        <Form>
          <OtpWithPhone
            formikProps={formikProps}
            onSendOtp={(values) =>
              handleSendOtp(
                values,
                formikProps.setFieldError,
                formikProps.setFieldValue.bind(null, "otpSent", true)
              )
            }
          />
        </Form>
      )}
    </Formik>
  );
};

export default OtpWithPhoneWrapper;

import React from "react";
import UserLogin from "./UserLogin";
import { UserLoginValidationSchema } from "./UserLoginValidationSchema";
import { Form, Formik } from "formik";
import { useLoginUserMutation } from "../../../slice/UserAuthApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const UserLoginWrapper = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const [login] = useLoginUserMutation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={UserLoginValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await login(values);
            if (res?.data?.status) {
                localStorage.setItem("token", res?.data?.token)
              toast.success(res?.data?.message || "Welcome to A V Foundation");
              navigate("/");
            } else {
              toast.error(res?.data?.message || "User not found Login failed");
            }
          } catch (error) {
            console.error("Error logging in:", error);
            toast.error(error?.data?.message || "An error occurred");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {(formikProps) => (
          <Form>
            <UserLogin formikProps={formikProps} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserLoginWrapper;

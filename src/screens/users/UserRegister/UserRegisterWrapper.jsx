import React from "react";
import UserRegister from "./UserRegister";
import { Form, Formik } from "formik";
import { UserRegisterValidatinSchema } from "./UserRegisterValidatinSchema";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "../../../slice/UserAuthApiSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const UserRegisterWrapper = () => {
  const location = useLocation();
  // const prefilledEmail = location.state?.email || "";
  const queryParams = new URLSearchParams(location.search);
  const emailFromQuery = queryParams.get("email");
  const prefilledEmail = location.state?.email || emailFromQuery || "";
  // const initialValues = {
  //   firstName: "",
  //   lastName: "",
  //   age: 0,
  //   mobile: "",
  //   email: prefilledEmail,
  //   address: "",
  //   password: "",
  //   image: null,
  // };
  const initialValues = {
  firstName: "",
  lastName: "",
  age: 0,
  mobile: "",
  email: prefilledEmail,
  address: "",
  password: "",
  confirmPassword: "", // new field
  image: null,
};

  const [register] = useRegisterUserMutation();
  const navigate = useNavigate();
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={UserRegisterValidatinSchema}
        // onSubmit={async (values, { setSubmitting }) => {
        //   try {
        //     const res = await register(values);
        //     if (res.data?.status) {
        //       toast.success(res.data.message || "Registration successful");
        //       navigate("/login");
        //     } else {
        //       toast.error(res.data?.message || "Registration failed User is alredy exist");
        //     }
        //   } catch (error) {
        //     toast.error(error?.data?.message || "An error occurred");
        //   } finally {
        //     setSubmitting(false);
        //   }
        // }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const formData = new FormData();
            for (let key in values) {
              if (key === "image" && values.image) {
                formData.append("image", values.image);
              } else {
                formData.append(key, values[key]);
              }
            }

            const res = await register(formData); // send FormData

            if (res.data?.status) {
              toast.success(res.data.message || "Registration successful");
              navigate("/login");
            } else {
              toast.error(
                res.data?.message || "Registration failed. User already exists."
              );
            }
          } catch (error) {
            toast.error(error?.data?.message || "An error occurred");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {(formikProps) => (
          <Form>
            <UserRegister formikProps={formikProps} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserRegisterWrapper;

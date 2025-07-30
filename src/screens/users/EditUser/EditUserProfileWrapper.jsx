import React from "react";
import EditUserProfile from "./EditUserProfile";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import { UserRegisterValidatinSchema } from "../UserRegister/UserRegisterValidatinSchema";
import {
  useGetUserProfileQuery,
  useUpdateUserMutation,
} from "../../../slice/UserAuthApiSlice";

const EditUserProfileWrapper = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data: userData, isLoading } = useGetUserProfileQuery(userId);
  const [updateUser] = useUpdateUserMutation();

  if (!userId) {
    return <div>User ID not found in URL.</div>;
  }

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  const initialValues = {
    firstName: userData?.data?.firstName || "",
    lastName: userData?.data?.lastName || "",
    age: userData?.data?.age || 0,
    mobile: userData?.data?.mobile || "",
    email: userData?.data?.email || "",
    address: userData?.data?.address || "",
    image: null,
    oldImage: userData?.data?.image || "",
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        // validationSchema={UserRegisterValidatinSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const formData = new FormData();
            for (let key in values) {
              if (key === "image" && values.image) {
                formData.append("image", values.image);
              } else if (key !== "oldImage") {
                formData.append(key, values[key]);
              }
            }

            // Send userId + formData
            const res = await updateUser({ userId, data: formData });

            if (res.data?.status) {
              toast.success(res.data.message || "User Profile Updated");
              navigate("/user-profile");
            } else {
              toast.error(res.data?.message || "User Profile Update failed");
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
            <EditUserProfile formikProps={formikProps} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditUserProfileWrapper;

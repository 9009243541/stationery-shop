import React from "react";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import Contact from "./Contact";
import { ContactValidationSchema } from "./ContactValidationSchema ";
import { useSendContactMessageMutation } from "../../slice/ContactApiSLice";

const ContactWrapper = () => {
  const [sendMessage] = useSendContactMessageMutation();

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ContactValidationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const res = await sendMessage(values);
          if (res?.data?.status) {
            toast.success(res?.data?.message || "Message sent successfully!");
            resetForm();
          } else {
            toast.error(res?.data?.message || "Failed to send message");
          }
        } catch (error) {
          toast.error(error?.data?.message || "Something went wrong");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {(formikProps) => (
        <Form>
          <Contact formikProps={formikProps} />
        </Form>
      )}
    </Formik>
  );
};

export default ContactWrapper;

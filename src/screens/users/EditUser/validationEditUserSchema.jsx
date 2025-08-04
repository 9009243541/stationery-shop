import * as Yup from "yup";
export const validationEditUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "Only letters are allowed in first name"),

  lastName: Yup.string()
    .trim()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Only letters are allowed in last name"),

  age: Yup.number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(1, "Age must be at least 1")
    .max(100, "Age must be less than or equal to 100"),

  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^[6-9]\d{9}$/,
      "Mobile number must be 10 digits starting with 6-9"
    ),
  address: Yup.string()
    .trim()
    .min(5, "Address must be at least 5 characters"),
});
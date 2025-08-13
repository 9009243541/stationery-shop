import * as Yup from "yup";

// export const UserRegisterValidatinSchema = Yup.object().shape({
//   firstName: Yup.string()
//     .trim()
//     .required("First name is required")
//     .matches(/^[a-zA-Z]+$/, "Only letters are allowed in first name"),

//   lastName: Yup.string()
//     .trim()
//     .required("Last name is required")
//     .matches(/^[a-zA-Z]+$/, "Only letters are allowed in last name"),

//   age: Yup.number()
//     .typeError("Age must be a number")
//     .required("Age is required")
//     .min(1, "Age must be at least 1")
//     .max(100, "Age must be less than or equal to 100"),

//   mobile: Yup.string()
//     .required("Mobile number is required")
//     .matches(
//       /^[6-9]\d{9}$/,
//       "Mobile number must be 10 digits starting with 6-9"
//     ),

//   email: Yup.string()
//     .trim()
//     .email("Enter a valid email")
//     .required("Email is required"),

//   address: Yup.string()
//     .trim()
//     .min(5, "Address must be at least 5 characters"),

//   password: Yup.string()
//     .required("Password is required")
//     .min(6, "Password must be at least 6 characters")
//     .max(20, "Password must be at most 20 characters")
//     .matches(/[a-z]/, "Must contain at least one lowercase letter")
//     .matches(/[A-Z]/, "Must contain at least one uppercase letter")
//     .matches(/\d/, "Must contain at least one number")
//     .matches(/[@$!%*?&#]/, "Must contain at least one special character"),
// });
export const UserRegisterValidatinSchema = Yup.object().shape({
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
    .matches(/^[6-9]\d{9}$/, "Mobile number must be 10 digits starting with 6-9"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),

  address: Yup.string()
    .trim()
    .min(5, "Address must be at least 5 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/\d/, "Must contain at least one number")
    .matches(/[@$!%*?&#]/, "Must contain at least one special character"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"), // new validation
});

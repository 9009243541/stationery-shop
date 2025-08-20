import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Token clear
    localStorage.removeItem("token");

    // Toast message
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });

    // Redirect after short delay
    setTimeout(() => {
      navigate("/"); // homepage redirect
      window.location.reload(); // full state reset
    }, 2000);
  };

  return logout;
};

export default useLogout;
 
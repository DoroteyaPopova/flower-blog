import styles from "./Logout.module.css";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

export default function Logout() {
   const navigate = useNavigate();

   const handleLogout = async () => {
      try {
         const { data } = await axios.get("/rtp/users/logout");
         toast.success(data.message || "Logged out successfully");
         navigate("/");
      } catch (error) {
         toast.error(error.response?.data?.error || "Error logging out");
      }
   };

   return (
      <div className={styles.logout}>
         <p>You are about to log out. Are you sure?</p>
         <button onClick={handleLogout}>I'm sure</button>
      </div>
   );
}

import styles from "./Logout.module.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/userContext";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Logout() {
   const navigate = useNavigate();
   const { logout } = useAuth();
   const [processing, setProcessing] = useState(false);

   const handleLogout = async () => {
      setProcessing(true);
      try {
         const { data } = await axios.get("/rtp/users/logout");

         navigate("/");

         setTimeout(() => {
            logout();
            toast.success(data.message || "Logged out successfully");
         }, 100);
      } catch (error) {
         setProcessing(false);
         toast.error(error.response?.data?.error || "Error logging out");
      }
   };

   return (
      <div className={styles.logout}>
         {processing ? (
            <p>Logging out...</p>
         ) : (
            <>
               <p>You are about to log out. Are you sure?</p>
               <button onClick={handleLogout}>I'm sure</button>
            </>
         )}
      </div>
   );
}

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "./Profile.module.css";
import { UserContext } from "../../context/userContext";

export default function Profile() {
   const { user } = useContext(UserContext);
   const [userDetails, setUserDetails] = useState({
      email: "",
      username: "",
      password: "",
   });

   useEffect(() => {
      const fetchUserDetails = async () => {
         try {
            setUserDetails(user);
         } catch (error) {
            console.error("Error fetching user details:", error);
         }
      };

      fetchUserDetails();
   }, []);

   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserDetails((prevDetails) => ({
         ...prevDetails,
         [name]: value,
      }));
   };

   const handleSave = async () => {
      try {
         await axios.post("/rtp/users/update", userDetails);
         alert("Changes saved successfully!");
      } catch (error) {
         console.error("Error saving changes:", error);
      }
   };

   return (
      <div className={styles.profileContainer}>
         <h2>Edit User Profile</h2>
         <div className={styles.profileItem}>
            <label>Username:</label>
            <input
               type="text"
               name="username"
               value={userDetails?.username || ""}
               onChange={handleInputChange}
            />
         </div>
         <div className={styles.profileItem}>
            <label>Email:</label>
            <input
               type="email"
               name="email"
               value={userDetails?.email || ""}
               onChange={handleInputChange}
            />
         </div>
         <button type="button" onClick={handleSave}>
            Save Changes
         </button>
      </div>
   );
}

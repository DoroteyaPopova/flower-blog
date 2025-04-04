import styles from "./Register.module.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
   const navigate = useNavigate();
   const [data, setData] = useState({
      email: "",
      username: "",
      password: "",
   });

   const handleRegister = async (e) => {
      e.preventDefault();
      const { email, username, password } = data;

      try {
         const { data: responseData } = await axios.post(
            "/rtp/users/register",
            {
               email,
               username,
               password,
            }
         );

         if (responseData.error) {
            toast.error(responseData.error);
         } else {
            setData({});
            toast.success(responseData.message);
            navigate("/");
         }
      } catch (error) {
         toast.error(
            error.response?.data?.error ||
               "Registration failed. Please try again."
         );
      }
   };

   return (
      <div className={styles.container}>
         <div className={styles.formBox}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
               <div className={styles.formGroup}>
                  <input
                     type="email"
                     id="email"
                     name="email"
                     placeholder="Email"
                     value={data.email}
                     onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                     }
                     required
                  />
                  <label htmlFor="email">Email</label>
               </div>
               <div className={styles.formGroup}>
                  <input
                     type="text"
                     id="username"
                     name="username"
                     placeholder="Username"
                     value={data.username}
                     onChange={(e) =>
                        setData({ ...data, username: e.target.value })
                     }
                     required
                  />
                  <label htmlFor="username">Username</label>
               </div>
               <div className={styles.formGroup}>
                  <input
                     type="password"
                     id="password"
                     name="password"
                     placeholder="Password"
                     value={data.password}
                     onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                     }
                     required
                     minLength={6}
                  />
                  <label htmlFor="password">Password</label>
               </div>
               <button type="submit">Register</button>
            </form>
         </div>
      </div>
   );
}

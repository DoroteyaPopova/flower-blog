import { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
   const navigate = useNavigate();
   const [data, setData] = useState({
      email: "",
      password: "",
   });

   const loginUser = async (e) => {
      e.preventDefault();
      const { email, password } = data;
      try {
         const { data: responseData } = await axios.post("/rtp/users/login", {
            email,
            password,
         });
         if (responseData.error) {
            toast.error(responseData.error);
         } else {
            setData({});
            toast.success(responseData.message);
            navigate("/");
         }
      } catch (error) {
         toast.error("Login failed. Please try again.");
      }
   };

   return (
      <div className={styles.container}>
         <div className={styles.formBox}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
               <div className={styles.formGroup}>
                  <input
                     type="email"
                     id="email"
                     name="email"
                     placeholder="Email"
                     value={data?.email || ""}
                     onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                     }
                  />
                  <label htmlFor="email">Email</label>
               </div>
               <div className={styles.formGroup}>
                  <input
                     type="password"
                     id="password"
                     name="password"
                     placeholder="Password"
                     value={data?.password || ""}
                     onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                     }
                  />
                  <label htmlFor="password">Password</label>
               </div>
               <button type="submit">Login</button>
            </form>
         </div>
      </div>
   );
}

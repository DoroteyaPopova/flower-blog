import styles from "./Upload.module.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Upload() {
   const navigate = useNavigate();
   const [data, setData] = useState({
      name: "",
      description: "",
      flowerFamilly: "",
      image: "",
   });

   const upload = async (e) => {
      e.preventDefault();
      const { name, description, flowerFamilly, image } = data;
      try {
         const { data } = await axios.post("/rtp/flowers/upload", {
            name,
            description,
            flowerFamilly,
            image,
         });
         if (data.error) {
            toast.error(data.error);
         } else {
            setData({});
            toast.success(data.message);
            navigate("/");
         }
      } catch (error) {
         console.log(error.message, "flower upload error");
      }
   };
   return (
      <div className={styles.container}>
         <div className={styles.textContainer}>
            <form action="put" onSubmit={upload} className={styles.form}>
               <div className={styles.formGroup}>
                  <input
                     type="text"
                     placeholder="Name"
                     id="name"
                     value={data?.name || ""}
                     onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                     }
                  />
                  <label htmlFor="name">Name</label>
               </div>

               <div className={styles.formGroup}>
                  <input
                     type="text"
                     placeholder="Description"
                     id="description"
                     value={data?.description || ""}
                     onChange={(e) =>
                        setData({ ...data, description: e.target.value })
                     }
                  />
                  <label htmlFor="description">Description</label>
               </div>

               <div className={styles.formGroup}>
                  <input
                     type="text"
                     placeholder="Familly"
                     id="flowerFamilly"
                     value={data?.flowerFamilly || ""}
                     onChange={(e) =>
                        setData({ ...data, flowerFamilly: e.target.value })
                     }
                  />
                  <label htmlFor="flowerFamilly">Familly</label>
               </div>
               <div className={styles.formGroup}>
                  <input
                     type="text"
                     placeholder="Image URL"
                     id="image"
                     value={data?.image || ""}
                     onChange={(e) =>
                        setData({ ...data, image: e.target.value })
                     }
                  />
                  <label htmlFor="image">Image URL</label>
               </div>
               <button type="submit">Upload</button>
            </form>
         </div>
      </div>
   );
}

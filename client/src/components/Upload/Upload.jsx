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
   const [isLoading, setIsLoading] = useState(false);

   const upload = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const { name, description, flowerFamilly, image } = data;
      try {
         const { data: response } = await axios.post("/rtp/flowers/upload", {
            name,
            description,
            flowerFamilly,
            image,
         });
         if (response.error) {
            toast.error(response.error);
         } else {
            setData({});
            toast.success(response.message);
            navigate("/");
         }
      } catch (error) {
         console.log(error.message, "flower upload error");
         toast.error("Failed to upload flower. Please try again.");
      } finally {
         setIsLoading(false);
      }
   };

   const handleCancel = () => {
      navigate("/");
   };

   return (
      <div className={styles.uploadContainer}>
         <h1>Create Your Flower's Post</h1>

         <form className={styles.uploadForm} onSubmit={upload}>
            <div className={styles.formGroup}>
               <label htmlFor="name">Name</label>
               <input
                  type="text"
                  id="name"
                  value={data.name || ""}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  required
               />
            </div>

            <div className={styles.formGroup}>
               <label htmlFor="description">Description</label>
               <textarea
                  id="description"
                  value={data.description || ""}
                  onChange={(e) =>
                     setData({ ...data, description: e.target.value })
                  }
                  required
               />
            </div>

            <div className={styles.formGroup}>
               <label htmlFor="flowerFamilly">Family</label>
               <input
                  type="text"
                  id="flowerFamilly"
                  value={data.flowerFamilly || ""}
                  onChange={(e) =>
                     setData({ ...data, flowerFamilly: e.target.value })
                  }
                  required
               />
            </div>

            <div className={styles.formGroup}>
               <label htmlFor="image">Image URL</label>
               <input
                  type="text"
                  id="image"
                  value={data.image || ""}
                  onChange={(e) => setData({ ...data, image: e.target.value })}
                  required
               />
            </div>

            {data.image && (
               <div className={styles.imagePreview}>
                  <h3>Image Preview</h3>
                  <img src={data.image} alt="Flower preview" />
               </div>
            )}

            <div className={styles.formActions}>
               <button
                  type="submit"
                  className={styles.saveButton}
                  disabled={isLoading}
               >
                  {isLoading ? "Uploading..." : "Upload"}
               </button>
               <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={handleCancel}
                  disabled={isLoading}
               >
                  Cancel
               </button>
            </div>
         </form>
      </div>
   );
}

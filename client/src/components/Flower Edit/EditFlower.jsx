import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/userContext";
import styles from "./EditFlower.module.css";

export default function EditFlower() {
   const { id } = useParams();
   const navigate = useNavigate();
   const { user, isLoading: authLoading } = useAuth();
   const [flower, setFlower] = useState({
      name: "",
      description: "",
      flowerFamilly: "",
      image: "",
   });
   const [isLoading, setIsLoading] = useState(true);
   const [isSubmitting, setIsSubmitting] = useState(false);

   useEffect(() => {
      const fetchFlower = async () => {
         setIsLoading(true);
         try {
            const response = await axios.get(`/rtp/flowers/${id}`);
            const flowerData = response.data;

            // Check if the user is the owner of this flower
            if (user && flowerData.owner !== user.id) {
               toast.error("You don't have permission to edit this flower");
               navigate(`/flower/${id}`);
               return;
            }

            setFlower(flowerData);
         } catch (error) {
            console.error("Error fetching flower:", error);
            toast.error("Could not load flower details");
            navigate(`/flower/${id}`);
         } finally {
            setIsLoading(false);
         }
      };

      if (user) {
         fetchFlower();
      } else if (!authLoading) {
         // If user authentication is complete and user is not logged in
         toast.error("Please log in to edit flowers");
         navigate(`/flower/${id}`);
      }
   }, [id, user, authLoading, navigate]);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFlower((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
         await axios.put(`/rtp/flowers/${id}`, flower);
         toast.success("Flower updated successfully");
         navigate(`/flower/${id}`);
      } catch (error) {
         console.error("Error updating flower:", error);
         toast.error("Failed to update flower");
      } finally {
         setIsSubmitting(false);
      }
   };

   const handleCancel = () => {
      navigate(`/flower/${id}`);
   };

   if (isLoading) {
      return <div className={styles.loading}>Loading flower details...</div>;
   }

   return (
      <div className={styles.editContainer}>
         <h1>Edit Flower</h1>

         <form onSubmit={handleSubmit} className={styles.editForm}>
            <div className={styles.formGroup}>
               <label htmlFor="name">Name</label>
               <input
                  type="text"
                  id="name"
                  name="name"
                  value={flower.name}
                  onChange={handleInputChange}
                  required
               />
            </div>

            <div className={styles.formGroup}>
               <label htmlFor="flowerFamilly">Family</label>
               <input
                  type="text"
                  id="flowerFamilly"
                  name="flowerFamilly"
                  value={flower.flowerFamilly}
                  onChange={handleInputChange}
                  required
               />
            </div>

            <div className={styles.formGroup}>
               <label htmlFor="description">Description</label>
               <textarea
                  id="description"
                  name="description"
                  value={flower.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
               ></textarea>
            </div>

            <div className={styles.formGroup}>
               <label htmlFor="image">Image URL</label>
               <input
                  type="text"
                  id="image"
                  name="image"
                  value={flower.image}
                  onChange={handleInputChange}
                  required
               />
            </div>

            {flower.image && (
               <div className={styles.imagePreview}>
                  <h3>Image Preview</h3>
                  <img src={flower.image} alt={flower.name} />
               </div>
            )}

            <div className={styles.formActions}>
               <button
                  type="submit"
                  className={styles.saveButton}
                  disabled={isSubmitting}
               >
                  {isSubmitting ? "Saving..." : "Save Changes"}
               </button>
               <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={handleCancel}
                  disabled={isSubmitting}
               >
                  Cancel
               </button>
            </div>
         </form>
      </div>
   );
}

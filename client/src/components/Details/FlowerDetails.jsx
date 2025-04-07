import styles from "./FlowerDetails.module.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/userContext";

export default function FlowerDetails() {
   const { id } = useParams();
   const navigate = useNavigate();
   const [flower, setFlower] = useState(null);
   const [isEditing, setIsEditing] = useState(false);
   const { user, isLoading } = useAuth();
   const [isOwnerOfFlower, setIsOwnerOfFlower] = useState(false);
   const [isLiked, setIsLiked] = useState(false);
   const [likeCount, setLikeCount] = useState(0);

   useEffect(() => {
      const fetchFlower = async () => {
         try {
            const response = await axios.get(`/rtp/flowers/${id}`);
            setFlower(response.data);

            const likesCountRes = await axios.get(
               `/rtp/likes/count/flower/${id}`
            );
            setLikeCount(likesCountRes.data.count);
            if (user && response.data) {
               setIsOwnerOfFlower(response.data.owner === user.id);
            }
         } catch (error) {
            console.error("Error fetching flower:", error);
            toast.error("Could not load flower details");
         }
      };

      fetchFlower();
   }, [id, user]);

   useEffect(() => {
      if (user && id) {
         const fetchLikeInfo = async () => {
            try {
               const likeStatusRes = await axios.get(
                  `/rtp/likes/check/${user.id}/${id}`
               );
               setIsLiked(likeStatusRes.data.liked);
            } catch (error) {
               console.error("Error fetching like information:", error);
            }
         };

         fetchLikeInfo();
      }
   }, [user, id]);

   if (isLoading || !flower) return <p>Loading...</p>;

   const handleSave = async () => {
      try {
         await axios.put(`/rtp/flowers/${id}`, flower);
         setIsEditing(false);
         toast.success("Flower updated successfully");
      } catch (error) {
         console.error("Error updating flower:", error);
         toast.error("Failed to update flower");
      }
   };

   const handleDelete = async () => {
      try {
         await axios.delete(`/rtp/flowers/${id}`);
         toast.success("Flower deleted successfully");
         navigate("/");
      } catch (error) {
         console.error("Error deleting flower:", error);
         toast.error("Failed to delete flower");
      }
   };

   const handleLikeToggle = async () => {
      if (!user) {
         toast.error("Please log in to like flowers");
         return;
      }

      try {
         if (isLiked) {
            await axios.delete(`/rtp/likes/${user.id}/${id}`);
            setIsLiked(false);
            setLikeCount((prev) => prev - 1);
            toast.success("Flower unliked");
         } else {
            await axios.post(`/rtp/likes`, {
               userId: user.id,
               flowerId: id,
            });
            setIsLiked(true);
            setLikeCount((prev) => prev + 1);
            toast.success("Flower liked!");
         }
      } catch (error) {
         console.error("Error toggling like:", error);
         toast.error(
            isLiked ? "Failed to unlike flower" : "Failed to like flower"
         );
      }
   };

   return (
      <>
         {isEditing ? (
            <div className={styles.edit}>
               <h3>Name</h3>
               <input
                  className={styles.inputsEdit}
                  type="text"
                  value={flower.name}
                  onChange={(e) =>
                     setFlower({ ...flower, name: e.target.value })
                  }
               />
               <h3>Description</h3>
               <input
                  className={styles.inputsEdit}
                  value={flower.description}
                  onChange={(e) =>
                     setFlower({ ...flower, description: e.target.value })
                  }
               />
               <h3>Family</h3>
               <input
                  className={styles.inputsEdit}
                  type="text"
                  value={flower.flowerFamilly}
                  onChange={(e) =>
                     setFlower({ ...flower, flowerFamilly: e.target.value })
                  }
               />
               <h3>Flower's Image</h3>
               <input
                  className={styles.inputsEdit}
                  type="text"
                  value={flower.image}
                  onChange={(e) =>
                     setFlower({ ...flower, image: e.target.value })
                  }
               />
               <div className={styles.buttons}>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setIsEditing(false)}>Cancel</button>
               </div>
            </div>
         ) : (
            <div className={styles.container}>
               <img
                  className={styles.dimg}
                  src={flower.image}
                  alt={flower.name}
               />
               <div className={styles.details}>
                  <h1>{flower.name}</h1>
                  <p>
                     <span className={styles.inBold}>Family:</span>{" "}
                     {flower.flowerFamilly}
                  </p>
                  <p>
                     {" "}
                     <span className={styles.inBold}>Description:</span>{" "}
                     {flower.description}
                  </p>
                  <p className={styles.likeCount}>
                     <span className={styles.inBold}>Likes:</span> {likeCount}{" "}
                     {likeCount === 1 ? "person" : "people"} liked this flower
                  </p>

                  <div className={styles.buttons}>
                     {isOwnerOfFlower ? (
                        <>
                           <button onClick={() => setIsEditing(true)}>
                              Edit
                           </button>
                           <button onClick={handleDelete}>Delete</button>
                        </>
                     ) : (
                        user && (
                           <button
                              onClick={handleLikeToggle}
                              className={
                                 isLiked
                                    ? styles.likedButton
                                    : styles.likeButton
                              }
                           >
                              {isLiked ? "Unlike" : "Like"}
                              <span role="img" aria-label="heart">
                                 {" "}
                                 {isLiked ? "💔" : "❤️"}
                              </span>
                           </button>
                        )
                     )}
                  </div>
               </div>
            </div>
         )}
      </>
   );
}

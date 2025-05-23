import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "./Profile.module.css";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
   const navigate = useNavigate();
   const { user } = useContext(UserContext);
   const [userDetails, setUserDetails] = useState({
      email: "",
      username: "",
      password: "",
   });
   const [userFlowers, setUserFlowers] = useState([]);
   const [likedFlowers, setLikedFlowers] = useState([]);
   const [isEditing, setIsEditing] = useState(false);
   const [originalDetails, setOriginalDetails] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const [isLikedLoading, setIsLikedLoading] = useState(true);

   useEffect(() => {
      const fetchUserData = async () => {
         setIsLoading(true);
         setIsLikedLoading(true);
         try {
            setUserDetails(user);
            setOriginalDetails(user);

            if (user && user.id) {
               const createdResponse = await axios.get(
                  `/rtp/flowers/user/${user.id}`
               );
               setUserFlowers(createdResponse.data || []);

               const likedRefsResponse = await axios.get(
                  `/rtp/likes/user/${user.id}`
               );
               const likedRefs = likedRefsResponse.data || [];

               if (likedRefs.length > 0) {
                  const likedFlowersData = [];

                  for (const likeRef of likedRefs) {
                     if (likeRef.flowerId) {
                        try {
                           const flowerResponse = await axios.get(
                              `/rtp/flowers/${likeRef.flowerId}`
                           );
                           if (flowerResponse.data) {
                              likedFlowersData.push(flowerResponse.data);
                           }
                        } catch (error) {
                           console.error(
                              `Error fetching flower ${likeRef.flowerId}:`,
                              error
                           );
                        }
                     }
                  }

                  setLikedFlowers(likedFlowersData);
               }
            }
         } catch (error) {
            console.error("Error fetching user data:", error);
         } finally {
            setIsLoading(false);
            setIsLikedLoading(false);
         }
      };

      fetchUserData();
   }, [user]);

   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserDetails((prevDetails) => ({
         ...prevDetails,
         [name]: value,
      }));
   };

   const handleEdit = () => {
      setIsEditing(true);
      setOriginalDetails({ ...userDetails });
   };

   const handleCancel = () => {
      setUserDetails(originalDetails);
      setIsEditing(false);
   };

   const handleSave = async () => {
      try {
         await axios.post("/rtp/users/update", userDetails);
         toast.success("Changes saved successfully!");
         setIsEditing(false);
         setOriginalDetails({ ...userDetails });
      } catch (error) {
         console.error("Error saving changes:", error);
      }
   };

   const handleFlowerClick = (flowerId) => {
      navigate(`/flower/${flowerId}`);
   };

   return (
      <div className={styles.pageLayout}>
         <div className={styles.profileContainer}>
            <h2>User Profile</h2>
            <div className={styles.profileItem}>
               <label>Username:</label>
               <input
                  type="text"
                  name="username"
                  value={userDetails?.username || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
               />
            </div>
            <div className={styles.profileItem}>
               <label>Email:</label>
               <input
                  type="email"
                  name="email"
                  value={userDetails?.email || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
               />
            </div>

            {!isEditing ? (
               <button
                  type="button"
                  onClick={handleEdit}
                  className={styles.editButton}
               >
                  Edit Profile
               </button>
            ) : (
               <div className={styles.buttonGroup}>
                  <button
                     type="button"
                     onClick={handleSave}
                     className={styles.saveButton}
                  >
                     Save Changes
                  </button>
                  <button
                     type="button"
                     onClick={handleCancel}
                     className={styles.cancelButton}
                  >
                     Cancel
                  </button>
               </div>
            )}
         </div>

         <div className={styles.flowersSection}>
            <div className={styles.flowersContainer}>
               <h2>My Flowers</h2>
               {isLoading ? (
                  <div className={styles.loadingMessage}>
                     Loading your beautiful flowers...
                  </div>
               ) : userFlowers.length > 0 ? (
                  <div className={styles.flowersGrid}>
                     {userFlowers.map((flower) => (
                        <div
                           key={flower._id}
                           className={styles.flowerCard}
                           onClick={() => handleFlowerClick(flower._id)}
                           style={{ cursor: "pointer" }}
                        >
                           <div className={styles.flowerImage}>
                              {flower.image ? (
                                 <img src={flower.image} alt={flower.name} />
                              ) : (
                                 <div className={styles.placeholderImage}>
                                    🌷
                                 </div>
                              )}
                           </div>
                           <div className={styles.flowerInfo}>
                              <h3>{flower.name}</h3>
                              <p className={styles.flowerFamily}>
                                 Family: {flower.flowerFamilly}
                              </p>
                              <p>
                                 {flower.description ||
                                    "No description available"}
                              </p>
                              <p className={styles.createdDate}>
                                 Created:{" "}
                                 {new Date(
                                    flower.createdAt
                                 ).toLocaleDateString()}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className={styles.emptyState}>
                     <p>You haven't created any flowers yet.</p>
                     <button
                        className={styles.createFlowerButton}
                        onClick={() => navigate(`/upload`)}
                     >
                        Create Your First Flower
                     </button>
                  </div>
               )}
            </div>

            <div className={styles.flowersContainer}>
               <h2>Liked Flowers</h2>
               {isLikedLoading ? (
                  <div className={styles.loadingMessage}>
                     Loading your liked flowers...
                  </div>
               ) : likedFlowers.length > 0 ? (
                  <div className={styles.flowersGrid}>
                     {likedFlowers.map((flower) => (
                        <div
                           key={flower._id}
                           className={styles.flowerCard}
                           onClick={() => handleFlowerClick(flower._id)}
                           style={{ cursor: "pointer" }}
                        >
                           <div className={styles.flowerImage}>
                              {flower.image ? (
                                 <img src={flower.image} alt={flower.name} />
                              ) : (
                                 <div className={styles.placeholderImage}>
                                    🌷
                                 </div>
                              )}
                           </div>
                           <div className={styles.flowerInfo}>
                              <h3>{flower.name}</h3>
                              <p className={styles.flowerFamily}>
                                 Family: {flower.flowerFamilly}
                              </p>
                              <p>
                                 {flower.description ||
                                    "No description available"}
                              </p>
                              <div className={styles.flowerMeta}>
                                 <span className={styles.likedBadge}>
                                    ❤️ Liked
                                 </span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className={styles.emptyState}>
                     <p>You haven't liked any flowers yet.</p>
                     <button
                        className={styles.exploreFlowersButton}
                        onClick={() => navigate(`/catalog`)}
                     >
                        Explore Flowers
                     </button>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

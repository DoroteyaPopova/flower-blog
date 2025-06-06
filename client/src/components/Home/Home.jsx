import styles from "./Home.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
   const [flowers, setFlowers] = useState([]);
   const navigate = useNavigate();
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchTopFlowers = async () => {
         setLoading(true);
         setError(null);
         try {
            const response = await axios.get("/rtp/likes/top-flowers");
            if (response.status !== 200) {
               throw new Error(`Failed to fetch flowers: ${response.status}`);
            }
            setFlowers(response.data);
         } catch (err) {
            setError(
               err.message || "An error occurred while fetching flowers."
            );
         } finally {
            setLoading(false);
         }
      };
      fetchTopFlowers();
   }, []);

   const topFlowers = flowers.map((item) => item.flower);

   if (loading) {
      return (
         <div className={styles.body}>
            <div className={styles.container}>
               <p>
                  Loading most liked flowers. This might take up to 1 minute.
               </p>
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className={styles.body}>
            <div className={styles.container}>
               <p style={{ color: "red" }}>Error: {error}</p>
            </div>
         </div>
      );
   }

   return (
      <div className={styles.body}>
         {topFlowers.length > 0 ? (
            <>
               <h1 className={styles.homeTitle}>
                  Top Three Most Liked Flowers
               </h1>
               <div className={styles.container}>
                  {topFlowers.map((flower) => (
                     <div className={styles.single} key={flower._id}>
                        <img
                           className={styles.himg}
                           src={flower?.image}
                           alt={flower?.name}
                        />
                        <h3>{flower?.name}</h3>
                        <span className={styles.hspan}>
                           {flower.description.length >= 150
                              ? flower.description.slice(0, 150) + "..."
                              : flower.description}
                        </span>
                        <button
                           className={styles.hbtn}
                           onClick={() => navigate(`/flower/${flower?._id}`)}
                        >
                           Read more
                        </button>
                     </div>
                  ))}
               </div>
            </>
         ) : (
            <div className={styles.noFlowers}>
               <img
                  className={styles.noImg}
                  src="/noFlower-noBG.png"
                  alt="Sorry"
               />
               <p className={styles.hp}>No flowers available</p>
            </div>
         )}
      </div>
   );
}

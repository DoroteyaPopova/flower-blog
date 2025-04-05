import styles from "./Catalog.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Catalog() {
   const [flowers, setFlowers] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      axios
         .get("/rtp/flowers/catalog")
         .then((response) => setFlowers(response.data))
         .catch((error) => console.error("Error fetching flowers:", error));
   }, []);

   return (
      <div className={styles.body}>
         <div className={styles.container}>
            {flowers.length > 0 ? (
               flowers.map((flower) => (
                  <div className={styles.single} key={flower._id}>
                     <img
                        className={styles.himg}
                        src={flower.image}
                        alt={flower.name}
                     />
                     <h3>{flower.name}</h3>
                     <span className={styles.hspan}>{flower.description}</span>
                     <button
                        className={styles.hbtn}
                        onClick={() => navigate(`/flower/${flower._id}`)}
                     >
                        Read more
                     </button>
                  </div>
               ))
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
      </div>
   );
}

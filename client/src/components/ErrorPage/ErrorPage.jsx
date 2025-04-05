import styles from "./ErrorPage.module.css";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
   const navigate = useNavigate();

   const move = async () => {
      navigate("/");
   };
   return (
      <div className={styles.container}>
         <img className={styles.eimg} src="/404Flower.png" alt="Error Page" />
         <p className={styles.ep}>
            Ooops... Something went wrong. Go back to&nbsp;
            <span className={styles.es} onClick={move}>
               Home
            </span>
         </p>
      </div>
   );
};

export default ErrorPage;

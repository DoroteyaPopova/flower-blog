import styles from "./Nav.module.css";
import { Link } from "react-router-dom";

const Nav = () => {
   return (
      <nav>
         <div className={styles.centered}>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
         </div>
      </nav>
   );
};

export default Nav;

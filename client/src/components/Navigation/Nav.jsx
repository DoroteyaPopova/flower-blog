import styles from "./Nav.module.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";

const Nav = () => {
   const { user } = useContext(UserContext);
   return (
      <nav>
         <div className={styles.centered}>
            <Link to="/">Home</Link>
            <Link to="/catalog">Catalog</Link>

            {user ? (
               <>
                  <Link to="/profile">Profile</Link>
                  <Link to="/upload">Upload</Link>
                  <Link to="/logout">Logout</Link>
               </>
            ) : (
               <>
                  <Link to="/register">Register</Link>
                  <Link to="/login">Login</Link>
               </>
            )}
         </div>
      </nav>
   );
};

export default Nav;

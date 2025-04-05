import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
   const [user, setUser] = useState(null);
   const [token, setToken] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const checkAuth = async () => {
         setIsLoading(true);
         try {
            const storedAuth = localStorage.getItem("loggedIn");

            if (storedAuth) {
               const { data } = await axios.get("/rtp/users/profile");
               const normalizedUser = {
                  ...data.user,
                  id: data.user.id || data.user._id,
               };
               setUser(normalizedUser);
               setToken(data.token);
            }
         } catch (error) {
            console.error("Auth check failed:", error);
            localStorage.removeItem("loggedIn");
            setUser(null);
            setToken(null);
         } finally {
            setIsLoading(false);
         }
      };

      checkAuth();
   }, []);

   const login = (userData, authToken) => {
      const normalizedUser = {
         ...userData,
         id: userData.id || userData._id,
      };
      setUser(normalizedUser);
      setToken(authToken);
      localStorage.setItem("loggedIn", "true");
   };
   const logout = () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem("loggedIn");
   };

   return (
      <UserContext.Provider
         value={{
            user,
            setUser,
            token,
            setToken,
            isLoading,
            login,
            logout,
         }}
      >
         {children}
      </UserContext.Provider>
   );
}

export const useAuth = () => {
   const context = useContext(UserContext);
   if (!context) {
      throw new Error("useAuth must be used within a UserContextProvider");
   }
   return context;
};

export const isOwner = (ownerId) => {
   const { user } = useAuth();
   return user && ownerId === user._id;
};

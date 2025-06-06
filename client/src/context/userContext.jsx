import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { tokenManager } from "../utils/tokenManager";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
   const [user, setUser] = useState(null);
   const [token, setToken] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const checkAuth = async () => {
         setIsLoading(true);
         try {
            // Get token using token manager (includes expiry check)
            const storedToken = tokenManager.getToken();

            if (storedToken) {
               // Set the token in axios headers
               axios.defaults.headers.common[
                  "Authorization"
               ] = `Bearer ${storedToken}`;

               // Verify token with server
               const { data } = await axios.get("/rtp/users/profile");
               const normalizedUser = {
                  ...data.user,
                  id: data.user.id || data.user._id,
               };
               setUser(normalizedUser);
               setToken(storedToken);
            }
         } catch (error) {
            console.error("Auth check failed:", error);
            tokenManager.clearToken();
            delete axios.defaults.headers.common["Authorization"];
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

      // Store token using token manager (includes expiry)
      tokenManager.setToken(authToken);

      // Set token in axios headers for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
   };

   const logout = () => {
      setUser(null);
      setToken(null);

      // Remove token using token manager
      tokenManager.clearToken();

      // Remove token from axios headers
      delete axios.defaults.headers.common["Authorization"];
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

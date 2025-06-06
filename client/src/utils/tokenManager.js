const TOKEN_KEY = "authToken";
const TOKEN_EXPIRY_KEY = "authTokenExpiry";

export const tokenManager = {
   setToken: (token) => {
      // Set token with expiry (7 days to match JWT)
      const expiryTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
   },

   getToken: () => {
      const token = localStorage.getItem(TOKEN_KEY);
      const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

      if (!token || !expiry) return null;

      // Check if token expired
      if (Date.now() > parseInt(expiry)) {
         tokenManager.clearToken();
         return null;
      }

      return token;
   },

   clearToken: () => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
   },

   isTokenValid: () => {
      return tokenManager.getToken() !== null;
   },
};

import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";

import "./App.css";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Nav from "./components/Navigation/Nav";
import Logout from "./components/Logout/Logout";
import Catalog from "./components/Catalog/Catalog";
import ErrorPage from "./components/ErrorPage/ErrorPage";

import ProtectedRoute from "./utils/ProtectedRoute";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;

function App() {
   return (
      <UserContextProvider>
         <Nav />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<ErrorPage />} />

            <Route element={<ProtectedRoute />}>
               <Route path="/logout" element={<Logout />} />
            </Route>
         </Routes>
         <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      </UserContextProvider>
   );
}

export default App;

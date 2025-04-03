import { Routes, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;

function App() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
      </Routes>
   );
}

export default App;

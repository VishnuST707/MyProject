import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Addmanager from "./components/Addmanager";
import Studentslogin from "./components/Studentslogin";
import Profileview from "./components/Profileview";

function App() {
  return (
    <>
    <Router>
      <Routes>
       
       

      
        <Route path="/" element={<Addmanager />} />

        <Route path="/Profileview" element={<Profileview />} />
        <Route path="/Studentslogin" element={<Studentslogin />} />


      </Routes>
    </Router>
  </>
  )
}

export default App

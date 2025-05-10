import { useState } from "react";
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from "../pages/Home/Home";
import TotoPage from "../pages/TotoPage";
import './App.css'


function App() {
  const [user,setUser] = useState(null)
  const [tasks, setTasks] = useState([])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home sendUser={setUser}/>}/>
        <Route path="/tasks" element={<TotoPage user={user} sendUser={setUser}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

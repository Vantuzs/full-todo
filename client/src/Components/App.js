import { useState } from "react";
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from "../pages/Home";
import TotoPage from "../pages/TotoPage";


function App() {
  const [user,setUser] = useState(null)
  const [tasks, setTasks] = useState([])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home sendUser={setUser}/>}/>
        <Route path="/tasks" element={<TotoPage user={user}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

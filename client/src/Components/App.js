import { useEffect, useState } from "react";
import {unstable_HistoryRouter as HistoryRouter,Routes,Route } from 'react-router-dom'
import Home from "../pages/Home/Home";
import TotoPage from "../pages/TotoPage";
import history from "../BrowserHistory";
import './App.css'
import { authUser } from "../api/userApi";


function App() {
  const [user,setUser] = useState(null)
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    if(!user){
        authUser()
        .then(userData=>{
        setUser(userData.data)
        })
        .catch(err=>{
        return history.push('/');
        })
    }
  },[])

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Home sendUser={setUser}/>}/>
        <Route path="/tasks" element={<TotoPage/>}/>
      </Routes>
    </HistoryRouter>
  );
}

export default App;

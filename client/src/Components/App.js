import { useReducer } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "../pages/Home";
import TotoPage from "../pages/TotoPage";

const reduser = (state,action) =>{
  return state
}

function App() {
  const [state,dispatch] = useReducer({
    user: null,
    tasks: []
  })
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/tasks" element={<TotoPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

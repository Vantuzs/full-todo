import {unstable_HistoryRouter as HistoryRouter,Routes,Route } from 'react-router-dom'
import Home from "../pages/Home/Home";
import TodoPage from "../pages/TotoPage";
import history from "../BrowserHistory";
import './App.css'


function App() {

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/tasks" element={<TodoPage/>}/>
      </Routes>
    </HistoryRouter>
  );
}

export default App;

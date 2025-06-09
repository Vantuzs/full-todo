import {unstable_HistoryRouter as HistoryRouter,Routes,Route } from 'react-router-dom'
import Home from "../pages/Home/Home";
import TodoPage from "../pages/TotoPage";
import history from "../BrowserHistory";
import { connect } from 'react-redux';
import { authUserRequest } from '../actions/actionCreater';
import './App.css'
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthByQRCode from '../pages/AuthByQRcode/AuthByQRCode';


function App(props) {
  useEffect(()=>{
    setTimeout(()=>{
      if(!props.user) {
      props.authUserRequest();
    }
    },1000) 
  },[]);

  useEffect(()=>{
    if(props.notification) {
      toast(props.notification)
    }
  },[props.notification])

  return (
    <HistoryRouter history={history}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/tasks" element={<TodoPage/>}/>
        <Route path="/authByQR" element={<AuthByQRCode/>}/>
      </Routes>
    </HistoryRouter>
  );
}

const mapStateToProps = ({user,notification}) => ({user,notification});
const mapDispatchToProps = {
  authUserRequest
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

// http://localhost:3000/authByQR/?refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODFjOTM3YjYxODQwMzVlZmY0NTU0MWUiLCJlbWFpbCI6ImpvaG4uZG9lQGdtYWlsLmNvbSIsImlhdCI6MTc0OTM5ODgxMSwiZXhwIjoxNzQ5NDAyNDExfQ.8gAs3vcSgex8dh6Xd6fc8lVWxtGZXgrmjBeqPvI1OOY
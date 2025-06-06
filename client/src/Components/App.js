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
    if(!props.user) {
      props.authUserRequest();
    } 
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

// http://localhost:3000/authByQR/?refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODFjOTM3YjYxODQwMzVlZmY0NTU0MWUiLCJlbWFpbCI6ImpvaG4uZG9lQGdtYWlsLmNvbSIsImlhdCI6MTc0OTIxMjMwMywiZXhwIjoxNzQ5MjE1OTAzfQ._mtaobI5sAfba8VuU0dPp6FfPUVpz1N2WV871nB06uU
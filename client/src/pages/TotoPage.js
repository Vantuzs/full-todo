import React, { useState, useEffect } from 'react';
import TodoList from '../Components/TodoList/TodoList';
import TodoForm from '../Components/TodoForm/TodoForm';
import Modal from 'react-modal'
import { getTasksRequest,createTaskRequest,deleteTaskRequest,logOutRequest } from '../actions/actionCreater';
import { connect } from 'react-redux';
import QRCode from "react-qr-code";
import CONSTANTS from '../constatns';

Modal.setAppElement('#root');


const TodoPage = (props) => {
  const [isModalOpen,setIsModalOpen] = useState(false);

    useEffect(()=>{
       if(props.user){
        props.getTasksRequest();
       }
    },[props.user])
    
    const getNewTodo = (data)=>{
      props.createTaskRequest({
        status: 'new',
        createdAt: new Date(),
        ...data
      })
    }

    const delTask = (id)=>{
      props.deleteTaskRequest(id)
    }

    const logOutHandler = ()=>{
      props.logOutRequest()
    }

    const generateLink = ()=> {
      const refresh = localStorage.getItem('refreshToken');

      return `http://${CONSTANTS.IPv4_ADDRESS}:3000/authByQR/?refresh=${refresh}`

    }

    return (
        <>
        <button onClick={logOutHandler}>Log out</button>
          <h1>TodoList</h1>
          <button onClick={()=> setIsModalOpen(true)}>Generate QR-code to authenticate othe devices</button>
          <TodoForm sendData={getNewTodo}/>
          <TodoList todos={props.tasks} dellCallback={delTask}/>

          {/* Modal window */}

          <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
                    },
                  }}>
                    <h1>Scan this QR-code gor the authenficate</h1>

                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
                      <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={generateLink()}
                        viewBox={`0 0 256 256`}
                      />
                    </div>

                    <button onClick={()=> setIsModalOpen(false)}>Close</button>
          </Modal>
        </>
    );
}

const mapStateToProps = (state) => state

const mapDispatchToProps = {
  getTasksRequest,
  createTaskRequest,
  deleteTaskRequest,
  logOutRequest
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoPage);

// http://localhost:3000/authByQR/?refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODFjOTM3YjYxODQwMzVlZmY0NTU0MWUiLCJlbWFpbCI6ImpvaG4uZG9lQGdtYWlsLmNvbSIsImlhdCI6MTc0OTM5ODgxMSwiZXhwIjoxNzQ5NDAyNDExfQ.8gAs3vcSgex8dh6Xd6fc8lVWxtGZXgrmjBeqPvI1OOY
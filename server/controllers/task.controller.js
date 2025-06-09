const {Task} = require('../models')


module.exports.getAllUserTasks = async(req,res,next) =>{
    try {
        const {tokenPayload: {userId}} = req;

        const userTasks = await Task.find({
            authorId: userId
        });

        return res.status(200).send({data: userTasks  })
    } catch (error) {
        next(error)
    }
}

module.exports.createUserTask = async(req,res,next) =>{
    try {
        const {body,tokenPayload: {userId}} = req;

        const task = await Task.create({...body,authorId:userId});

        const io = req.app.get('io');// Получение вебсокет сервера с среды express
        io.emit('SOCKET_REFRESH_TASK_LIST');

        return res.status(201).send({data: task});
    } catch (error) {
        next(error)
    }
}

module.exports.deleteTask = async(req,res,next) =>{
    try {
        const {params: {taskId},tokenPayload: {userId}} = req;
        console.log(taskId);
        console.log(userId);

        const deletedTask = await Task.findOneAndDelete({_id: taskId,authorId: userId});

        if(deletedTask){
            const io = req.app.get('io');// Получение вебсокет сервера с среды express
            io.emit('SOCKET_REFRESH_TASK_LIST');
            
            return res.status(200).send({data: deletedTask})
        }
        return res.status(404).send({err: 'Task not found =('});
    } catch (error) {
        next(error)
    }
}
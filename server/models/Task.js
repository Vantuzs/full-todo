const mongoose = require('mongoose');
const {Schema} = mongoose;

const taskSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String,
        required: true
    },
    creaatedAt:{
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        require: true
    },
    status: {
        type: String,
        required: true
    }
});


const Task = mongoose.model('Task',taskSchema);

module.exports = Task;



/* 

Task
- authorId
- body
- createdAt
- deadline
- status
- 

*/
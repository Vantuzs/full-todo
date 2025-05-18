const express = require('express');
const cors = require('cors');
const router = require('./routes');
const {errorHandler} = require('./errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api',router);

// POST http://localhost:5000/example/counter
app.post('/example/counter',async(req,res,next)=>{
    try {
        const {body: {counter}} = req;
        return res.status(200).send({ServerResponce: counter})

    } catch (error) {
        next(error)
    }
})

app.use(errorHandler);

module.exports = app;

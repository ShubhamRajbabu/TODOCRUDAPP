import express from 'express';
import mongoose from 'mongoose';
import router from './routers/index.js';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/v1',router);

mongoose.connect("mongodb+srv://shubhamshroff0810:shubham0810$@cluster0.q4yjpca.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log('Connected to database');
})

app.listen(3000, (req, res) => {
    console.log('Server is running on port 3000');
})
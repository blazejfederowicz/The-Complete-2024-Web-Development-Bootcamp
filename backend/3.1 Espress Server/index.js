import express from 'express';
const app = express();
const port = 3000;

app.listen(port, ()=>{
    console.log("Connected to the server on port: "+port+"!");
})
//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import bodyParser from "body-parser";
import express from "express";
import {dirname} from 'path';
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
let bool = false

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

function validator(req, res, next){
    const password = req.body.password;
    if(password==='ILoveProgramming'){
        bool=true;
    }
    else{
       bool=false;
    }

    return next();
}

app.use(validator)

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/public/index.html');
})

app.post('/check',(req, res)=>{
    if(bool){
        res.sendFile(__dirname+'/public/secret.html');
    }
    else{
        res.redirect('/')
    }
})

app.listen(port,()=>{
    console.log(`Server running on port: ${port}.`)
})
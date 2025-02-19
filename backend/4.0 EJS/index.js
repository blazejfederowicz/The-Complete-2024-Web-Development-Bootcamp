import express from "express";
const date = new Date();
let week = '';
let name = '';

const app = express();
const port = 3000;

function checkWeek(req, res, next){
    if(date.getDay() > 0 && date.getDay() < 6){
        week = 'a weekday';
        name = 'work hard';
    }
    else{
        week = 'the weekend';
        name = 'have fun';
    }
    next();
}

app.use(checkWeek);

app.get('/',(req,res)=>{
    res.render('index.ejs',
        {
            week: week,
            name: name
        }
    );
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port},`);
})
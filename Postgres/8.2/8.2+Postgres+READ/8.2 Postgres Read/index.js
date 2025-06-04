import express, { response } from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { name } from "ejs";

const app = express();
const port = 3000;
const db = new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"world",
  password:"postgres",
  port: 5432
})

db.connect()

let quiz = [
  {id:0, name:"Albania", flag: "🇦🇱"},
  {id:1, name:"Belgium", flag: "🇧🇪"},
  {id:2, name:"China", flag: "🇨🇳"}
]

db.query("SELECT * FROM flags",(err,response)=>{
  if(err){
    console.log("Error with executing the query", err.stack);
  } else {
    quiz = response.rows
  }
  db.end()
})

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", (req, res) => {
  totalCorrect = 0;
  nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.name.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;

}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

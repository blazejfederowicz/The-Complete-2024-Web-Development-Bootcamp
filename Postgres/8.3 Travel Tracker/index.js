import express from "express";
import bodyParser from "body-parser";
import PG from "pg";

const app = express();
const port = 3000;
const db = new PG.Client({
  user:"postgres",
  host:"localhost",
  password:"postgres",
  database:"world",
  port:5432
})

let countries = []

db.connect()

db.query("SELECT * FROM visited_countries", (err,res)=>{
  if(err){
    console.log("Error with the respond",err.stack);
  } else{
    countries = res.rows
  }
  db.end()
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const arr = countries.map(e=> e.country_code)
  res.render("index.ejs", {
    countries: arr,
    total: arr.length
  })
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

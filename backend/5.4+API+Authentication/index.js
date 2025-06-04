import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "GBIGBI";
const yourPassword = "Zaza420";
const yourAPIKey = "beaa8bc0-65c6-4242-852d-fda7900d1953";
const yourBearerToken = "9e4008e7-383f-4422-b652-006dc1b8fb69";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const result = JSON.stringify(response.data);
    res.render("index.ejs",{content:result})
  } catch(error){
    console.error(error);
    res.render("index.ejs",{content:error})
  }
});

app.get("/basicAuth",async (req, res) => {
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
      auth:{
        username: yourUsername,
        password: yourPassword
      }
    });
    const result = JSON.stringify(response.data);
    res.render("index.ejs",{content:result})
  } catch(error){
    console.error(error);
    res.render("index.ejs",{content:error})
  }
});

app.get("/apiKey", async (req, res) => {
  try{
    const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
    const result = JSON.stringify(response.data);
    res.render("index.ejs",{content:result})
  } catch(error){
    console.error(error);
    res.render("index.ejs",{content:error})
  }
});

app.get("/bearerToken", async (req, res) => {
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42", {
      headers:{
        Authorization: `Bearer ${yourBearerToken}`
      }
    });
    const result = JSON.stringify(response.data);
    res.render("index.ejs",{content:result})
  } catch(error){
    console.error(error);
    res.render("index.ejs",{content:error})
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

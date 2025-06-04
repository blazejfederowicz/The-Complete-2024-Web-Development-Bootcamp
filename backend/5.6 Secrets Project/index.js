import express from 'express'
import axios from 'axios'

const app = express()
const port = 3000

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))

app.get('/', async (req,res)=>{
    try{
        const response = await axios.get("https://secrets-api.appbrewery.com/random");
        const result = response.data;
         res.render("index.ejs",{
            secret: result.secret,
            user: result.username
         })
    } catch(error){
        console.error(error.response.data)
        res.status(500)
    }
})

app.listen(port, ()=>{
    console.log(`Server running on Port ${port}`)
})


// HINTS:
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

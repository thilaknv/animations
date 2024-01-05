import express, { request } from "express";


const app = express();
const port = 3000;

app.use(express.static('public'), (req, res, next)=>{
    next();
});

app.get('/*', (req, res)=>{
    res.send('<h1>404: Page Not Found !!</h1>')
})

app.listen(port);
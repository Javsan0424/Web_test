import express from 'express';

const app = express();
const PORT = 3001

app.use(express.json());

app.use("/", (req,res) =>{
    res.send("Hello from the backend!");
})

app.listen(PORT, () => console.log("Server runnig"))
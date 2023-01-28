import express from 'express'



const app = express()
const PORT = 4000





app.get('/',(req,res)=>{
    res.send({message:"chal raha ha"})
})





















app.listen(PORT, () => {
    console.log(`server app is listenning on port http://localhost:${PORT}`)
})

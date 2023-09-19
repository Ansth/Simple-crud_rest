const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/REST")
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("cant connect");
  });

const bearSchema = new mongoose.Schema({
  name: { 
    type: String,
    required:true
    },
    age:{
        type:Number,
        required:true,
    },
    id:{
        type:Number,
        required:true
    }
});
const Bear=mongoose.model("Bear", bearSchema);

app.get("/api/bears",async (req, res) => {
    try {
        const bhalu1=await Bear.find();
        res.json(bhalu1)
    } catch (error) {
        res.send("ERROR")
    }
})


app.post("/api/bears", (req, res) => {
    try {
         const bhalu=new Bear({
            name:req.body.name,
            age:req.body.age,
            id:req.body.id
         })
         bhalu.save();
         res.send('Added');
    } catch (error) {
        console.log('enter all details')
    }
  });


app.get('/api/bears/:id',async(req,res)=>{
try {
    
    const bhalu2=await Bear.find({'id':req.params.id});
    // console.log(bhalu2);
    res.json(bhalu2);
    console.log("GOT IT")
} catch (error) {
    console.log(error)
    res.send("cant find by id")
}
})

app.put('/api/bears/:id',async(req,res)=>{
    try {
        
        const bhalu2=await Bear.findOneAndUpdate({'id':req.params.id},{"name":"pig"});
        // console.log(bhalu2);
        res.json(bhalu2);
        console.log("UPDATED")
    } catch (error) {
        console.log(error)
        res.send("cant find by id")
    }
    })

app.delete('/api/bears/:id',async(req,res)=>{
    try {
        
        const bhalu2=await Bear.findOneAndDelete({'id':req.params.id});
        // console.log(bhalu2);
        res.json(bhalu2);
        res.send('DELETED')
        console.log("DELETED")
    } catch (error) {
        console.log(error)
        res.send("cant find by id")
    }
})
    


app.listen(3000, () => {
  console.log("running");
});

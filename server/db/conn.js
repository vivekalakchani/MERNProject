const mongose =require("mongoose");

const DB=""

mongose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("DATABASE connected")).catch((err)=>console.log("error"+err.message))
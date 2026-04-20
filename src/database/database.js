const mongoose = require("mongoose");
require("dotenv").config();


const DatabaseConnect = async()=>{
    try{
        await mongoose.connect("mongodb+srv://AbhishekThakur:atGzYHOTvn9eHcQd@tectinder.mqx5x.mongodb.net/maya");
    }
    catch(err){
        console.error("MongoDb connection is not establish", err.message);
    }
}

module.exports = DatabaseConnect;
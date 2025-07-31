const mongoose = require("mongoose")

const connect = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    //mongoose.connect("mongodb://localhost:27017/VIPS")
    // mongodb://localhost:27017/VIPS LOCAL
    // mongodb+srv://divyeshx:IpjRd484FRCr7QTD@cluster.zh4b2yi.mongodb.net/ CLOUD
    .then(()=>{
        console.log("MongoDB initialised, Database Connected!");
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connect
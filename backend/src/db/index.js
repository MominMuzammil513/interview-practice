import mongoose from "mongoose";
const DB_NAME = process.env.DB_NAME;


const connectDB = async () =>{
    try {
        const connectionDB = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME }`)
        console.log(`\n Connected to ${connectionDB}.......${connectionDB.connection.host}`);

    } catch (error) {
        console.log("Mongoose Connection Error",error);
        process.exit(1);
    }
}
export default connectDB;
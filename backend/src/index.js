import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({ path: "./.env" });

connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("🚀 Server running on port " + process.env.PORT);
    });
}).catch(err => {
    console.error("Mongo connection error:", err);
    process.exit(1);
});

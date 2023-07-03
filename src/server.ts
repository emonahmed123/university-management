import mongoose from "mongoose";
import app from "./app";
import config from "./config";
const port =5000
async function main() {
  try{
    await mongoose.connect(config.database_url as string);
   console.log("Database connected");
   app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  }
  catch(err){
  console.log("Failed to conntect", err);
  
  }
  }

  main()
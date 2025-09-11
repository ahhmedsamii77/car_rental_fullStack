import mongoose from "mongoose";

export async function checkConnectionDB() {
  mongoose.connect(process.env.MONGO_URL).then(_ => {
    console.log("success connection to DB............");
  }).catch(error => {
    console.log("error connection to DB............", error);
  });
}
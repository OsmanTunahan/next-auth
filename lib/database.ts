import mongoose from "mongoose";

let isConnected = false;

const connect = async () => {
  //check if the connection is already open
  if (isConnected) {
    console.log("using existing database connection");
    return;
  }

  console.log("using new database connection");
  const db = await mongoose.connect(process.env.MONGODB_URI!, {
    dbName: process.env.MONGODB_NAME,
  });

  //check if the connection is successful
  isConnected = db.connections[0].readyState == 1;
};

export default connect;
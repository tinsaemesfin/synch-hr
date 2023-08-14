import mongoose from "mongoose";

if (!process.env.DATABASE_URL) {
  throw new Error("Please add your DATABASE_URL to .env.local");
}

const DATABASE_URL: string = process.env.DATABASE_URL;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};
let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
   try{
    await mongoose.connect(DATABASE_URL);
    console.log(' ***** DB CONNECTED *****')
   }
   catch(e){
    console.log('!!!!!!!!!!!!!!!!!! DB CONNECTION FAILED !!!!!!!!!!!!!!!!!')
     console.log(e)
   }



  // if (cached.conn) {
  //   return cached.conn;
  // }

  // if (!cached.promise) {
  //   const opts = {
  //     bufferCommands: false,
  //   };

  //   cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
  //     return mongoose;
  //   });
  // }
  // cached.conn = await cached.promise;
  // return cached.conn;
}

export default dbConnect;
// // This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
// import { MongoClient } from "mongodb";

// if (!process.env.DATABASE_URL) {
//   throw new Error('Invalid/Missing environment variable: "DATABASE_URL"');
// }

// const uri:string = process.env.DATABASE_URL;
// const options = {};

// let client:MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   let globalWithMongoClientPromise = global as typeof globalThis &{
//     _mongoClientPromise: Promise<MongoClient>;
//   };
//   if (!globalWithMongoClientPromise._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     globalWithMongoClientPromise._mongoClientPromise = client.connect();
//   }
//   clientPromise = globalWithMongoClientPromise._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise;



// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
// lib/mongodb.ts
// import { MongoClient, MongoClientOptions } from "mongodb";

// if (!process.env.DATABASE_URL) {
//   throw new Error('Invalid/Missing environment variable: "DATABASE_URL"');
// }
// const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

// const uri = process.env.DATABASE_URL;
// const options: MongoClientOptions = {};

// let client;
// let clientPromise: Promise<MongoClient>;

// if (IS_DEVELOPMENT) {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   let globalWithMongo = global as typeof globalThis & {
//     _mongoClientPromise?: Promise<MongoClient>;
//   };

//   if (!globalWithMongo._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     globalWithMongo._mongoClientPromise = client.connect();
//   }
//   clientPromise = globalWithMongo._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise;




import { MongoClient } from 'mongodb'

if (!process.env.DATABASE_URL) {
  throw new Error('Invalid/Missing environment variable: "DATABASE_URL"')
}

const uri = process.env.DATABASE_URL
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
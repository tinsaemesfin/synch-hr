// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import axios from "axios";
// import { getServerSession } from "next-auth";
// import { getToken } from "next-auth/jwt";

// const API_BASE_URL = process.env.BASE_URL+"/api/";
// // const API_BASE_URL = "https://hrms-app-2.onrender.com/api/";

// // const TOKEN =
// //   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
// //     .accessToken || "";

// const serverSession = getServerSession(authOptions);
// // const token = getToken()
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken ||'' ;



// export const publicRequest = axios.create({
//   baseURL: API_BASE_URL,
// });

// export const userRequest = axios.create({
//   baseURL: API_BASE_URL,
//   headers: { token: `Bearer ${TOKEN}`},
// });

'use client'
import { useSession } from "next-auth/react"


export default function Home() {
  const { data, status } = useSession();
  return (
   <h1> DashBoard 
    Home Page {JSON.stringify(data)} {
      status
    }
   </h1>
  )
}

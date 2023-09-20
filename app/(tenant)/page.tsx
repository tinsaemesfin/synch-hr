'use client'
import { useSession } from "next-auth/react"
import moment from "moment-timezone";


export default function Home() {
  const { data, status } = useSession();
 


if(status === 'loading') return <h1> Loading ... </h1>
  return (
   <h1> DashBoard 
    Home Page {JSON.stringify(data)} {
      status
    }
   </h1>
  )
}

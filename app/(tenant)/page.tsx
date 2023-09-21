'use client'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";


export default function Home() {
  const { data, status } = useSession();
 


if(status === 'loading') return <h1> Loading ... </h1>
if(status === 'unauthenticated') redirect("/signin");
  return (
   <h1> DashBoard 
    Home Page {JSON.stringify(data)} {
      status
    }
   </h1>
  )
}

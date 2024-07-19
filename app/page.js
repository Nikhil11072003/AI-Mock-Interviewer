"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "/components/ui/button"

export default function Home() {
  const router=useRouter();

  useEffect(() => {
    router.push('/dashboard')
  }, [])
  return (
    <div className="p-20 flex flex-col gap-10 items-center">
    <div className="flex flex-col justify-center items-center gap-3">
     <h2 className="text-3xl text-gray-600">Application started on 1 July 2024</h2>
     <Button onClick={()=>{router.push('/dashboard')}}>Click here to get Started</Button>
    </div>
    <div>
    <h2>This is AI mock interviewer web app made by Nikhil Thakur </h2>
    </div>
    </div>
  );
}

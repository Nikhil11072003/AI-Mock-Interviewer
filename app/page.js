"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "/components/ui/button"
import Link from "next/link";

export default function Home() {
  const router=useRouter();

  /*useEffect(() => {
    router.push('/dashboard')
  }, [])*/
  return (
    <section className="bg-gray-900 text-white">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >
        AI Mock Interviewer

      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
        Just select the role,job title and year of experience and have you virtual interview experience.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          href="/dashboard">Get Started</Link>
      </div>
    </div>
  </div>
</section>
  );
}




"use client"
import React from 'react'
import { db } from '/utils/db'
import { UserAnswer } from '/utils/schema'
import { useEffect,useState } from 'react'
import { eq } from 'drizzle-orm'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "/components/ui/collapsible" 
import { ChevronsUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from "/components/ui/button"

function Feedback({params}) {

    const router=useRouter();
    const [feedBackList, setfeedBackList] = useState([]);
    const goToHome=()=>{
        router.replace('/dashboard');
    }
    useEffect(() => {
        GetFeedback();
    }, [])
    const GetFeedback = async () => {
        const result = await db.select().from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.id);
    
        if (result) {
            console.log(result);
           setfeedBackList(result);
        } else {
            console.log('No feedback found');
        }
    };
    
  return (
    <div className='p-10'>
      
      {feedBackList?.length==0?
      <h2 className='font-bold text-xl text-gray-500'>No Interview feedback record available</h2>
      :
      <>
      <h2 className='text-3xl font-bold text-green-500' >Congratulations</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
      <h2 className='text-primary text-lg my-3' >Your overall interview rating:</h2>
      
     
      <h2 className='text-sm text-gray-500'>Find below interview questions with correct asnwer, Your answer and feedback for improving</h2>
        
      {feedBackList&&feedBackList.map((item,index)=>(
        <Collapsible key={index} className='mt-7'>
        <CollapsibleTrigger className='p-2 bg-secondary rounded-lg  my-2 text flex justify-between gap-7 w-full'>{item.question} <ChevronsUpDown className='h-5 w-5'/> </CollapsibleTrigger>
        <CollapsibleContent>
        <div className='flex flex-col gap-2'>
        <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
        <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer:</strong>{item.userAns}</h2>
        <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer:</strong>{item.correctAns}</h2>
        <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback:</strong>{item.correctAns}</h2>
         
         </div>
        </CollapsibleContent>
      </Collapsible>

      ))}
      </>
}
      
      
      <Button onClick={goToHome}>Go Home</Button>
      

    </div>
  )
}

export default Feedback
Feedback
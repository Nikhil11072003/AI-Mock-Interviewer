"use client"
import React, { useState } from 'react'
import { Button } from "/components/ui/button"
import { Input } from "/components/ui/input"
import { Textarea } from "/components/ui/textarea"
import { chatSession } from "/utils/GeminiAIModel"
import { db } from '/utils/db'
import { MockInterview } from '/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "/components/ui/dialog.jsx"
import { LoaderCircle } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'






function AddNewInterview() {
  const [openDialog,setOpenDialog]=useState(false);
  const [jobPosition,setJobPosition]=useState();
  const [jobDesc,setJobDesc]=useState();
  const [jobExperience,setJobExperience]=useState();
  const [loading,setLoading]=useState(false);
  const [jsonResponse,setJsonResponse]=useState();
  const {user}=useUser();
  const router=useRouter();

  const onSubmit=async(e)=>{
    setLoading(true);
    e.preventDefault();
    
    const InputPrompt="Job Position:"+jobPosition+", Job Description:"+jobDesc+",Year of Experience:"+jobExperience+",Depend on Job position,job Description and years of experience give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT+" interview questions with answers in JSON format.Give us only question and answer field in JSON"

    const result=await chatSession.sendMessage(InputPrompt);
    const MockJsonResponse=(result.response.text()).replace('```json','').replace('```','');
    console.log(result.response.text());
    console.log(MockJsonResponse);
    console.log(JSON.parse(MockJsonResponse));
    setJsonResponse(MockJsonResponse)

    if(MockJsonResponse){

   

    const resp=await db.insert(MockInterview)
    .values({
      mockId:uuidv4(),
      jsonMockResp:MockJsonResponse,
      jobPosition:jobPosition,
      jobDesc:jobDesc,
      jobExperience:jobExperience,
      createdBy:user?.primaryEmailAddress.emailAddress,
      createdAt:moment().format('DD-MM-YYYY')

    }).returning({mockId:MockInterview.mockId})
    console.log("Idserted Id:",resp);
    if(resp)
    {
      setOpenDialog(false)
      router.push('/dashboard/interview/'+resp[0]?.mockId);
    }
  }
  else{
    console.log("ERROR ")
  }
    setLoading(false);

  }
  return (
    <div>
      <div className='p-10  border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={()=>setOpenDialog(true)}>
        <h2 className='text-lg text-center'> + Add New</h2>
      </div>
      <Dialog open={openDialog} >
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className='font-bold text-2xl'>Tell us more about job you are interviewing</DialogTitle>
      <DialogDescription>
        <form onSubmit={onSubmit}>
        <div>
          <h2>Add detail about your job position/role,job description and year of experience</h2>

          <div className='mt-7 my-3'>
            <label htmlFor="">Job Role/Job Position</label>
            <Input placeholder="Ex. Full Stack Developer" required onChange={(event)=>setJobPosition(event.target.value)} />
          </div>

          <div className='my-3'>
          <label htmlFor="">Job Description/ Tech Stack (In Short)</label>
            <Textarea  placeholder="React, Angular , Node js, React Native, Tailwaind Css, MySql etc.." required 
            onChange={(event)=>setJobDesc(event.target.value)} />
          </div>
          <div className=' my-3'>
            <label htmlFor="">Years Of Experience</label>
            <Input type="number" placeholder="5" max="50" required onChange={(event)=>setJobExperience(event.target.value)}/>
          </div>
        </div>
        <div className='flex gap-5 justify-end'>
          <Button type="button" variant="ghost" onClick={()=>setOpenDialog(false)} >Cancel</Button>
          <Button type="submit" disable={loading} >
            {loading?
            <>
            <LoaderCircle className='animate-spin'/>'Generating from AI'
            </>:'Start Interview'
            }</Button>
        </div>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

      

    </div>
  )
}

export default AddNewInterview

import React from 'react'
import Image from 'next/image'
import Webcam from "react-webcam";
import { Button } from "/components/ui/button"
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic,StopCircle } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from "sonner"
import { chatSession } from "/utils/GeminiAIModel"
import { db } from '/utils/db'
import { UserAnswer } from '/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment';

function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
  const {user}=useUser();
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result)=>(
      setUserAnswer(prevAns=>prevAns+result?.transcript)
    ))
  }, [results])

  const SaveUserAnswer=async()=>{
    if(isRecording)
    {
      setLoading(true);
      stopSpeechToText();
      if(userAnswer?.length<10)
      {
        setLoading(false)
        toast('Error while saving your answer,please record again');
        return ;
      }
      const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+",User Answer:"+userAnswer+",Depends on question and user answer for given interview question"+
      "please give us rating for answer and feedback as area of improvement if any"+
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field"

      const result=await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');
      const JsonFeedbackResp=JSON.parse(mockJsonResp);

      const resp=await db.insert(UserAnswer).values({
        mockIdRef:interviewData?.mockId,
        question:mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns:userAnswer,
        feedback:JsonFeedbackResp?.feedback,
        rating:JsonFeedbackResp?.rating,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-yyyy')

      })
      if(resp){
        toast('User Answer recorded successfully');
        setUserAnswer([]);
        setResults([]);
      }
      setResults([]);
      setLoading(false);


    }
   
    else
    {
      startSpeechToText();
    }
  }

  return (
    <div className='flex flex-col items-center justify-center '>
    <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
        <Image src='/webcam.jpeg' alt='logo' width={200} height={200} className='absolute'/>
      <Webcam mirrored={true} style={{height:300,width:'100%',zIndex:10}} />
    </div>
    <Button disabled={loading} variant='outline' className='my-10' onClick={SaveUserAnswer}>
      {isRecording?
      <h2 className='flex text-red-600 gap-2 animate-pulse items-center'>
        <StopCircle/> 'Recording...'
      </h2>
      :
      <>
      <Mic/>
      <h2 className='text-primary'>'Record Answer'</h2>
      </>}</Button>
    
    </div>

  )
}

export default RecordAnswerSection

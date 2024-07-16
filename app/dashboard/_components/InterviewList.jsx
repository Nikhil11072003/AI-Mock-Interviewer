"use client"
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { eq, desc } from 'drizzle-orm';
import { db } from '/utils/db';
import { MockInterview } from '/utils/schema';
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    console.log('Hello');
    if (user && user.primaryEmailAddress?.emailAddress) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview?.createdBy, user?.primaryEmailAddress.emailAddress))
        .orderBy(desc(MockInterview.id));

      if (result) {
        console.log(result);
        setInterviewList(result);
      } else {
        console.log('Not set');
      }
    } catch (error) {
      console.error('Error fetching interview list:', error);
    }
  };

  return (
    <div>
      {user && (
        <>
          <h2 className='font-medium text-xl'>Previous Mock Interview</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
            {interviewList&&interviewList.map((interview,index)=>(
                <InterviewItemCard key={index} interview={interview} />
            ))}
          </div>
          </>
       
      )}
    </div>
  );
}

export default InterviewList;

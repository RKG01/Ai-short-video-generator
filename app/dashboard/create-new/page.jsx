'use client'
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration'
import { Button } from '@/components/ui/button'
import axios from 'axios';

export default function Page() {
  const [formData, setFormData] = useState({});

  const onchangehandler = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }));
  };

  const onCreateClickHandler = () => {
    GetVideoScript();
  };

  const GetVideoScript = async () => {
    const prompt = 'write a script to generate ' + formData.duration + ' video on ' + formData.topic +
      ': interesting historic story along with ai image prompt in realistic format for each scene and give me result in json format with imageprompt and content text as field';
      
      console.log(prompt);
    const result = await axios.post('/api/get-video-script',{
      
      prompt:prompt
    }).then(resp=>{
      console.log(resp.data);
    })
  };

  return (
    <div className='md:px-20 border-2 border-gray-300 border-dashed rounded-lg p-10 mt-10'>
      <h2 className='font-bold text-4xl text-primary text-center'>Create new</h2>
      <div className='mt-10 '>
        <SelectTopic onUserSelect={onchangehandler} />
        <SelectStyle onUserSelect={onchangehandler} />
        <SelectDuration onUserSelect={onchangehandler} />
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>Create short video</Button>
      </div>
    </div>
  );
}

'use client'
import React, { useState } from 'react'
import Button from './Button'
import { fetchToken, updateUser } from '@/lib/actions'
import FormField from './FormField'
import { useRouter } from 'next/navigation';

type Props = {
  userId:string;

}

const TestPushName = ({userId}: Props) => {
  const [name,setName]=useState('')
  const router =useRouter()
  
  const updateMyName =async()=>{

    const { token } = await fetchToken();
    try {
      await updateUser({name:name},userId, token);  
    } catch (error) {
      console.log(error)
    }finally{
      setName('')
      router.refresh();
    }

  }

  return (
    <div className=' mt-[10px] flex flex-col gap-4'>
              <FormField
                title="Name"
                state={name}
                placeholder="Change Name"
                setState={value => setName(value)}
               />

                <Button
                title={'Push'}
                type="button"
                leftIcon={'/plus.svg'}
                handleClick={updateMyName}
                />

    </div>
  )
}

export default TestPushName

import Button from '@/components/Button';
import TestPushName from '@/components/TestPushName';
import { fetchToken, updateUser } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

const SettingsPage = async(props: Props) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect('/');

  return (
    <div className='min-h-[20vh] flex justify-center'>
      <TestPushName  userId={session.user.id} />
    </div>
  )
}

export default SettingsPage
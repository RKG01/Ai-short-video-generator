'use client';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="p-6 space-y-4 flex flex-row gap-4">
      <Button onClick={() => router.push('/sign-in')}>Sign In</Button>
      <Button onClick={() => router.push('/sign-up')}>Sign Up</Button>
      <UserButton />
      <h1 className="text-2xl font-bold">Welcome to the AI Short Video Generator</h1>
      <p className="text-gray-600">Create amazing short videos with AI!</p>
    </div>
  );
}

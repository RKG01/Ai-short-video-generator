// app/page.js
// "use client";
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="p-6 space-y-4">
      <Button >Ghost Button</Button>
      <Button >Link Button</Button>
      <UserButton/>
      <h1 className="text-2xl font-bold">Welcome to the AI Short Video Generator</h1>
      <p className="text-gray-600">Create amazing short videos with AI!</p>
    </div>
  );
}

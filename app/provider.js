'use client'; 
import { useUser } from '@clerk/nextjs'; 
import { db } from '@/configs/db';
import { users } from '@/configs/schema';
import { eq } from 'drizzle-orm';

import React, { useEffect } from 'react';

export default function Provider({ children }) {
  const {user} = useUser();

  useEffect(() => {
    if (user) {
      isNewUser();
    }
  }, [user]);
  const isNewUser = async()=>{
    const result = await db.select().from(users).where(eq(users.email, user?.primaryEmailAddress?.emailAddress));
       console.log(result);
    if(!result[0]) {
      await db.insert(users).values({
        name: user?.fullName || user?.firstName || user?.lastName,
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
        subscription: false
      });
    }
  }
  return <div>{children}</div>;
}

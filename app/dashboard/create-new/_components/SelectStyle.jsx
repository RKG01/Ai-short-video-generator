'use client';
import Image from 'next/image';
import React, { useState } from 'react';

export default function SelectStyle({onUserSelect}) {
  const styleoption = [
    { name: 'Realistic', image: '/1.png' },
    { name: 'Cartoon', image: '/cartoon.png' },
    { name: 'Comic', image: '/comic.png' },
    { name: 'Watercolor', image: '/watercolor.png' },
    { name: 'GTA', image: '/GTA.png' }
  ];
  const [selectedStyle, setSelectedStyle] = useState();

  return (

    <div>
      <h2 className="font-bold text-2xl text-pink-800">Styles</h2>
      <p className="text-gray-500 mb-4">Select your video style...</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {styleoption.map((item, index) => (
          <div key={item.name || index} className={`relative hover:scale-105 transition-all rounded-xl cursor-pointer  ${selectedStyle == item.name&&'border-4 border-blue-500'}`}>
            <Image
              src={item.image}
              alt={item.name}
              width={160}
              height={100}
              onClick={() => {setSelectedStyle(item.name)
                  onUserSelect('imageStyle',item.name)
              }}
              className="object-cover w-fit h-48 rounded-t-lg"
            />
            <p className="bg-black text-white py-2 text-sm rounded-b-lg text-center">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

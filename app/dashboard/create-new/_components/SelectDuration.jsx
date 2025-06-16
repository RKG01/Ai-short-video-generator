"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectDuration({ onUserSelect }) {
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-pink-800">Duration</h2>
      <p className="text-gray-500">Select the duration of your video...</p>

      <Select
        value={selectedOption}
        onValueChange={(value) => {
          setSelectedOption(value);
          if (value !== "Custom prompt") {
            onUserSelect("duration", value);
          }
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Select Duration" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="30 second">30 second</SelectItem>
          <SelectItem value="60 second">60 second</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

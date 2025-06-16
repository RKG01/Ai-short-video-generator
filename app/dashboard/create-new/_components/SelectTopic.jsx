"use client"
import { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectTopic({ onUserSelect }) {
  const options = ['custom prompt', 'Random ai story', 'Trending topic', 'Popular topic'];
  const [selectedOption, setSelectedOption] = useState('');
  const [prompt, setPrompt] = useState('');

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    onUserSelect?.('topic', value);
  };

  const handleTextareaChange = (e) => {
    const value = e.target.value;
    setPrompt(value);
    onUserSelect?.('customPrompt', value);
  };

  return (
    <div className="w-full">
      <h2 className="font-bold text-2xl text-pink-800">Content</h2>
      <p className="text-gray-500">What is the topic of your video...</p>

      <Select value={selectedOption} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Select a topic" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* ✅ Show Textarea only if a topic is selected */}
      {selectedOption && (
        <Textarea
          className="mt-3"
          placeholder={`Write details for: ${selectedOption}`}
          value={prompt}
          onChange={handleTextareaChange}
        />
      )}
    </div>
  );
}

"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "../_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";

const FileUrl = "https://res.cloudinary.com/djfqfyukb/video/upload/v1750338151/ai-shorts/audio/audio-1750338145397.mp3"

export default function Page() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState();
  const [videoScript, setVideoScript] = useState();
  const [audioFileURL, setaudiofileurl] = useState();
  // const scripted =
  //   "Final script for TTS: The year is 117 AD.  In the heart of Rome, a vibrant marketplace bustles with activity. Merchants hawk their wares – silks from the East, spices from faraway lands, and pottery crafted locally.  Amidst the chaos, a young woman named Amara searches for a particular herb, a crucial ingredient for her ailing father's medicine. Amara's brow is furrowed with worry.  Her father, a respected physician, is gravely ill, and this rare herb is his only hope. She pushes through the crowd, her heart pounding with anxiety. Finally, she finds a merchant who claims to have the herb, but he demands a hefty price. Amara, resourceful and determined, negotiates fiercely, offering everything she possesses. She secures the herb, a small pouch holding her father's hope.  She races through the crowded streets back to her home, her breath catching in her throat. Back in her modest home, Amara prepares the medicine. She carefully measures the herb, her movements precise and gentle, reflecting her love and concern for her father. Days later, Amara's father sits up in bed, his eyes reflecting gratitude and relief.  The herb has worked its magic. Amara smiles, a wave of relief washing over her. Her determination and quick thinking have saved her father's life. ";

  const onchangehandler = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };


  const onCreateClickHandler = () => {
    // GetVideoScript();
    // GenerateAudio(videoScript);
    GenerateAudioCaptionFile(FileUrl);

  };
  const GetVideoScript = async () => {
    setLoading(true);

    const prompt =
      "write a script to generate " +
      formData.duration +
      " video on " +
      formData.topic +
      ": interesting historic story along with ai image prompt in realistic format for each scene and give me result in json format with imageprompt and content text as field";

    try {
      const response = await axios.post('/api/get-video-script', {
        prompt: prompt
      });

      const rawResult = response.data.result;

      // Parse string into actual JSON array
      const parsedResult = typeof rawResult === 'string' ? JSON.parse(rawResult) : rawResult;

      setVideoScript(parsedResult);
    } catch (error) {
      console.error("Error getting or parsing script:", error);
    }

    setLoading(false);
  };

  const GenerateAudio = async (videoScriptData) => {
    setLoading(true);
    if (!Array.isArray(videoScriptData)) {
      console.error('Expected array but got:', typeof videoScriptData);
      return;
    }

    let script = "";
    const id = uuidv4();
    videoScriptData.forEach(item => {
      script += item.contentText + ' ';
    });

    console.log("Final script for TTS:", videoScriptData);
    await axios
      .post("/api/generate-audio", {
        text: videoScriptData,
        id: id,
      })
      .then((resp) => {
        setaudiofileurl(resp.data.result);
      });
    setLoading(false);
  };

  const GenerateAudioCaptionFile = async (fileUrl) => {
    setLoading(true);
    await axios
      .post("/api/generate-caption", {
        audioFileUrl: fileUrl,
      })
      .then((resp) => {
        console.log(resp.data.result);
      });
    setLoading(false);
  };

  return (
    <div className="md:px-20 border-2 border-gray-300 border-dashed rounded-lg p-10 mt-10">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create new
      </h2>
      <div className="mt-10 ">
        <SelectTopic onUserSelect={onchangehandler} />
        <SelectStyle onUserSelect={onchangehandler} />
        <SelectDuration onUserSelect={onchangehandler} />
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create short video
        </Button>
      </div>
      <CustomLoading loading={loading} />
    </div>
  );
}

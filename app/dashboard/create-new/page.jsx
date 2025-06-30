"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "../_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";


export default function Page() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState();
  const [videoScript, setVideoScript] = useState();
  const [audioFileURL, setAudioFileUrl] = useState();
  // const scripted =
  //   "Final script for TTS: The year is 117 AD.  In the heart of Rome, a vibrant marketplace bustles with activity. Merchants hawk their wares – silks from the East, spices from faraway lands, and pottery crafted locally.  Amidst the chaos, a young woman named Amara searches for a particular herb, a crucial ingredient for her ailing father's medicine. Amara's brow is furrowed with worry.  Her father, a respected physician, is gravely ill, and this rare herb is his only hope. She pushes through the crowd, her heart pounding with anxiety. Finally, she finds a merchant who claims to have the herb, but he demands a hefty price. Amara, resourceful and determined, negotiates fiercely, offering everything she possesses. She secures the herb, a small pouch holding her father's hope.  She races through the crowded streets back to her home, her breath catching in her throat. Back in her modest home, Amara prepares the medicine. She carefully measures the herb, her movements precise and gentle, reflecting her love and concern for her father. Days later, Amara's father sits up in bed, his eyes reflecting gratitude and relief.  The herb has worked its magic. Amara smiles, a wave of relief washing over her. Her determination and quick thinking have saved her father's life. ";

  const onhandleinputchange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };


  const onCreateClickHandler = () => {
    GetVideoScript();
    GenerateAudio(videoScript);
    // GenerateAudioCaptionFile(audioFileURL);

  };
  const GetVideoScript = async () => {
  setLoading(true);

  const prompt = `write a script to generate ${formData.duration} video on ${formData.topic}: interesting historic story along with ai image prompt in realistic format for each scene and give me result in json format with imageprompt and content text as field`;

  try {
    const response = await axios.post("/api/get-video-script", { prompt });

    let rawResult = response.data.result;
    console.log("📦 Raw script result from API:", rawResult);

    // Try to extract JSON array if it's a string
    if (typeof rawResult === "string") {
      const arrayMatch = rawResult.match(/\[.*\]/s);
      if (arrayMatch) {
        rawResult = arrayMatch[0];
      }
    }

    const parsedResult =
      typeof rawResult === "string" ? JSON.parse(rawResult) : rawResult;

    if (!Array.isArray(parsedResult)) {
      console.error("❌ Parsed result is not an array:", parsedResult);
      return null;
    }

    setVideoScript(parsedResult);
    console.log(parsedResult);
    return parsedResult;
  } catch (error) {
    console.error("❌ Error in GetVideoScript:", error);
    return null;
  } finally {
    setLoading(false);
  }
};


  const GenerateAudio = async (videoScriptData) => {
  if (!Array.isArray(videoScriptData)) {
    console.error("Expected array but got:", typeof videoScriptData);
    return null;
  }

  const id = uuidv4();

  // ✅ Combine all contentText into a single narration string
  const script = videoScriptData
    .map(item => item.content_text || item.contentText) // support both cases
    .join(" ");

  try {
    const response = await axios.post("/api/generate-audio", {
      text: script, // ✅ Now sending a valid string
      id: id,
    });

    const audioURL = response.data.result;
    setAudioFileUrl(audioURL);
    return audioURL;
  } catch (error) {
    console.error("❌ Error generating audio:", error.response?.data || error);
    return null;
  }
};


  const GenerateAudioCaptionFile = async (audioFileURL) => {
    setLoading(true);
    await axios
      .post("/api/generate-caption", {
        audioFileUrl: audioFileURL,
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
        <SelectTopic onUserSelect={onhandleinputchange} />
        <SelectStyle onUserSelect={onhandleinputchange} />
        <SelectDuration onUserSelect={onhandleinputchange} />
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create short video
        </Button>
      </div>
      <CustomLoading loading={loading} />
    </div>
  );
}

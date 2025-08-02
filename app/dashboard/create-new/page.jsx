"use client";
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "../_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoData } from "@/configs/schema";
import { VideoDataContext } from "../_context/VideoDataContext";
import { parse } from "path";

export default function Page() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState([]);
  const [audioFileURL, setAudioFileUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [imageList, setImageList] = useState([]);
  const {VideoData, setVideoData} = useContext(VideoDataContext);

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  // const audioFileUR= "https://res.cloudinary.com/djfqfyukb/video/upload/v1752639028/ai-shorts/audio/audio-1752639024175.mp3";

  const onCreateClickHandler = async () => {
    setLoading(true);

    try {
      const script = await GetVideoScript();
      if (!script) return;
           
      setVideoScript(script);


      const audioFileURL = await GenerateAudio(script);
      if (!audioFileURL) return;

      setAudioFileUrl(audioFileURL);

      const captionData = await GenerateAudioCaptionFile(audioFileURL);
      if (!captionData) return;

      setCaptions(captionData);
      console.log("Captions generated:", captionData);

      const images = await GenerateImage(script);
      setImageList(images);
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const GetVideoScript = async () => {
    try {
      const prompt = `write a script to generate ${formData.duration} video on ${formData.topic}: interesting historic story along with ai image prompt in realistic format for each scene and give me result in json format with imageprompt and content text as field`;

      const response = await axios.post("/api/get-video-script", { prompt });

      let rawResult = response.data.result;

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

      if(parsedResult.data.result){
        setVideoData(prev=>({
          ...prev,
          'videoScript': parsedResult.data.result,
        }))
        setVideoData(parsedResult.data.result);
      }

      return parsedResult;
    } catch (error) {
      console.error("❌ Error in GetVideoScript:", error);
      return null;
    }
  };

  const GenerateAudio = async (videoScriptData) => {
    try {
      const id = uuidv4();

      const script = videoScriptData
        .map((item) => item.content_text || item.contentText)
        .join(" ");

      const response = await axios.post("/api/generate-audio", {
        text: script,
        id: id,
      });
       setVideoData(prev=>({
          ...prev,
          'audioFileURL': response.data.result,
       }));

      return response.data.url;
    } catch (error) {
      console.error("❌ Error generating audio:", error.response?.data || error);
      return null;
    }
  };

  const GenerateAudioCaptionFile = async (audioFileURL) => {
    try {
      const response = await axios.post("/api/generate-caption", {
        audioFileURL: audioFileURL,
      });
       setVideoData(prev=>({
          ...prev,
          'captions': response.data.result,
       }));

      return response?.data?.result || "";
    } catch (err) {
      console.error("❌ Error generating captions:", err);
      return null;
    }
  };

  const GenerateImage = async (scriptData) => {
    const image = [];
    try {
      const imageUrls = await Promise.all(
        scriptData.map(async (scene) => {
          try {
            const response = await axios.post("/api/generate-image", {
              prompt: scene?.image_prompt,
            });
            image.push(response.data.imageUrl);
            return response?.data?.imageUrl || null; 
          } catch (err) {
            console.error("❌ Image generation failed for:", scene.image_prompt, err);
            return null;
          }
        })
      );

       setVideoData(prev=>({
          ...prev,
          'imageList': image,
       }));

      return imageUrls;
    } catch (err) {
      console.error("🔥 Overall image generation failed:", err);
      return [];
    }
  };


  useEffect(() => {
    console.log(VideoData);
  }, [VideoData]);



  return (
    <div className="md:px-20 border-2 border-gray-300 border-dashed rounded-lg p-10 mt-10">
      <h2 className="font-bold text-4xl text-primary text-center">Create new</h2>
      <div className="mt-10">
        <SelectTopic onUserSelect={handleInputChange} />
        <SelectStyle onUserSelect={handleInputChange} />
        <SelectDuration onUserSelect={handleInputChange} />
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create short video
        </Button>

        {imageList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {imageList.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Generated AI Image ${index + 1}`}
                className="shadow-lg rounded-lg w-full"
              />
            ))}
          </div>
        )}
      </div>
      <CustomLoading loading={loading} />
    </div>
  );
}

"use client";

import React from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { dialogClose } from "../ui/dialog";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../ui/spinner";
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";
import { IoIosCloudDone } from "react-icons/io";
import { AlertCircle } from "lucide-react";


export const AddEventsForm = () => {

  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [desc, setDesc] = useState();
  const [photo, setPhoto] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [photouploadStatus, setPhotoUploadStatus] = useState(null);
  const [error, setError] = useState();
  const { toast } = useToast();
  const router = useRouter();

  // Photo Upload to Supabase
  const handleUpload = async (e) => {
    e.preventDefault();
    setPhotoUploadStatus(1);
    const file = e.target.files[0];
    console.log(file);
    const filename = `${uuidv4()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("images")
      .upload(filename, file, {
        cacheControl: "3600",
        upsert: false,
      });
    const filepath = data.path;
    const link = supabase.storage.from("images").getPublicUrl(`${filepath}`);
    setPhoto(link.data.publicUrl);
    setPhotoUploadStatus(2);
  };

  const handleFacultyFormUpload = async (e) => {
    e.preventDefault();
    
    if (
      !title ||
      !date ||
      !desc ||
      !photo
    ) {
      setError("All Fields Required!");
      return;
    }
    setUploadStatus(true);
    setError(null);
    await axios.post("/api/event", {
      title,
      date,
      desc,
      photo
      })
      .then(() => {
        setUploadStatus(false);
        toast({
          title: "Event Added"
        })
        router.refresh('/dashboard/events');
        dialogClose();
      });
  };

  return (
    <>
      <form action="" >
        <div className="grid w-full items-center gap-6">
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="title">Event Name</Label>
              <Input type="title" id="title" value={title} placeholder="Title"  onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex md:flex-row flex-col gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="picture"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleUpload}
              />

              {photouploadStatus && (
                <div>
                  {photouploadStatus === 1 ? (
                    <Spinner />
                  ) : (
                    <IoIosCloudDone fontSize={20} className="" />
                  )}
                </div>
              )}
            </div>
          </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="date">Date</Label>
                <Input
              type="date"
              value={date}
              className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              placeholder="Select a date"
              onChange={(e) => {
                setDate(e.target.value);
                console.log(e.target.value);
              }}
                    />
              </div>
            </div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="email">Description</Label>
              <textarea id="message" value={desc} rows="10" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your event here..."  onChange={(e) => setDesc(e.target.value)}></textarea>
            </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-5">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-4 mt-6">
            <Button onClick={handleFacultyFormUpload}>Confirm
            {uploadStatus && (
            <Spinner />
          )}
            </Button>
        
        </div>
      </form>
    </>
  );
};

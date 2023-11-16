"use client"

import React from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { dialogClose } from "../ui/dialog";

import Spinner from "../ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import { revalidatePath } from "next/cache";



export const AddNoticeForm = () => {

  const [notice, setNotice] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [error, setError] = useState();
  const { toast } = useToast();
  const router = useRouter();

  const handleNoticeFormUpload = async (e) => {
    e.preventDefault();
    
    if (
      !notice
    ) {
      setError("Field Required!");
      return;
    }
    setUploadStatus(true);
    setError(null);
    await axios.post("/api/noticeboard", {
     notice
      })
      .then(() => {
        setUploadStatus(false);
        toast({
          title: "Notice Added"
        })
        router.refresh('/dashboard/noticeboard');
        dialogClose();
        revalidatePath('/dashboard/noticeboard');
      });
  };

  return (
    <form action="" >
        <div className="grid w-full max-w-sm items-center gap-10">
            
            <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Notice</Label>
            <textarea id="message" value={notice} rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your notice here..." onChange={e => {setNotice(e.target.value)}} ></textarea>
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
            <Button onClick={handleNoticeFormUpload}>Confirm
            {uploadStatus && (
            <Spinner />
          )}
            </Button>
        
        </div>
      </form>
  )
}

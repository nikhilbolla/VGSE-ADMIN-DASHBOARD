"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import axios from "axios";
import Spinner from "../ui/spinner";
import { useRouter } from "next/navigation";
import { dialogClose } from "../ui/dialog";
import { IoIosCloudDone } from "react-icons/io";

export const EditCoverForm = ({ data }) => {
  const [desktopLink, setDesktopLink] = useState(data.desktopLink || "");
  const [mobileLink, setMobileLink] = useState(data.mobileLink || "");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [deskPhotouploadStatus, setDeskPhotoUploadStatus] = useState(null);
  const [mobilePhotouploadStatus, setMobilePhotoUploadStatus] = useState(null);
  const [error, setError] = useState();
  const { toast } = useToast();
  const router = useRouter();

  // Desktop cover Upload to Supabase
  const handleDesktopUpload = async (e) => {
    setDeskPhotoUploadStatus(1);
    e.preventDefault();
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
    setDesktopLink(link.data.publicUrl);
    setDeskPhotoUploadStatus(2);
  };

  // Mobile Cover Upload to Supabase
  const handleMobileUpload = async (e) => {
    setMobilePhotoUploadStatus(1);

    e.preventDefault();
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
    setMobileLink(link.data.publicUrl);
    setMobilePhotoUploadStatus(2);
  };

  const handleCoverFormUpload = async (e) => {
    e.preventDefault();

    if (!desktopLink || !mobileLink) {
      setError("Need both Photos for responsiveness!");
      return;
    }
    if (mobilePhotouploadStatus === 1 || deskPhotouploadStatus === 1) {
      setError("Please Wait Photos are still uploading!");
      return;
    }
    setUploadStatus(true);
    setError(null);
    await axios
      .post("/api/cover", {
        id: data._id,
        desktopLink,
        mobileLink,
      })
      .then(() => {
        setUploadStatus(false);
        toast({
          title: "Covers Updated!",
          desc: "Have a Look at them at vaageswari Website ",
        });
        router.refresh("/dashboard/cover");
        dialogClose();
      });
  };

  return (
    <form action="">
      <div className="grid w-full max-w-sm items-center gap-10">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Desktop</Label>
          <div className="flex gap-4 items-center">
            <Input
              id="desktopPicture"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleDesktopUpload}
            />

            {deskPhotouploadStatus && (
              <div>
                {deskPhotouploadStatus === 1 ? (
                  <Spinner />
                ) : (
                  <IoIosCloudDone fontSize={20} className="" />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Desktop</Label>
        <div className="flex gap-4 items-center">
          <Input
            id="mobilePicture"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleMobileUpload}
          />

          {mobilePhotouploadStatus && (
            <div>
              {mobilePhotouploadStatus === 1 ? (
                <Spinner />
              ) : (
                <IoIosCloudDone fontSize={20} className="" />
              )}
            </div>
          )}
        </div>
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
        <Button onClick={handleCoverFormUpload}>
          Confirm
          {uploadStatus && <Spinner />}
        </Button>
      </div>
    </form>
  );
};

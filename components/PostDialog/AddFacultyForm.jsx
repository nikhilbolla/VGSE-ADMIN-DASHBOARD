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

import { dialogClose } from "../ui/dialog";
import { IoIosCloudDone } from "react-icons/io";
import clearCache from "@/lib/actions";

export const AddFacultyForm = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState(
    "Computer Science and Engineering"
  );
  const [role, setRole] = useState([]);
  const [roleInput, setRoleInput] = useState("");
  const [qualification, setQualification] = useState([]);
  const [qualificationInput, setQualificationInput] = useState("");
  const [research, setresearch] = useState([]);
  const [researchInput, setresearchInput] = useState("");
  const [photo, setPhoto] = useState("");
  const [experience, setExperience] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [photouploadStatus, setPhotoUploadStatus] = useState(null);

  const [error, setError] = useState();

  const { toast } = useToast();
 

  // Research Input Handlers
  const addresearch = () => {
    if (!researchInput == "") {
      setresearch([...research, researchInput]);
      setresearchInput("");
    }
  };

  const removeresearch = (valueToRemove) => {
    const updatedValues = research.filter((value) => value !== valueToRemove);
    setresearch(updatedValues);
  };

  // Qualification Input Handlers
  const addQualification = () => {
    if (!qualificationInput == "") {
      setQualification([...qualification, qualificationInput]);
      setQualificationInput("");
    }
  };

  const removeQualification = () => {
    const updatedValues = qualification.filter(
      (value) => value !== valueToRemove
    );
    setQualification(updatedValues);
  };

  // Role Input Handlers
  const addRole = () => {
    if (!roleInput == "") {
      setRole([...role, roleInput]);
      setRoleInput("");
    }
  };

  const removeRole = (valueToRemove) => {
    const updatedValues = role.filter((value) => value !== valueToRemove);
    setRole(updatedValues);
  };

  // Photo Upload to Supabase
  const handleUpload = async (e) => {
    e.preventDefault();
    setPhotoUploadStatus(1);
    const file = e.target.files[0];
    console.log(file);
    const filename = `images/faculty/${uuidv4()}-${file.name}`;
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

  // Form upload to MongoDB
  const handleFacultyFormUpload = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !role ||
      !department ||
      !qualification ||
      !experience ||
      !research ||
      !photo
    ) {
      setError("All Fields Required!");
      return;
    }

    if (
      photouploadStatus == 1
    )
    {
      setError("Photo is still Uploading!")
      return;
    }
    setUploadStatus(true);
    setError(null);
    await axios
      .post("/api/faculty", {
        name,
        role,
        department,
        qualification,
        experience,
        research,
        photo,
      })
      .then(() => {
        setUploadStatus(false);
        toast({
          title: "Faculty Added",
        });
      
        clearCache('/dashboard/faculty');
        dialogClose();
      });
  };

  return (
    <>
      <form action="" className="w-full">
        <div className="grid md:grid-cols-2 w-full items-center gap-6">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Faculty Name</Label>
            <Input
              type="text"
              id="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <div className="flex gap-4 items-center">
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
            <Label htmlFor="email">Department</Label>

            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            >
              <option value="Computer Science and Engineering">
                Computer Science and Engineering
              </option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Electronic Electrical Engineering">
                Electronic Electrical Engineering
              </option>
              <option value="Electronics Communication Engineering">
                Electronics Communication Engineering
              </option>
            </select>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="role">Role</Label>
            <div className="flex w-full max-w-sm items-center gap-3">
              <Input
                id="role"
                type="text"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  addRole();
                }}
              >
                Add
              </Button>
            </div>
            {role && (
              <div className="flex gap-4">
                {role.map((role, index) => (
                  <div
                    key={index}
                    className="relative px-2 py-1 border rounded-lg "
                  >
                    {role}
                    <Button
                      className="p-1 text-red-600 absolute -top-5 -right-2 "
                      size="sm"
                      variant="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        removeRole(role);
                      }}
                    >
                      <span className="font-bold">x</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="qualification">Qualification</Label>
            <div className="flex w-full max-w-sm items-center gap-3">
              <Input
                id="qualification"
                type="text"
                value={qualificationInput}
                onChange={(e) => setQualificationInput(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  addQualification();
                }}
              >
                Add
              </Button>
            </div>

            {qualification && (
              <div className="flex gap-4">
                {qualification.map((qualification, index) => (
                  <div
                    key={index}
                    className="relative px-2 py-1 border rounded-lg "
                  >
                    {qualification}
                    <Button
                      className="p-1 text-red-600 absolute -top-5 -right-2 "
                      size="sm"
                      variant="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        removeQualification(qualification);
                      }}
                    >
                      <span className="font-bold">x</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="experience">Experience</Label>
            <Input
              id="experience"
              type="number"
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="research">Research</Label>
            <div className="flex w-full max-w-sm items-center gap-3">
              <Input
                id="research"
                type="text"
                value={researchInput}
                onChange={(e) => setresearchInput(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  addresearch();
                }}
              >
                Add
              </Button>
            </div>

            {research && (
              <div className="flex gap-4">
                {research.map((research, index) => (
                  <div
                    key={index}
                    className="relative px-2 py-1 border rounded-lg "
                  >
                    {research}
                    <Button
                      className="p-1 text-red-600 absolute -top-5 -right-2 "
                      size="sm"
                      variant="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        removeresearch(research);
                      }}
                    >
                      <span className="font-bold">x</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
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
          <Button onClick={handleFacultyFormUpload}>
            Confirm
            {uploadStatus && <Spinner />}
          </Button>
        </div>
      </form>
    </>
  );
};

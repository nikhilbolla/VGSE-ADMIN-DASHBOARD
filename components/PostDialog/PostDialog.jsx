import React from "react";
import {
  Dialog,
 
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AddEventsForm } from "./AddEventsForm";
import { AddFacultyForm } from "./AddFacultyForm";
import { AddNoticeForm } from "./AddNoticeForm";
import { AddCoverForm } from "./AddCoverForm";



export const PostDialog = ({ type }) => {

  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-3 py-3">
        Add {type}
      </DialogTrigger>
     
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="mt-4 mb-8 font-semibold ">
              <h1 className="text-2xl">Add {type}</h1>
            </div>
          </DialogTitle>
          <DialogDescription>
            {type == "events" && <AddEventsForm />}
            {type == "faculty" && <AddFacultyForm />}
            {type == "cover" && <AddCoverForm />}
            {type == "noticeboard" && <AddNoticeForm />}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

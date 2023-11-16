"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    dialogClose,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import {MdDelete} from "react-icons/md"
import { useState } from "react"
import axios from "axios"
import Spinner from "../ui/spinner"
import { useToast } from "@/components/ui/use-toast";
import clearCache from "@/lib/actions"

 

export function DeleteDialog({id, type}) {

  const [deleteStatus, setDeleteStatus] = useState(false);
  const { toast } = useToast();


  const handleDelete = async () => {
    if(type == "events")
    {
      type = "event"; //just one case. couldnt use singular word because of naming convetion problem
    }
    setDeleteStatus(true);
    try {
      await axios.delete(`/api/${type}`, { data: { id } });
      setDeleteStatus(false);
      dialogClose();
      toast({
        title: `${type} Deleted!`
      })
 
      clearCache(`dashboard/${type}`);
    } catch (error) {
      console.error("Error deleting faculty:", error);
      setDeleteStatus(false);

      // Handle error as needed
    }
  }
  

  return (
    <Dialog>
  <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-8 px-2 py-3"><MdDelete className='text-xl '/></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure absolutely sure?</DialogTitle>
      <DialogDescription className="mt-2">
        This action cannot be undone. This will permanently delete the event
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
    
          <Button onClick={handleDelete} variant="destructive">Confirm {deleteStatus && <Spinner />}</Button>
        </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

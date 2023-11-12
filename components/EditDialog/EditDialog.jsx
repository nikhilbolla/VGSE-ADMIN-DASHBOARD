import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { EditEventForm } from './EditEventForm'
import { EditFacultyForm } from './EditFacultyForm'
import {BiEdit, BiSolidEdit} from "react-icons/bi"
import { EditNoticeForm } from './EditNoticeForm'
import { EditCoverForm } from './EditCoverForm'


export const EditDialog = ({type, data}) => {
  return (
<Dialog>
  <DialogTrigger className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  h-5 px-4 py-2'><BiEdit className='text-xl'/></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
      <div className="mt-4 mb-8 font-semibold ">
        <h1 className='text-2xl'>Edit {type}</h1>
        </div>
        </DialogTitle>
      <DialogDescription>
      {type == "events" && (
        <EditEventForm data={data}/>
      )}
      {type == "faculty" && (
        <EditFacultyForm data={data}/>
      )}
      {type == "cover" && (
        <EditCoverForm data={data}/>
      )}
      {type == "noticeboard" && (
        <EditNoticeForm data={data}/>
      )}
      </DialogDescription>
    </DialogHeader>
  
  </DialogContent>
</Dialog>
  )
}
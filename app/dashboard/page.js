"use client"

import { useSession } from 'next-auth/react';
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"



export default function page() {

  const { data: session } = useSession();
 
  return (
    
   <div>
    {session &&(
      <h1 className='mt-5 text-4xl font-semibold'>
      Welcome <span className='capitalize'>{session.user?.name}</span> !
     </h1>
    ) }
    
    <Table className="w-1/2 border mt-12">

     
      <TableBody>
       
          <TableRow >
            <TableCell className="font-bold">Name</TableCell>
            <TableCell>{session?.user?.name}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell className="font-bold">Email</TableCell>
            <TableCell>{session?.user?.email}</TableCell>
          </TableRow>
      
          <TableRow >
            <TableCell className="font-bold">Department</TableCell>
            <TableCell>CSE</TableCell>
          </TableRow>
          <TableRow >
            <TableCell className="font-bold">Phone Number</TableCell>
            <TableCell>9949208121</TableCell>
          </TableRow>
      
      </TableBody>
    </Table>
   </div>
  )
}

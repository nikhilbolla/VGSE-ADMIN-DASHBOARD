import { DataTable } from '@/components/DataTable/DataTable'

import { fetchEvents } from '@/lib/data';
import React from 'react'


export default async function page() {

  const type = {
    name: "events",
    tableheaders: [
      {
       name: "Date" 
      },
      {
        name: "Event Title" 
       },
       {
        name: "Updated On" 
       },
       {
        name: "Actions" 

       },
    ]
  }

  

  const tabledata = await JSON.parse(JSON.stringify(await fetchEvents()));




  return (

    <div>
      <DataTable type={type} data={tabledata} />
    </div>
  )
}

import { DataTable } from '@/components/DataTable/DataTable'
import { fetchEvents } from '@/lib/data';

import React from 'react'

const getData = async ()  => {
  const data = await fetchEvents();
  return data;
}

export default async function Page() {

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

  const tabledata = await JSON.parse(JSON.stringify(await getData()));

  return (

    <div>
      <DataTable type={type} data={tabledata} />
    </div>
  )
}

import React from 'react'
import { DataTable } from '@/components/DataTable/DataTable' 
import { fetchNotices } from '@/lib/data';

const getData = async ()  => {
  const data = await fetchNotices();
  return data;
}
 
export default async function Page(){
    const type = {
        name: "noticeboard",
        tableheaders: [
          {
           name: "Notice" 
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

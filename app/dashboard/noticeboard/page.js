import React from 'react'
import { DataTable } from '@/components/DataTable/DataTable' 
import { fetchNotices } from '@/lib/data';

export default async function page(){
    const type = {
        name: "noticeboard",
        tableheaders: [
          {
           name: "Notice" 
          },
         
        ]
      }
    
      const tabledata = await JSON.parse(JSON.stringify(await fetchNotices()));
    
      return (
    
        <div>
          <DataTable type={type} data={tabledata} />
        </div>
      )
}

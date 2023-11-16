import { DataTable } from "@/components/DataTable/DataTable";

import { fetchCover } from "@/lib/data";
import React from "react";

const getData = async ()  => {
  const data = await fetchCover();
  return data;
}


export default async function Page() {
  const type = {
    name: "cover",
    tableheaders: [
      {
        name: "Desktop",
      },
      {
        name: "Mobile",
      },
      {
        name: "Action",
      },
    ],
  };

  const tabledata = await JSON.parse(JSON.stringify(await getData()));

  return (
    <div>
      <DataTable type={type} data={tabledata} />
    </div>
  );
}

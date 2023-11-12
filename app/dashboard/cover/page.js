import { DataTable } from "@/components/DataTable/DataTable";

import { fetchCover } from "@/lib/data";
import React from "react";

export default async function page() {
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

  const tabledata = await JSON.parse(JSON.stringify(await fetchCover()));





  return (
    <div>
      <DataTable type={type} data={tabledata} />
    </div>
  );
}

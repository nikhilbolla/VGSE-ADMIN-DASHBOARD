import { DataTable } from "@/components/DataTable/DataTable";

import { fetchCover } from "@/lib/data";
import React from "react";

export const revalidate = 0

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

  const tabledata = await JSON.parse(JSON.stringify(await fetchCover()));

  return (
    <div>
      <DataTable type={type} data={tabledata} />
    </div>
  );
}

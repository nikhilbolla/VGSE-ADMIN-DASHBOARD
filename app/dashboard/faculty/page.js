import React from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { fetchFaculty } from "@/lib/data";

const getData = async ()  => {
  const data = await fetchFaculty();
  return data;
}

export default async function page() {
  const type = {
    name: "faculty",
    tableheaders: [
      {
        name: "Photo",
      },
      {
        name: "Name",
      },
      {
        name: "Department",
      },
      {
        name: "Designation",
      },
      {
        name: "Experience",
      },
      {
        name: "Qualification",
      },
      {
        name: "Research Areas",
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

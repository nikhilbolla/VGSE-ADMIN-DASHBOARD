import React from "react";
import { PostDialog } from "../PostDialog/PostDialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteDialog } from "@/components/DeleteDialog/DeleteDialog";
import { EditDialog } from "@/components/EditDialog/EditDialog";
import Image from "next/image";


export const DataTable = ({ type, data }) => {

  return (
    <div>
      <div className="flex mt-4 mb-8 font-semibold justify-between items-center">
        <h1 className="text-3xl capitalize">{type.name}</h1>
        <PostDialog type={type.name} />
      </div>
      

      <Table>
        <TableCaption>
          {data.length > 0 ? `A list of your ${type.name}.` : "no data has found"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            {type.tableheaders.map((header, index) => (
              <TableHead
                key={index}
                className={`w-[130px] ${
                  index === type.tableheaders.length - 1 ? "text-right" : ""
                }`}
              >
                {header.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {type.name == "faculty" && (
          <TableBody>
            {data.map((data, index) => (
              <TableRow key={index}>
                {data.date && (
                  <TableCell className="font-medium">{data.date}</TableCell>
                )}
                {data.photo && (
                  <TableCell className="font-medium">
                    <Image src={data.photo} height={100} width={50} alt="faculty" />
                  </TableCell>
                )}
                {data.title && (
                  <TableCell className="font-medium">{data.title}</TableCell>
                )}
                {data.name && (
                  <TableCell className="font-medium">{data.name}</TableCell>
                )}
                {data.updatedOn && (
                  <TableCell className="font-medium">
                    {data.updatedOn}
                  </TableCell>
                )}
                {data.department && (
                  <TableCell className="font-medium">
                    {data.department}
                  </TableCell>
                )}
                {data.role && (
                  <TableCell className={`font-medium`}>
                    {data.role.map((role, index) => (
                      <span key={index}>
                        {index === data.role.length - 1 ? (
                          <p>{role}</p>
                        ) : (
                          <p>{role} ,</p>
                        )}
                      </span>
                    ))}
                  </TableCell>
                )}
                {data.experience && (
                  <TableCell className="font-medium">
                    {data.experience}
                  </TableCell>
                )}

                {data.qualification && (
                  <TableCell className={`font-medium`}>
                    {data.qualification.map((qualification, index) => (
                      <span key={index}>
                        {index === data.qualification.length - 1 ? (
                          <p>{qualification}</p>
                        ) : (
                          <p>{qualification} ,</p>
                        )}
                      </span>
                    ))}
                  </TableCell>
                )}

                {data.research && (
                  <TableCell className={`font-medium`}>
                    {data.research.map((research, index) => (
                      <span key={index}>
                        {index === data.research.length - 1 ? (
                          <p>{research}</p>
                        ) : (
                          <p>{research} ,</p>
                        )}
                      </span>
                    ))}
                  </TableCell>
                )}

                {data.mobileLink && (
                  <TableCell className="font-medium">
                    <a href={data.mobileLink}>Link</a>
                  </TableCell>
                )}
                {data.desktopLink && (
                  <TableCell className="font-medium">
                    <a href={data.desktopLink}>Link</a>
                  </TableCell>
                )}
                {data.notice && (
                  <TableCell className="font-medium">{data.notice}</TableCell>
                )}
                <TableCell className="text-right">
                  <EditDialog type={type.name} data={data} />
                  <DeleteDialog className="mt-3" id={data._id} type={type.name}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}

        {type.name == "events" && (
          <TableBody>
            {data.map((data, index) => (
              <TableRow key={index}>
                {data.date && (
                  <TableCell className="font-medium">{data.date.slice(0,10)}</TableCell>
                )}

                {data.title && (
                  <TableCell className="font-medium">{data.title}</TableCell>
                )}

                {data.updatedAt && (
                  <TableCell className="font-medium">
                    {data.updatedAt.slice(0,10)}
                  </TableCell>
                )}

                <TableCell className="text-right">
                  <EditDialog type={type.name} data={data} />
                  <DeleteDialog className="mt-3" id={data._id} type={type.name}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}

        {type.name == "cover" && (
          <TableBody>
            {data.map((data, index) => (
              <TableRow key={index}>
              
                {data.desktopLink && (
                  <TableCell className="font-medium">
                    <a href={data.desktopLink}>Link</a>
                  </TableCell>
                )}

                {data.mobileLink && (
                  <TableCell className="font-medium">
                    <a href={data.mobileLink}>Link</a>
                  </TableCell>
                )}

                <TableCell className="text-right">
                  <EditDialog type={type.name} data={data} />
                  <DeleteDialog className="mt-3" id={data._id} type={type.name}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}

        {type.name == "noticeboard" && (
          <TableBody>
            {data.map((data, index) => (
              <TableRow key={index}>
                {data.notice && (
                  <TableCell className="font-medium">{data.notice}</TableCell>
                )}
                <TableCell className="text-right">
                  <EditDialog type={type.name} data={data} />
                  <DeleteDialog className="mt-3" id={data._id} type={type.name}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

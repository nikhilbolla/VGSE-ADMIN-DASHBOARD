import React from 'react'

export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex mt-4 mb-8 font-semibold justify-between items-center">
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
      </div>

      <table className="w-full">
        <caption className="h-6 bg-gray-200 rounded w-2/3 mb-2"></caption>
        <thead>
          <tr>
            <th className="w-[130px] h-6 bg-gray-200 rounded"></th>
            <th className="w-[130px] h-6 bg-gray-200 rounded"></th>
            <th className="w-[130px] h-6 bg-gray-200 rounded"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-medium h-6 bg-gray-200 rounded"></td>
            <td className="h-6 bg-gray-200 rounded"></td>
            <td className="h-6 bg-gray-200 rounded"></td>
            <td className="text-right">
              <div className="h-6 bg-gray-200 rounded inline-block mr-2"></div>
              <div className="h-6 bg-gray-200 rounded inline-block"></div>
            </td>
          </tr>
          
        </tbody>
      </table>
      <table className="w-full mt-5">
        <caption className="h-6 bg-gray-200 rounded w-2/3 mb-2"></caption>
        <thead>
          <tr>
            <th className="w-[130px] h-6 bg-gray-200 rounded"></th>
            <th className="w-[130px] h-6 bg-gray-200 rounded"></th>
            <th className="w-[130px] h-6 bg-gray-200 rounded"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-medium h-6 bg-gray-200 rounded"></td>
            <td className="h-6 bg-gray-200 rounded"></td>
            <td className="h-6 bg-gray-200 rounded"></td>
            <td className="text-right">
              <div className="h-6 bg-gray-200 rounded inline-block mr-2"></div>
              <div className="h-6 bg-gray-200 rounded inline-block"></div>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  )
}

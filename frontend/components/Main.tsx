import React from "react";
import { FiSearch } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { LuSquarePen, LuTrash2 } from "react-icons/lu";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "completed" | "inprogress";
  createdAt?: string;
  updatedAt?: string;
}

interface MainProps {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: Task[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
}

function Main({
  setIsDialogOpen,
  data,
  handleEdit,
  handleDelete,
  text,
  setText,
  statusFilter,
  setStatusFilter,
}: MainProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="rounded-lg border border-[#e2e8f0] bg-[#ffffff] text-[#020817] shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Entities
            </h3>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-[#ffffff] transition-colors  bg-[#0f172a] text-[#f8fafc] hover:bg-[#0f172ae6] h-10 px-4 py-2 gap-2"
            >
              <FiPlus className="w-4 h-4" />
              Add Entity
            </button>
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                className="flex h-10 w-full rounded-md border border-[#e2e8f0] bg-[#ffffff] px-3 py-2 text-base ring-offset-[#ffffff] placeholder:text-[#64748b] md:text-sm pl-10"
                placeholder="Search by title..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Inprogress">In Progress</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Title
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Created
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((ele, id) => (
                  <tr
                    key={id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {ele.title}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {ele.description}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        {ele.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      2025-11-07
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(ele._id)}
                          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-[#ffffff] transition-colors  border border-[#e2e8f0] bg-[#ffffff] hover:bg-[#f1f5f9] hover:text-[#0f172a] h-9 rounded-md px-3 gap-1"
                        >
                          <LuSquarePen className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(ele._id)}
                          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors border border-[#e2e8f0] bg-[#ffffff] h-9 rounded-md px-3 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <LuTrash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

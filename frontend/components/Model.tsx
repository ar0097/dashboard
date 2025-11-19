import React from "react";

interface FormData {
  title: string;
  description: string;
  status: "pending" | "completed" | "inprogress";
}

interface ModelProps {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingEntity: string | null;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

type TaskStatus = "pending" | "completed" | "inprogress";

const statusOptions: TaskStatus[] = ["pending", "completed", "inprogress"];

function Model({
  setIsDialogOpen,
  editingEntity,
  formData,
  setFormData,
  handleSubmit,
}: ModelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => setIsDialogOpen(false)}
      />
      <div className="relative z-50 w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mx-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {editingEntity ? "Edit Entity" : "Add Entity"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              name="title"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#020817]"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#020817]"
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status:
                    statusOptions.find((s) => s === e.target.value) ||
                    "pending",
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#020817]"
            >
              <option value="active">Pending</option>
              <option value="completed">Completed</option>
              <option value="inprogress">In Progress</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsDialogOpen(false);
                setFormData({ title: "", description: "", status: "pending" });
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-[#ffffff] transition-colors  bg-[#0f172a] text-[#f8fafc] hover:bg-[#0f172ae6] h-10 px-4 py-2 gap-2"
            >
              {editingEntity ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Model;



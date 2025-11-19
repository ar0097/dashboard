"use client";
import Main from "@/components/Main";
import Model from "@/components/Model";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "completed" | "inprogress";
  createdAt?: string;
  updatedAt?: string;
}

interface TaskFormData {
  title: string;
  description: string;
  status: "pending" | "completed" | "inprogress";
}

function page() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingEntity, setEditingEntity] = useState<string | null>(null);
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    status: "pending",
  });
  const [data, setData] = useState<Task[]>([]);
  const [filteredData, setFilteredData] = useState<Task[]>([]);
  const [text, setText] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const fetchTasks = async () => {
    const res = await axios.get(
      "https://dashboard-backend-two-mu.vercel.app/api/tasks"
    );
    setData(res.data);
    setFilteredData(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    let filtered = filteredData;

    if (text !== "") {
      filtered = filtered.filter((ele) =>
        ele.title.toLowerCase().includes(text.toLowerCase())
      );
    }

    if (statusFilter !== "") {
      filtered = filtered.filter(
        (ele) => ele.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setData(filtered);
  }, [text, statusFilter, filteredData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEntity) {
        await axios.put(
          `https://dashboard-backend-two-mu.vercel.app/api/tasks/${editingEntity}`,
          formData
        );
      } else {
        await axios.post(
          "https://dashboard-backend-two-mu.vercel.app/api/tasks",
          formData
        );
      }

      setIsDialogOpen(false);
      setFormData({ title: "", description: "", status: "pending" });
      setEditingEntity(null);
      fetchTasks();
    } catch (error: any) {
      console.error("Error creating/updating task:", error);
    }
  };

  const handleEdit = (id: string) => {
    const task = data.find((t) => t._id === id);
    if (!task) return;
    setEditingEntity(id);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`https://dashboard-backend-two-mu.vercel.app/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Main
          setIsDialogOpen={setIsDialogOpen}
          data={data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          text={text}
          setText={setText}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        {isDialogOpen && (
          <Model
            setIsDialogOpen={setIsDialogOpen}
            editingEntity={editingEntity}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}

export default page;

import React, { useEffect, useState } from "react";
import { TODO, TODO_MODAL } from "../types/Todo";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useAppDispatch } from "../app/hooks";
import { addTodo, updateTodo } from "../features/todoSlice";

const TodoModal: React.FC<TODO_MODAL> = ({
  isOpen,
  onClose,
  isEdit,
  existingTodo,
}) => {
  const [formData, setFormData] = useState<TODO>({
    id: uuidv4(),
    item: "",
    description: "",
    isCompleted: false,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isEdit && existingTodo) {
      setFormData(existingTodo as TODO);
    }
  }, [isEdit, existingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        dispatch(updateTodo(formData));
        toast.success("Task updated successfully");
      } else {
        dispatch(addTodo(formData));
        toast.success("Task created successfully");
      }

      onClose();
      setFormData({
        id: uuidv4(),
        item: "",
        description: "",
        isCompleted: false,
      });
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen   bg-[#00000078] z-50 ">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-2 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ✕
        </button>
        <form onSubmit={handleSubmit}>
          <h1 className="text-white text-2xl text-center font-bold mb-4">
            {isEdit ? " Update Task Details" : "Task Details"}
          </h1>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              name="item"
              type="text"
              value={formData.item}
              onChange={(e) =>
                setFormData({ ...formData, item: e.target.value })
              }
              className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-300 text-sm text-gray-900 
                focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="Enter title..."
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <input
              name="description"
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-300 text-sm text-gray-900 
                focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="Enter description..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 
              focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg 
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isEdit ? "Update Task" : "Submit"}
          </button>
        </form>
      </div>
    </div>

    // <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
  );
};

export default TodoModal;

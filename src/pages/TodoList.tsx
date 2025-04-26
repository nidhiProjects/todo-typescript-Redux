import React from "react";
import { TODO_LIST } from "../types/Todo";
import toast from "react-hot-toast";
import { PencilLine, Trash2 } from "lucide-react";
import { useAppDispatch } from "../app/hooks";
import { deleteTodo, toggleComplete } from "../features/todoSlice";

const TodoList: React.FC<TODO_LIST> = ({ handleEdit, todos }) => {
  const dispatch = useAppDispatch();
  const handleChangeCheckBox = (id: string) => {
    try {
      dispatch(toggleComplete({ id }));

      toast.success("task status updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Something Went Wrong");
    }
  };

  const handleDelete = (id: string) => {
    try {
      dispatch(deleteTodo({ id }));
      toast.success("Task Deleted Successfully");
    } catch (error: any) {
      toast.error(error.message || "Something Went Wrong");
    }
  };
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-700">
        TODO Details
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-200 border"></th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border">
                Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border">
                Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todos && todos.length > 0 ? (
              todos.map((todo) => (
                <tr
                  key={todo.id}
                  className={` ${
                    todo.isCompleted
                      ? "bg-green-200/80 dark:hover:bg-green-200/80"
                      : ""
                  } hover:bg-gray-100 dark:hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 border text-gray-800 dark:text-gray-700 text-center">
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => handleChangeCheckBox(todo.id || "")}
                      className="w-4 h-4 cursor-pointer accent-green-600 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:bg-green-700 dark:border-green-600"
                    />
                  </td>
                  <td className="px-4 py-2 border text-gray-800 dark:text-gray-700">
                    {todo.id}
                  </td>
                  <td className="px-4 py-2 border text-gray-800 dark:text-gray-700">
                    {todo.item}
                  </td>
                  <td className="px-4 py-2 border text-gray-800 dark:text-gray-700">
                    {todo.description}
                  </td>
                  <td className="px-4 py-2 border text-gray-800 dark:text-gray-700">
                    <Trash2 
                      color="red"
                      onClick={() => handleDelete(todo.id || "")}
                    />
                    <PencilLine
                      color="green"
                      onClick={() => handleEdit(todo)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  😢 No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;

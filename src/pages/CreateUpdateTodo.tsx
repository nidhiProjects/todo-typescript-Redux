import React, { useEffect, useState } from "react";
import TodoModal from "../components/TodoModal";
import TodoList from "./TodoList";
import { TODO } from "../types/Todo";
import Dropdown from "../components/Dropdown";
import { useAppSelector } from "../app/hooks";
import { selectTodos } from "../features/todoSlice";

const CreateUpdateTodo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditId, setIsEditId] = useState<string>("");
  const [existingTodo, setExistingTodo] = useState<TODO | undefined>(undefined);
  const [filteredTodos, setFilteredTodos] = useState<TODO[]>([]);

  const todos = useAppSelector(selectTodos);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const handleEdit = (todo: TODO): void => {
    setIsModalOpen(true);
    setIsEditId(todo?.id || "");
    setExistingTodo(todo);
  };

  const onStatusChange = (status: string) => {
    if (!status) {
      setFilteredTodos(todos);
    } else {
      const filtered = todos.filter(
        (todo) => String(todo.isCompleted) === status
      );

      setFilteredTodos(filtered);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditId("");
    setExistingTodo(undefined);
  };
  return (
    <div>
      <Dropdown onStatusChange={onStatusChange} />

      <div className="flex justify-end relative mt-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="py-1 px-2 mt-2 mx-3 cursor-pointer bg-gray-700 text-white rounded-md hover:bg-gray-700 absolute"
        >
          Add Todo
        </button>
      </div>

      <TodoList handleEdit={handleEdit} todos={filteredTodos} />

      <TodoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isEdit={isEditId}
        existingTodo={existingTodo}
      />
    </div>
  );
};

export default CreateUpdateTodo;

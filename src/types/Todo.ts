export interface TODO {
  id?: string;
  item: string;
  description: string;
  isCompleted: boolean;
}

export interface TODO_MODAL {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: string;
  existingTodo?: object;
  // updateTodoList: () => void;
}

export interface TODO_LIST {
  handleEdit: (todo: TODO) => void;
  todos: TODO[];
  // updateTodoList: () => void;
  // updateTodoList(): void;
}

export interface DROPDOWN_PROPS {
  // onStatusChange: (status: string) => void;
  onStatusChange(status: string): void;
}

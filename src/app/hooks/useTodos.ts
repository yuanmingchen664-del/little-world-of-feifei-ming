import { useMemo } from "react";
import { STORAGE_KEYS } from "../lib/storageKeys";
import { useLocalStorage } from "./useLocalStorage";

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

const initialTodos: TodoItem[] = [
  {
    id: "initial-1",
    title: "准备生日礼物",
    completed: false,
    createdAt: "2026-05-25T00:00:00.000Z",
  },
  {
    id: "initial-2",
    title: "订餐厅",
    completed: true,
    createdAt: "2026-05-25T00:00:00.000Z",
  },
  {
    id: "initial-3",
    title: "买鲜花",
    completed: false,
    createdAt: "2026-05-25T00:00:00.000Z",
  },
  {
    id: "initial-4",
    title: "计划周末旅行",
    completed: false,
    createdAt: "2026-05-25T00:00:00.000Z",
  },
];

function createTodoId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<TodoItem[]>(STORAGE_KEYS.todos, initialTodos);

  const activeTodos = useMemo(() => todos.filter((todo) => !todo.completed), [todos]);
  const completedTodos = useMemo(() => todos.filter((todo) => todo.completed), [todos]);

  const addTodo = (title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return false;
    }

    setTodos((currentTodos) => [
      {
        id: createTodoId(),
        title: trimmedTitle,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...currentTodos,
    ]);

    return true;
  };

  const toggleTodo = (id: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: todo.completed ? undefined : new Date().toISOString(),
            }
          : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    activeTodos,
    completedTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}

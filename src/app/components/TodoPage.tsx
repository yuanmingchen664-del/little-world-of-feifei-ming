import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { PixelPlus, PixelCheckbox, PixelList, PixelTrash } from "./PixelIcons";

export function TodoPage() {
  const { todos, activeTodos, completedTodos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (addTodo(newTodoTitle)) {
      setNewTodoTitle("");
    }
  };

  return (
    <div className="h-full flex flex-col bg-amber-200" style={{ fontFamily: 'Press Start 2P, monospace' }}>
      <header className="flex-shrink-0 p-4 bg-amber-900 border-b-4 border-black">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-[10px] flex items-center gap-2 text-amber-100">
              <PixelList size={16} />
              待办事项
            </h1>
            <p className="text-[7px] text-amber-300 mt-1">
              {activeTodos.length} 个待完成
            </p>
          </div>
          <button
            type="submit"
            form="new-todo-form"
            className="bg-orange-500 border-4 border-black text-white px-5 py-3 flex items-center gap-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all min-h-[52px]"
          >
            <PixelPlus size={16} />
            <span className="text-[10px]">添加</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <form id="new-todo-form" onSubmit={handleSubmit} className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <label htmlFor="new-todo-title" className="sr-only">新的待办事项</label>
          <input
            id="new-todo-title"
            value={newTodoTitle}
            onChange={(event) => setNewTodoTitle(event.target.value)}
            placeholder="写下新的计划"
            className="w-full bg-amber-50 border-4 border-black px-3 py-3 text-[8px] text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white"
          />
        </form>

        {activeTodos.length > 0 && (
          <div>
            <h3 className="text-[8px] text-gray-700 mb-2">待完成</h3>
            <div className="space-y-2">
              {activeTodos.map((todo) => (
                <div
                  key={todo.id}
                  onClick={() => toggleTodo(todo.id)}
                  className="bg-white border-4 border-black p-3 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-3"
                >
                  <PixelCheckbox size={16} checked={false} className="flex-shrink-0 text-amber-600" />
                  <span className="text-[8px] flex-1 text-gray-700 leading-relaxed">
                    {todo.title}
                  </span>
                  <button
                    type="button"
                    aria-label={`删除${todo.title}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteTodo(todo.id);
                    }}
                    className="flex-shrink-0 bg-red-500 text-white border-4 border-black p-2 active:translate-x-[1px] active:translate-y-[1px]"
                  >
                    <PixelTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {completedTodos.length > 0 && (
          <div>
            <h3 className="text-[8px] text-gray-700 mb-2">已完成</h3>
            <div className="space-y-2">
              {completedTodos.map((todo) => (
                <div
                  key={todo.id}
                  onClick={() => toggleTodo(todo.id)}
                  className="bg-gray-100 border-4 border-black p-3 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-3 opacity-75"
                >
                  <PixelCheckbox size={16} checked={true} className="flex-shrink-0 text-amber-600" />
                  <span className="text-[8px] flex-1 text-gray-400 line-through leading-relaxed">
                    {todo.title}
                  </span>
                  <button
                    type="button"
                    aria-label={`删除${todo.title}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteTodo(todo.id);
                    }}
                    className="flex-shrink-0 bg-red-500 text-white border-4 border-black p-2 active:translate-x-[1px] active:translate-y-[1px]"
                  >
                    <PixelTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {todos.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="bg-white border-4 border-black p-6 inline-block">
              <PixelList size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-[8px] leading-relaxed">还没有待办事项<br/>添加一个吧</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

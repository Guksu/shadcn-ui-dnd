import { Input } from "@/components/ui/input";
import { TODO_DND_TYPE } from "@/constants";
import boardStore from "@/store/boardStore";
import { Todo } from "@/types";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

interface Props {
  todoData: Todo;
  boardId: string;
}

type TodoDropItem = {
  id: string;
  boardId: string;
};

export default function TodoItem({ todoData, boardId }: Props) {
  const [inputValue, setInputValue] = useState<string>(todoData.title);
  const updateTodo = boardStore((state) => state.updateTodo);
  const deleteTodo = boardStore((state) => state.deleteTodo);
  const moveTodo = boardStore((state) => state.moveTodo);

  const [{ isDragging }, drag] = useDrag({
    type: TODO_DND_TYPE,
    item: { id: todoData.id, boardId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: TODO_DND_TYPE,
    hover: (item: TodoDropItem) => {
      if (item.id !== todoData.id) {
        moveTodo(item.id, boardId, todoData.id);
      }
    },
  });

  const handleUpdateTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    const newTodo: Todo = {
      ...todoData,
      title: e.currentTarget.value,
    };

    updateTodo(boardId, todoData.id, newTodo);
  };

  const handleTodoDone = () => {
    const newTodo: Todo = {
      ...todoData,
      done: !todoData.done,
    };
    updateTodo(boardId, todoData.id, newTodo);
  };

  const handleDeleteTodo = () => {
    deleteTodo(boardId, todoData.id);
  };

  return (
    <div
      ref={(node) => {
        if (node) {
          drag(drop(node));
        }
      }}
      className={`${isDragging ? "opacity-50" : ""} min-h-9`}
    >
      <div className="flex items-center gap-4">
        <Input
          value={inputValue}
          onChange={handleUpdateTodo}
          disabled={todoData.done}
          className={`${
            todoData.done
              ? "bg-gray-300 line-through decoration-slice decoration-gray-900"
              : ""
          }`}
        />
        <img
          src="/icon/check.svg"
          alt="check"
          className="cursor-pointer w-4 h-4"
          onClick={handleTodoDone}
        />
        <img
          src="/icon/trash.svg"
          alt="delete"
          className="cursor-pointer w-4 h-4"
          onClick={handleDeleteTodo}
        />
      </div>
    </div>
  );
}

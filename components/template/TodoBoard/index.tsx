import { ScrollArea } from "@/components/ui/scroll-area";
import InputWithBtn from "../InputWithBtn";
import TodoItem from "../TodoItem";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Board, Todo } from "@/types";
import boardStore from "@/store/boardStore";
import { v4 as uuidv4 } from "uuid";
import { useDrag, useDrop } from "react-dnd";
import { BOARD_DND_TYPE } from "@/constants";

interface Props {
  boardData: Board;
}

type BoardDropItem = {
  id: string;
};

export default function TodoBoard({ boardData }: Props) {
  const { id, title, todo } = boardData;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [baordTilted, setBoardTilted] = useState<string>(title);
  const [newTodoInput, setNewTodoInput] = useState<string>("");

  const updateBoard = boardStore((state) => state.updateBoard);
  const deleteBoard = boardStore((state) => state.deleteBoard);
  const addTodo = boardStore((state) => state.addTodo);
  const moveBoard = boardStore((state) => state.moveBoard);

  const [{ isDragging }, drag] = useDrag({
    type: BOARD_DND_TYPE,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: BOARD_DND_TYPE,
    hover: (item: BoardDropItem) => {
      if (item.id !== id) {
        moveBoard(item.id, id);
      }
    },
  });

  const handleUpdateBoardName = () => {
    setIsEditing(false);
    updateBoard({
      id,
      title: baordTilted,
      todo,
    });
  };

  const handleDeleteBoard = () => {
    deleteBoard(id);
  };

  const handleNewTodoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoInput(e.currentTarget.value);
  };

  const handleAddTodo = () => {
    if (newTodoInput.trim() === "") {
      alert("Please enter a todo");
      return;
    }

    const newTodo: Todo = {
      id: uuidv4(),
      title: newTodoInput,
      done: false,
    };
    addTodo(id, newTodo);
    setNewTodoInput("");
  };

  return (
    <ScrollArea
      ref={(node) => {
        if (node) {
          drag(drop(node));
        }
      }}
      className={`max-h-96 w-80 rounded-md border ${isDragging} ? "opacity-50" : ""`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-8 gap-6">
          {isEditing ? (
            <>
              <Input
                value={baordTilted}
                onChange={(e) => setBoardTilted(e.currentTarget.value)}
              />
              <img
                src="/icon/check.svg"
                alt="check"
                className="w-4 h-4"
                onClick={handleUpdateBoardName}
              />
            </>
          ) : (
            <>
              <h4 className="text-sm font-medium leading-none">{title}</h4>
              <span className="flex gap-4">
                <img
                  src="/icon/edit.svg"
                  alt="edit"
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => setIsEditing(true)}
                />
                <img
                  src="/icon/trash.svg"
                  alt="delete"
                  className="cursor-pointer w-4 h-4"
                  onClick={handleDeleteBoard}
                />
              </span>
            </>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {todo.map((todoData) => (
            <TodoItem todoData={todoData} key={todoData.id} boardId={id} />
          ))}
        </div>
      </div>
      <InputWithBtn
        buttonLabel="Add Todo"
        inputPlaceholder="Add Todo"
        isSticky
        handleBtnClick={handleAddTodo}
        handleInputChange={handleNewTodoInputChange}
        inputValue={newTodoInput}
      />
    </ScrollArea>
  );
}

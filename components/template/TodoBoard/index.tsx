import { ScrollArea } from "@/components/ui/scroll-area";
import InputWithBtn from "../InputWithBtn";
import TodoItem from "../TodoItem";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Board } from "@/types";
import boardStore from "@/store/boardStore";

interface Props {
  boardData: Board;
}

export default function TodoBoard({ boardData }: Props) {
  const { id, title, todo } = boardData;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [baordTilted, setBoardTilted] = useState<string>(title);

  const updateBoard = boardStore((state) => state.updateBoard);
  const deleteBoard = boardStore((state) => state.deleteBoard);

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

  return (
    <div>
      <ScrollArea className="max-h-96 w-80 rounded-md border ">
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

          {todo.map((todoData, index) => (
            <TodoItem todoData={todoData} key={index} />
          ))}
        </div>
        {!isEditing && (
          <InputWithBtn
            buttonLabel="Add Todo"
            inputPlaceholder="Add Todo"
            isSticky
            handleBtnClick={() => {}}
            handleInputChange={() => {}}
            inputValue=""
          />
        )}
      </ScrollArea>
    </div>
  );
}

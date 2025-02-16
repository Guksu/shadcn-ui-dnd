"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import InputWithBtn from "../InputWithBtn";
import TodoItem from "../TodoItem";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function TodoBoard() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div>
      <ScrollArea className="h-96 w-80 rounded-md border ">
        <div className="p-4">
          <div className="flex justify-between items-center mb-8 gap-6">
            {isEditing ? (
              <>
                <Input value={"Board Name Change"} onChange={() => {}} />
                <img
                  src="/icon/check.svg"
                  alt="check"
                  className="w-4 h-4"
                  onClick={() => setIsEditing(false)}
                />
              </>
            ) : (
              <>
                <h4 className="text-sm font-medium leading-none">Board Name</h4>
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
                  />
                </span>
              </>
            )}
          </div>

          {Array.from({ length: 20 }).map((_, index) => (
            <TodoItem value="index" key={index} handleInputChange={() => {}} />
          ))}
        </div>
        <InputWithBtn
          buttonLabel="Add Todo"
          inputPlaceholder="Add Todo"
          isSticky
          handleBtnClick={() => {}}
          handleInputChange={() => {}}
        />
      </ScrollArea>
    </div>
  );
}

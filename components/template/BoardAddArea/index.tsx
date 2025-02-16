import { useState } from "react";
import InputWithBtn from "../InputWithBtn";
import { Board } from "@/types";
import { v4 as uuidv4 } from "uuid";
import boardStore from "@/store/boardStore";

export default function BoardAddArea() {
  const [inputValue, setInputValue] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };
  const addBoard = boardStore((state) => state.addBoard);

  const handleBtnClick = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a board name");
      return;
    }

    const newBoard: Board = {
      id: uuidv4(),
      title: inputValue,
      todo: [],
    };
    addBoard(newBoard);
    setInputValue("");
  };

  return (
    <InputWithBtn
      buttonLabel="Add Board"
      inputPlaceholder="Add Board"
      handleBtnClick={handleBtnClick}
      inputValue={inputValue}
      handleInputChange={handleInputChange}
    />
  );
}

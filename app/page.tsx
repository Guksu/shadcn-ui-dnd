"use client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardAddArea from "@/components/template/BoardAddArea";
import BoardArea from "@/components/template/BoardArea";

export default function Home() {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-10">
      <BoardAddArea />
      <DndProvider backend={HTML5Backend}>
        <BoardArea />
      </DndProvider>
    </div>
  );
}

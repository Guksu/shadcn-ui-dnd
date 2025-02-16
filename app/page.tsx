"use client";

import BoardAddArea from "@/components/template/BoardAddArea";
import BoardArea from "@/components/template/BoardArea";

export default function Home() {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-10">
      <BoardAddArea />
      <BoardArea />
    </div>
  );
}

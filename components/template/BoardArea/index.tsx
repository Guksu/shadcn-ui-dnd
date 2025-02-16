import TodoBoard from "@/components/template/TodoBoard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import boardStore from "@/store/boardStore";

export default function BoardArea() {
  const boards = boardStore((state) => state.boards);

  if (boards.length === 0) {
    return (
      <p className="mt-20 text-center text-gray-500">No boards available</p>
    );
  }

  return (
    <ScrollArea className="w-full rounded-md border">
      <div className="flex w-max space-x-4 p-10 gap-4">
        {boards.map((boardData, index) => (
          <TodoBoard key={index} boardData={boardData} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

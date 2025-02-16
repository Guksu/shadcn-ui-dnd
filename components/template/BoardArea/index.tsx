import TodoBoard from "@/components/template/TodoBoard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function BoardArea() {
  return (
    <ScrollArea className="w-full rounded-md border">
      <div className="flex w-max space-x-4 p-10 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <TodoBoard key={index} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

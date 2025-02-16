import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Todo } from "@/types";

interface Props {
  todoData: Todo;
}

export default function TodoItem({ todoData }: Props) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <Input value={todoData.title} onChange={() => {}} />
        <img
          src="/icon/check.svg"
          alt="check"
          className="cursor-pointer w-4 h-4"
        />
        <img
          src="/icon/trash.svg"
          alt="delete"
          className="cursor-pointer w-4 h-4"
        />
      </div>
      <Separator className="my-2" />
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface Props {
  value: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TodoItem({ value, handleInputChange }: Props) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <Input value={value} onChange={handleInputChange} />
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

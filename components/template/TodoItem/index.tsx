import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface Props {
  value: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TodoItem({ value, handleInputChange }: Props) {
  return (
    <div>
      <Input value={value} onChange={handleInputChange} />
      <Separator className="my-2" />
    </div>
  );
}

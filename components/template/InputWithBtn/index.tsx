import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  inputPlaceholder: string;
  buttonLabel: string;
  isSticky?: boolean;
  inputValue: string;
  handleBtnClick: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputWithBtn({
  buttonLabel,
  inputPlaceholder,
  isSticky,
  handleInputChange,
  handleBtnClick,
  inputValue,
}: Props) {
  return (
    <div
      className={`flex w-full max-w-sm items-center space-x-2 ${
        isSticky ? "sticky bottom-0 p-4 bg-white" : ""
      }`}
    >
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={inputPlaceholder}
      />
      <Button onClick={handleBtnClick}>{buttonLabel}</Button>
    </div>
  );
}

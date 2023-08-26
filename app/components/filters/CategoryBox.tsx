interface CategoryBoxProps {
  name: string;
  isChecked: boolean;
  onToggle: (name: string) => void;
}

export default function CategoryBox({
  name,
  isChecked,
  onToggle,
}: CategoryBoxProps) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-indigo-600 cursor-pointer"
        checked={isChecked}
        onChange={(e) => {
          onToggle(name);
        }}
      />
      <label className="">
        <div className="text-sm flex-wrap">{name}</div>
      </label>
    </div>
  );
}

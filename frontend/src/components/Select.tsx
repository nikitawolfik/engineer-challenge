import { ChangeEvent } from "react";
import { InputProps } from "./Search";

type Option<T> = [T | "", string];

interface Props<T> extends Omit<InputProps, "onChange"> {
  options: Option<T>[];
  onChange: (
    e: ChangeEvent<HTMLSelectElement> & { target: { value: T | "" } }
  ) => void;
}

function Select<T extends string>({
  name,
  label,
  value,
  onChange,
  options,
}: Props<T>) {
  return (
    <div className="flex flex-col mb-2 flex-1">
      <label className="text-xs ml-2 mb-1" htmlFor={`select-${name}`}>
        {label}
      </label>
      <select
        className="rounded-lg p-2 border-solid border-slate-50 border-2"
        name={name}
        value={value}
        placeholder={label}
        onChange={onChange}
      >
        {options.map(([key, display]) => (
          <option key={key} value={key}>
            {display}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;

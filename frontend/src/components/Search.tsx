import React from "react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
}

const Search = ({ value, onChange, label, name }: Props) => {
  return (
    <div className="flex flex-col">
      <label className="text-xs ml-2 mb-1" htmlFor={`input-${name}`}>
        {label}
      </label>
      <input
        className="rounded-lg p-2 border-solid border-slate-50 border-2"
        name={name}
        value={value}
        placeholder={label}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;

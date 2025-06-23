import React from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  ...rest
}) => {
  return (
    <div className="w-full">
      <select
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm text-[#1E2A47] bg-white focus:outline-none focus:ring-2 focus:ring-[#708238] transition ${className}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

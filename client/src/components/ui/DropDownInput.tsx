import { ReactElement, useRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface DropDownInputProps {
  label: string;
  name: string;
  types: string[];
  onChange?: () => void;
  icon?: ReactElement;
  register?: UseFormRegisterReturn;
}

const DropDownInput = ({ name, label, types, icon, register }: DropDownInputProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleIconClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click(); // Opens dropdown in some browsers
    }
  };

  // Safely extract ref from register if available
  const { ref, ...restRegister } = register || {};

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-medium text-white cursor-pointer" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <select
          name={name}
          id={name}
          ref={(e) => {
            if (ref) ref(e); // connect react-hook-form's ref
            selectRef.current = e; // store in your local ref
          }}
          {...restRegister}
          className="pl-2 w-full text-black border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          {types.map((type, ind) => (
            <option key={ind} value={type}>
              {type}
            </option>
          ))}
        </select>

        {icon && (
          <span
            onClick={handleIconClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-black cursor-pointer"
          >
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

export default DropDownInput;

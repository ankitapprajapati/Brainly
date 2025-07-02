import { ReactElement, useState, useEffect } from "react";
import CrossIcon from "../../icons/CrossIcon";
import { useFormContext } from "react-hook-form";
import { Tag } from "../types/tag";

interface MultiTagInputProps {
  label: string;
  name: string;
  placeholder: string;
  tags: Tag[];
  icon?: ReactElement;
}

const MultiTagInput = ({ label, name, placeholder, tags }: MultiTagInputProps) => {
  const [selectedTag, setSelectedTag] = useState<Tag[]>([]);
  const [tagModal, setTagModal] = useState(false);

  const { setValue,register } = useFormContext()

  useEffect( ()=>{
    register(name);
  },[register,name])

  useEffect( ()=>{
    setValue(name,selectedTag);
  },[selectedTag,setValue,name])

  return (
    <div
      className="flex flex-col relative gap-1 w-full max-w-80"
      onClick={() => setTagModal((c) => !c)}
    >
      <label className="font-medium text-white cursor-pointer" htmlFor={name}>
        {label}
      </label>
      <div className="w-full bg-white px-2 py-1 rounded-md flex flex-wrap items-center gap-2">
        {selectedTag.map((tag, ind) => (
          <div
            key={ind}
            className="flex items-center bg-neutral-900 text-white px-3 py-1 rounded-full gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-sm">{tag.title}</span>
            <span
              onClick={() =>
                setSelectedTag(selectedTag.filter((x) => x !== tag))
              }
              className="cursor-pointer hover:text-red-500"
            >
              <CrossIcon />
            </span>
          </div>
        ))}
        <input
          className="text-black focus:outline-none text-sm px-2 py-1"
          placeholder={placeholder}
        />
      </div>

      {tagModal && (
        <div className="top-16 bg-neutral-900 h-20 absolute w-full bottom-0 overflow-hidden overflow-y-scroll z-10">
          <ul>
            {tags.map((tag, ind) => (
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  setTagModal((c)=>!c)
                  if (!selectedTag.find((t) => t.title === tag.title)) {
                    setSelectedTag((prev) => [...prev, tag]);
                  }
                }}
                key={ind}
                className="pl-2 py-1 hover:bg-white/10 cursor-pointer"
              >
                {tag.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiTagInput;

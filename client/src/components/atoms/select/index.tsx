import React, {
  useEffect,
  useState,
  useRef,
  KeyboardEvent,
  useMemo,
  useId,
  useCallback,
} from "react";
import { ChevronDown, X, Check } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import { item } from "@/types";


interface Option {
  label: string;
  value: string;
}

interface MultiSelectDropdownProps {
  item: item;
  register?: UseFormRegister<any>;
  setValue: (name: string, value: any) => void;
  mode?: "multiple" | "tags" | "default";
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  item,
  register,
  setValue,
  mode = "default",
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const uniqueId = useId();

  const {
    placeHolder,
    inputName,
    options: initialOptions = [],
    defaultValue,
    allowClear = true,
  } = item;
  const isMultiple = mode === "multiple" || mode === "tags";

  const [options, setOptions] = useState<Option[]>(initialOptions);
  const dropdownId = `${uniqueId}-listbox`;

  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    const search = searchValue.toLowerCase();
    return isMultiple?options.filter((opt) => opt.label.toLowerCase().includes(search)):options;
  }, [options, searchValue, isMultiple]);
  const createTag = useCallback(
    (label: string) => {
      if (mode !== "tags" || !label) return;
      const exists = options.some((opt) => opt.label === label);
      if (!exists) {
        const newOption = { label, value: label };
        setOptions((prev) => [...prev, newOption]);
        setSelectedOptions((prev) => [...prev, newOption]);
        setSearchValue("");
      }
    },
    [mode, options]
  );

  useEffect(() => {
    if (defaultValue && initialOptions.length > 0) {
      const initialValues = isMultiple
        ? initialOptions.filter((opt) => defaultValue.includes(opt.value))
        : initialOptions.filter((opt) => opt.value === defaultValue);
      setSelectedOptions(initialValues);
    }
  }, [defaultValue, initialOptions, isMultiple]);
  // Update react-hook-form value whenever selectedOptions change
  useEffect(() => {
    const selected = isMultiple
      ? selectedOptions.map((opt) => opt.value)
      : selectedOptions[0]?.value || "";
    setValue(inputName, selected);
  }, [selectedOptions, isMultiple, inputName, setValue]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`#${uniqueId.replace(/:/g, "\\:")}`)) {
        setIsOpen(false);
        if (mode === "tags" && searchValue.trim()) {
          createTag(searchValue.trim());
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [searchValue, mode, uniqueId, createTag]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) =>
          Math.min(prev + 1, filteredOptions.length - 1)
        );
        break;
      case "ArrowUp":
        setHighlightedIndex((prev) => Math.max(prev - 1, -1));
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        } else if (mode === "tags" && searchValue.trim()) {
          createTag(searchValue.trim());
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "Backspace":
        if (!searchValue && isMultiple) {
          setSelectedOptions((prev) => prev.slice(0, -1));
        }
        break;
    }
  };

  const handleOptionClick = useCallback((option: Option) => {
    if (isMultiple) {
      setSelectedOptions(prev =>
        prev.some(opt => opt.value === option.value)
          ? prev.filter(opt => opt.value !== option.value)
          : [...prev, option]
      );
      setSearchValue('');
    } else {
      // Default mode specific logic
      setSelectedOptions([option]);
      setSearchValue(option.label);  // Set input value to selected label
      setIsOpen(false);
    }
  }, [isMultiple]);

  const removeTag = useCallback((value: string) => {
    setSelectedOptions((prev) => prev.filter((opt) => opt.value !== value));
    inputRef.current?.focus();
  }, []);

  const clearAll = useCallback(() => {
    setSelectedOptions([]);
    setSearchValue("");
    inputRef.current?.focus();
  }, []);
  return (
    <div
      id={uniqueId}
      className={`multi-select-container relative ${
        item?.selectWidth || "w-full"
      } bg-white`}
    >
      <div
        className={`flex flex-wrap items-center gap-2 p-1 min-h-9 border border-solid rounded-md cursor-text transition-colors ${
          isOpen
            ? "border-blue-500 ring-2 ring-blue-100"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onClick={() => {
          inputRef.current?.focus();
          setIsOpen(true);
        }}
      >
        {isMultiple &&
          selectedOptions.map((opt) => (
            <div
              key={opt.value}
              className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
            >
              {opt.label}
              <X
                className="ml-1 w-3 h-3 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(opt.value);
                }}
                aria-label={`Remove ${opt.label}`}
              />
            </div>
          ))}

        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[120px] bg-transparent outline-none border-none p-1 text-sm placeholder-gray-400"
          placeholder={selectedOptions.length === 0 ? placeHolder : ""}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={dropdownId}
          role="combobox"
        />

        <div className="flex items-center gap-1 pr-1">
          {allowClear && selectedOptions.length > 0 && (
            <X
              className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
              aria-label="Clear all selections"
            />
          )}
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <ul
          ref={dropdownRef}
          id={dropdownId}
          role="listbox"
          aria-multiselectable={isMultiple}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredOptions.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={
                selectedOptions.some((opt) => opt.value === option.value)
                  ? "true"
                  : "false"
              }
              className={`p-2 text-sm cursor-pointer transition-colors ${
                highlightedIndex === index ? "bg-gray-100" : ""
              } ${
                selectedOptions.some((opt) => opt.value === option.value)
                  ? "bg-blue-50 hover:bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => handleOptionClick(option)}
            >
              <div className="flex items-center justify-between">
                <span>{option.label}</span>
                {selectedOptions.some((opt) => opt.value === option.value) && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </div>
            </li>
          ))}

          {mode === "tags" &&
            searchValue.trim() &&
            !options.some((opt) => opt.label === searchValue.trim()) && (
              <li
                role="option"
                aria-selected="false"
                className="p-2 text-sm cursor-pointer hover:bg-gray-50 text-blue-600 font-medium"
                onClick={() => createTag(searchValue.trim())}
              >
                Create &quot;{searchValue.trim()}&quot;
              </li>
            )}
          {filteredOptions.length === 0 && mode !== "tags" && (
            <li className="p-2 text-sm text-gray-400">No options found</li>
          )}
        </ul>
      )}

      {register && (
        <input
          type="hidden"
          value={
            isMultiple
              ? selectedOptions.map((opt) => opt.value)
              : selectedOptions[0]?.value || ""
          }
          {...register(inputName)}
        />
      )}
    </div>
  );
};

export default MultiSelectDropdown;

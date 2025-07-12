import React, {
    useEffect,
    useState,
    useRef,
    KeyboardEvent,
    useMemo,
    useId,
    useCallback,
  } from "react";
  import { createPortal } from "react-dom";
  import { ChevronDown, X, Check, Search } from "lucide-react";
  
  // Type definitions
  interface Option {
    label: string;
    value: string;
    disabled?: boolean;
  }
  
  interface MultiSelectDropdownProps {
    options: Option[];
    placeholder?: string;
    defaultValue?: string | string[];
    value?: string | string[];
    onChange?: (value: string | string[]) => void;
    onSearch?: (value: string) => void;
    name?: string;
    mode?: "multiple" | "tags" | "default";
    allowClear?: boolean;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    showSearch?: boolean;
    zIndex?: number;
    width?: string;
    maxDropdownHeight?: string;
    dropdownStyle?: React.CSSProperties;
    dropdownClassName?: string;
    popupMatchSelectWidth?: boolean;
    notFoundContent?: React.ReactNode;
    optionFilterProp?: "label" | "value";
    onFocus?: () => void;
    onBlur?: () => void;
    size?: "large" | "middle" | "small";
    bordered?: boolean;
    status?: "error" | "warning";
    suffixIcon?: React.ReactNode;
    showArrow?: boolean;
  }
  
  const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
    options: initialOptions = [],
    placeholder = "Select items",
    defaultValue,
    value,
    onChange,
    onSearch,
    name = "multiselect",
    mode = "default",
    allowClear = true,
    className = "",
    disabled = false,
    loading = false,
    showSearch = true,
    zIndex = 1050, // Ant Design uses 1050 for their dropdowns
    width = "100%",
    maxDropdownHeight = "256px", // Ant Design default
    dropdownStyle,
    dropdownClassName = "",
    popupMatchSelectWidth = true,
    notFoundContent = "No data found",
    optionFilterProp = "label",
    onFocus,
    onBlur,
    size = "middle",
    bordered = true,
    status,
    suffixIcon,
    showArrow = true,
  }) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [options, setOptions] = useState<Option[]>(initialOptions);
    const [isFocused, setIsFocused] = useState(false);
    
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const portalRef = useRef<HTMLDivElement | null>(null);
    
    const uniqueId = useId();
    const [position, setPosition] = useState<{ top: number; left: number; width: any } | null>(null);
    
    const isMultiple = mode === "multiple" || mode === "tags";
    const dropdownId = `${uniqueId}-dropdown`;
    
    // Size classes for the component
    const sizeClasses = {
      large: "min-h-12 text-base",
      middle: "min-h-10 text-sm",
      small: "min-h-8 text-xs",
    };
  
    // Status classes for the component
    const statusClasses = {
      error: "border-red-500 border-solid hover:border-red-500 focus:border-red-500",
      warning: "border-yellow-500 border-solid hover:border-yellow-500 focus:border-yellow-500",
    };
  
    // Filter options based on search input
    const filteredOptions = useMemo(() => {
      if (!searchValue) return options;
      const search = searchValue.toLowerCase();
      return options.filter((opt) => opt[optionFilterProp].toLowerCase().includes(search));
    }, [options, searchValue, optionFilterProp]);
  
    // Create a new tag when in tags mode
    const createTag = useCallback(
      (label: string) => {
        if (mode !== "tags" || !label) return;
        const exists = options.some((opt) => opt.label.toLowerCase() === label.toLowerCase());
        if (!exists) {
          const newOption = { label, value: label };
          setOptions((prev) => [...prev, newOption]);
          setSelectedOptions((prev) => [...prev, newOption]);
          setSearchValue("");
        }
      },
      [mode, options]
    );
  
    // Handle controlled or uncontrolled component
    useEffect(() => {
      if (value !== undefined && initialOptions.length > 0) {
        const controlledValues = isMultiple
          ? initialOptions.filter((opt) => 
              Array.isArray(value) 
                ? value.includes(opt.value)
                : value === opt.value
            )
          : initialOptions.filter((opt) => opt.value === value);
        setSelectedOptions(controlledValues);
      } else if (defaultValue !== undefined && initialOptions.length > 0 && value === undefined) {
        const initialValues = isMultiple
          ? initialOptions.filter((opt) => 
              Array.isArray(defaultValue) 
                ? defaultValue.includes(opt.value)
                : defaultValue === opt.value
            )
          : initialOptions.filter((opt) => opt.value === defaultValue);
        setSelectedOptions(initialValues);
      }
    }, [value, defaultValue, initialOptions, isMultiple]);
  
    // Update options when initialOptions change
    useEffect(() => {
      setOptions(initialOptions);
    }, [initialOptions]);
  
    // Invoke onChange callback when selection changes
    useEffect(() => {
      if (onChange && value === undefined) {
        const selected = isMultiple
          ? selectedOptions.map((opt) => opt.value)
          : selectedOptions[0]?.value || "";
        onChange(selected);
      }
    }, [selectedOptions, isMultiple, onChange, value]);
  
    // Create portal container on mount
    useEffect(() => {
      const portalEl = document.createElement("div");
      portalEl.id = `portal-${uniqueId}`;
      portalEl.style.zIndex = String(zIndex);
      document.body.appendChild(portalEl);
      portalRef.current = portalEl;
  
      return () => {
        if (portalRef.current) {
          document.body.removeChild(portalRef.current);
          portalRef.current = null;
        }
      };
    }, [uniqueId, zIndex]);
  
    // Update dropdown position on scroll/resize
    useEffect(() => {
      if (isOpen && containerRef.current) {
        const updatePosition = () => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            // Check if there's enough space below
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceNeeded = Math.min(filteredOptions.length * 32, parseInt(maxDropdownHeight));
            const shouldOpenUpward = spaceBelow < spaceNeeded && rect.top > spaceNeeded;
            
            setPosition({
              top: shouldOpenUpward 
                ? rect.top + window.scrollY - spaceNeeded - 5 // Open upward
                : rect.bottom + window.scrollY + 5, // Open downward
              left: rect.left + window.scrollX,
              width: popupMatchSelectWidth ? rect.width : undefined,
            });
          }
        };
  
        updatePosition();
  
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);
  
        return () => {
          window.removeEventListener("scroll", updatePosition, true);
          window.removeEventListener("resize", updatePosition);
        };
      } else {
        setPosition(null);
      }
    }, [isOpen, filteredOptions.length, maxDropdownHeight, popupMatchSelectWidth]);
  
    // Handle clicks outside the component
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInsideComponent = containerRef.current?.contains(target);
        const isInsidePortal = portalRef.current?.contains(target);
        
        if (!isInsideComponent && !isInsidePortal) {
          setIsOpen(false);
          setIsFocused(false);
          if (mode === "tags" && searchValue.trim()) {
            createTag(searchValue.trim());
          }
          onBlur?.();
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [searchValue, mode, createTag, onBlur]);
  
    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      
      if (!isOpen && (e.key === "ArrowDown" || e.key === " ")) {
        setIsOpen(true);
        e.preventDefault();
        return;
      }
  
      if (!isOpen) return;
  
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex] && !filteredOptions[highlightedIndex].disabled) {
            handleOptionClick(filteredOptions[highlightedIndex]);
          } else if (mode === "tags" && searchValue.trim()) {
            createTag(searchValue.trim());
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          inputRef.current?.blur();
          break;
        case "Tab":
          setIsOpen(false);
          break;
        case "Backspace":
          if (!searchValue && isMultiple && selectedOptions.length > 0) {
            removeTag(selectedOptions[selectedOptions.length - 1].value);
          }
          break;
      }
    };
  
    // Handle selection of an option
    const handleOptionClick = useCallback(
      (option: Option) => {
        if (option.disabled) return;
        
        if (isMultiple) {
          setSelectedOptions((prev) =>
            prev.some((opt) => opt.value === option.value)
              ? prev.filter((opt) => opt.value !== option.value)
              : [...prev, option]
          );
          setSearchValue("");
          inputRef.current?.focus();
        } else {
          setSelectedOptions([option]);
          setSearchValue("");
          setIsOpen(false);
        }
      },
      [isMultiple]
    );
  
    // Remove a selected tag
    const removeTag = useCallback((value: string, e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      setSelectedOptions((prev) => prev.filter((opt) => opt.value !== value));
      inputRef.current?.focus();
    }, []);
  
    // Clear all selections
    const clearAll = useCallback((e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      setSelectedOptions([]);
      setSearchValue("");
      inputRef.current?.focus();
    }, []);
  
    // Toggle dropdown
    const toggleDropdown = (e: React.MouseEvent) => {
      if (disabled) return;
      
      setIsOpen(!isOpen);
      if (!isOpen) {
        inputRef.current?.focus();
        onFocus?.();
        setIsFocused(true);
      } else {
        inputRef.current?.blur();
        onBlur?.();
        setIsFocused(false);
      }
    };
  
    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      onSearch?.(value);
      
      if (!isOpen && value) {
        setIsOpen(true);
      }
    };
  
    // Handle input focus
    const handleFocus = () => {
      setIsFocused(true);
      onFocus?.();
    };
  
    // Handle input blur
    const handleBlur = () => {
      // Don't close dropdown immediately, let click events process first
      setTimeout(() => {
        if (!isOpen) {
          setIsFocused(false);
          onBlur?.();
        }
      }, 100);
    };
  
    return (
      <div
        ref={containerRef}
        id={uniqueId}
        className={`relative ${className}`}
        style={{ width }}
      >
        <div
          onClick={toggleDropdown}
          className={`flex flex-wrap items-center gap-1 px-3 py-1 border-solid transition-all ${
            sizeClasses[size]
          } ${
            bordered ? 'border rounded-md' : 'border-b'
          } ${
            disabled 
              ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed' 
              : status 
                ? statusClasses[status]
                : isOpen || isFocused
                  ? "border-blue-400 ring-2 ring-blue-100 cursor-text"
                  : "border-gray-300 hover:border-blue-400 cursor-pointer"
          }`}
        >
          {isMultiple ? (
            <div className="flex flex-wrap gap-1 items-center py-1 max-w-full">
              {selectedOptions.length > 0 ? (
                selectedOptions.map((opt) => (
                  <div
                    key={opt.value}
                    className={`flex items-center gap-1 bg-gray-100 text-gray-800 rounded px-2 py-1 mr-1 text-sm ${
                      disabled ? 'opacity-60' : ''
                    }`}
                  >
                    <span className="truncate max-w-[100px]">{opt.label}</span>
                    {!disabled && (
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={(e) => removeTag(opt.value, e)}
                        aria-label={`Remove ${opt.label}`}
                      />
                    )}
                  </div>
                ))
              ) : null}
              
              <input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!disabled) setIsOpen(true);
                }}
                disabled={disabled}
                className={`flex-1 min-w-[20px] max-w-full bg-transparent outline-none ${
                  selectedOptions.length > 0 ? 'ml-1' : ''
                }`}
                placeholder={selectedOptions.length === 0 ? placeholder : ""}
                aria-expanded={isOpen}
                aria-controls={dropdownId}
                role="combobox"
              />
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <input
                ref={inputRef}
                type="text"
                value={!showSearch ? (selectedOptions[0]?.label || "") : searchValue}
                onChange={showSearch ? handleSearchChange : undefined}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!disabled) setIsOpen(true);
                }}
                readOnly={!showSearch}
                disabled={disabled}
                className="flex-1 bg-transparent outline-none cursor-pointer"
                placeholder={selectedOptions.length === 0 ? placeholder : ""}
                aria-expanded={isOpen}
                aria-controls={dropdownId}
                role="combobox"
              />
              
              {selectedOptions.length === 0 && (
                <span className="text-gray-400">{placeholder}</span>
              )}
            </div>
          )}
  
          <div className="flex items-center gap-2 ml-auto pl-2">
            {loading && (
              <div className="w-4 h-4 border-2 border-t-blue-500 border-solid rounded-full animate-spin"></div>
            )}
            
            {allowClear && selectedOptions.length > 0 && !disabled && (
              <X
                className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                onClick={clearAll}
                aria-label="Clear all selections"
              />
            )}
            
            {showArrow && (suffixIcon || (
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            ))}
          </div>
        </div>
  
        {isOpen && portalRef.current && position && (
          createPortal(
            <div
              ref={dropdownRef}
              id={dropdownId}
              className={`rounded-md shadow-lg overflow-hidden bg-white border border-gray-200 border-solid ${dropdownClassName}`}
              style={{
                position: "absolute",
                top: `${position.top}px`,
                left: `${position.left}px`,
                width: position.width ? `${position.width}px` : "auto",
                zIndex,
                ...dropdownStyle
              }}
            >
              {mode === "multiple" && showSearch && (
                <div className="px-2 py-1 border-b border-gray-100 border-solid">
                  <div className="flex items-center bg-gray-50 rounded px-2 py-1">
                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                      type="text"
                      value={searchValue}
                      onChange={handleSearchChange}
                      className="w-full bg-transparent outline-none text-sm"
                      placeholder="Search..."
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              )}
              
              <ul
                className="overflow-y-auto"
                style={{ maxHeight: maxDropdownHeight }}
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={
                        selectedOptions.some((opt) => opt.value === option.value)
                      }
                      className={`px-3 py-2 cursor-pointer transition-colors ${
                        option.disabled ? 'opacity-50 cursor-not-allowed text-gray-400' : ''
                      } ${
                        highlightedIndex === index ? "bg-gray-50" : ""
                      } ${
                        selectedOptions.some((opt) => opt.value === option.value)
                          ? "bg-blue-50 hover:bg-blue-100"
                          : option.disabled ? "" : "hover:bg-gray-50"
                      }`}
                      onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOptionClick(option);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{option.label}</span>
                        {selectedOptions.some(
                          (opt) => opt.value === option.value
                        ) && <Check className="w-4 h-4 text-blue-500" />}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-sm text-gray-400 text-center">
                    {notFoundContent}
                  </li>
                )}
  
                {mode === "tags" && searchValue.trim() && 
                  !options.some((opt) => opt.label.toLowerCase() === searchValue.trim().toLowerCase()) && (
                    <li
                      // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
                      role="option"
                      className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 text-blue-500 font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        createTag(searchValue.trim());
                      }}
                    >
                      + Create &quot;{searchValue.trim()}&quot;
                    </li>
                  )}
              </ul>
            </div>,
            portalRef.current
          )
        )}
  
        <input
          type="hidden"
          name={name}
          value={
            isMultiple
              ? JSON.stringify(selectedOptions.map((opt) => opt.value))
              : selectedOptions[0]?.value || ""
          }
        />
      </div>
    );
  };
  
  export default MultiSelectDropdown;
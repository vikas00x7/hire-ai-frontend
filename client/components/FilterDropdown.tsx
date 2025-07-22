import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterField {
  key: string;
  label: string;
  placeholder: string;
  options: FilterOption[];
}

interface FilterDropdownProps {
  fields: FilterField[];
  onApply: (filters: Record<string, string>) => void;
  initialValues?: Record<string, string>;
  className?: string;
}

export function FilterDropdown({
  fields,
  onApply,
  initialValues = {},
  className = "",
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [dropdownPosition, setDropdownPosition] = useState<'left' | 'right'>('left');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownContentRef = useRef<HTMLDivElement>(null);

  // Initialize filters with initial values
  useEffect(() => {
    setFilters(initialValues);
  }, [initialValues]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Calculate dropdown position when it opens
  useLayoutEffect(() => {
    if (isOpen && dropdownRef.current && dropdownContentRef.current) {
      const buttonRect = dropdownRef.current.getBoundingClientRect();
      const dropdownWidth = 320; // w-80 = 20rem = 320px
      const viewportWidth = window.innerWidth;
      
      // Check if there's enough space to the right
      if (buttonRect.right + dropdownWidth > viewportWidth) {
        setDropdownPosition('right');
      } else {
        setDropdownPosition('left');
      }
    }
  }, [isOpen]);  

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClear = () => {
    setFilters({});
  };

  const handleApply = () => {
    onApply(filters);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="outline"
        className="text-gray-700 border-gray-200"
        onClick={handleToggle}
      >
        <Filter className="mr-2 h-4 w-4" />
        Filter
      </Button>

      {isOpen && (
        <div 
          ref={dropdownContentRef}
          className={`absolute top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 ${dropdownPosition === 'right' ? 'right-0' : 'left-0'}`}>
        
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    {field.label}
                  </Label>
                  <Select
                    value={filters[field.key] || ""}
                    onValueChange={(value) => handleFilterChange(field.key, value)}
                  >
                    <SelectTrigger className="w-full border-gray-200 focus:border-gray-300">
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {field.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4 mt-4 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={handleClear}
                className="flex-1 text-gray-700 border-gray-200 hover:bg-gray-50"
              >
                Clear
              </Button>
              <Button
                onClick={handleApply}
                className="flex-1 bg-gray-800 hover:bg-gray-900 text-white"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

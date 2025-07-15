import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

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

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  fields: FilterField[];
  onApply: (filters: Record<string, string>) => void;
  initialValues?: Record<string, string>;
}

export function FilterModal({
  open,
  onOpenChange,
  title,
  fields,
  onApply,
  initialValues = {},
}: FilterModalProps) {
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Initialize filters when modal opens or initial values change
  useEffect(() => {
    if (open) {
      setFilters(initialValues);
    }
  }, [open, initialValues]);

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
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFilters(initialValues);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
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

        <div className="flex gap-3 pt-4">
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
      </DialogContent>
    </Dialog>
  );
}

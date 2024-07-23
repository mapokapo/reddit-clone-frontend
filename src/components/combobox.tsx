"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ComboboxItem {
  value: string;
  label: string;
}

type Props = {
  items: ComboboxItem[];
  selectLabel: string;
  searchLabel: string;
  emptyLabel: string;
  value: string | null;
  onValueChange: (value: string) => void;
  disabled: boolean;
};

const Combobox: React.FC<Props> = ({
  items,
  selectLabel,
  searchLabel,
  emptyLabel,
  value,
  onValueChange,
  disabled,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[200px] justify-between",
            !value && "text-muted-foreground"
          )}
          disabled={disabled}>
          {value
            ? items.find(item => item.value === value)?.label
            : selectLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          filter={(value, search) => {
            const item = items.find(item => item.value === value);

            if (
              item &&
              item.label.toLowerCase().includes(search.toLowerCase())
            ) {
              return 1;
            }
            return 0;
          }}>
          <CommandInput placeholder={searchLabel} />
          <CommandList>
            <CommandEmpty>{emptyLabel}</CommandEmpty>
            <CommandGroup>
              {items.map(item => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={currentValue => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;

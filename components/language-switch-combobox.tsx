"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "bs",
    label: "🇧🇦",
  },
  {
    value: "en",
    label: "🇬🇧",
  },
];

export function LanguageSwitch({ locale }: { locale: string }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>(locale);
  const router = useRouter();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-20 justify-between rounded-2xl bg-white border-none outline-none shadow-none hover:bg-white py-2 data-[state=open]:rounded-b-none"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select language"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-20 p-0 bg-white rounded-2xl">
        <Command className="bg-white hover:bg-white focus:bg-white active:bg-white rounded-2xl ">
          <CommandList>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    router.replace("/", {
                      locale: currentValue as "bs" | "en" | undefined,
                    });
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

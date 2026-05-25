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
  { value: "bs", label: "🇧🇦", short: "BS" },
  { value: "en", label: "🇬🇧", short: "EN" },
];

export function LanguageSwitch({
  locale,
  variant = "light",
}: {
  locale: string;
  variant?: "light" | "dark";
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>(locale);
  const router = useRouter();

  const current = frameworks.find((f) => f.value === value);

  const isDark = variant === "dark";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-7 px-2.5 gap-1.5 justify-between rounded-full text-xs font-semibold border transition-all",
            isDark
              ? "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 shadow-none"
              : "bg-white border-none shadow-none hover:bg-white py-2 rounded-2xl w-20 data-[state=open]:rounded-b-none"
          )}
        >
          <span>{current?.label}</span>
          <span className={isDark ? "text-white/70" : "text-gray-500"}>
            {current?.short}
          </span>
          <ChevronDown className={cn("h-3 w-3 shrink-0", isDark ? "text-white/50" : "opacity-50")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-28 p-1 rounded-xl border shadow-lg",
          isDark
            ? "bg-red-950 border-white/10"
            : "bg-white rounded-2xl border-none"
        )}
        sideOffset={6}
        align="end"
      >
        <Command className={cn("rounded-xl", isDark ? "bg-red-950" : "bg-white")}>
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
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-semibold cursor-pointer",
                    isDark
                      ? "text-white/80 hover:bg-white/10 hover:text-white data-[selected=true]:bg-white/10"
                      : "hover:bg-gray-50"
                  )}
                >
                  <span>{framework.label}</span>
                  <span>{framework.short}</span>
                  <Check
                    className={cn(
                      "ml-auto h-3 w-3",
                      value === framework.value ? "opacity-100" : "opacity-0",
                      isDark ? "text-white" : ""
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

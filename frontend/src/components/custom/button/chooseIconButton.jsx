import {
  FaGithub,
  FaPhone,
  FaLinkedinIn,
  FaRegEnvelope,
} from "react-icons/fa6";

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

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { cn } from "@/lib/utils";
const icons = [
  { name: "Phone", Component: FaPhone, value: "fa-phone" },
  { name: "Github", Component: FaGithub, value: "fa-github" },
  { name: "Linkedin", Component: FaLinkedinIn, value: "fa-linkedin" },
  { name: "Mail", Component: FaRegEnvelope, value: "fa-envelope-o" },
];

const ChooseIconButton = React.forwardRef(({ className, ...props }, ref) => {
  const [selectedId, setSelected] = React.useState(props.value);
  const [open, setOpen] = React.useState(false);
  const selectedIcon =
    icons.find((icon) => icon.value === selectedId)?.Component || FaPhone;
  return (
    <Popover open={open} onOpenChange={setOpen} className={cn("", className)}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="">
          {React.createElement(selectedIcon)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-4">
        <Command>
          <CommandInput placeholder="Search icon" />
          <CommandList>
            <CommandEmpty>No icon found</CommandEmpty>
            <CommandGroup>
              {icons.map((icon) => (
                <CommandItem
                  key={icon.value}
                  value={icon.value}
                  onSelect={() => {
                    setSelected(icon.value);
                    setOpen(false);
                    props.onChange(icon.value);
                  }}
                  className="flex items-center gap-2"
                >
                  {React.createElement(icon.Component, {
                    className: "h-4 w-4",
                  })}
                  {icon.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

ChooseIconButton.displayName = "ChooseIconButton";
export { ChooseIconButton };

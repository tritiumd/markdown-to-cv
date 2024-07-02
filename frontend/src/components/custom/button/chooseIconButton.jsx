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
const icons = [
  { id: 1, name: "Phone", Component: FaPhone },
  { id: 2, name: "Github", Component: FaGithub },
  { id: 3, name: "Linkedin", Component: FaLinkedinIn },
  { id: 4, name: "Mail", Component: FaRegEnvelope },
];

export default function ChooseIconButton() {
  const [selectedId, setSelected] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const selectedIcon =
    icons.find((icon) => icon.id === selectedId)?.Component || Phone;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {React.createElement(selectedIcon, { className: "h-4 w-4" })}
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
                  key={icon.id}
                  value={icon.id}
                  onSelect={() => {
                    setSelected(icon.id);
                    setOpen(false);
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
}

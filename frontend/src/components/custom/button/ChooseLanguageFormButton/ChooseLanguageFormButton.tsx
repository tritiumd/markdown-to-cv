import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, Globe } from "lucide-react";
import * as React from "react";

interface ChooseCVLanguageButtonProps {
  value: string;
  onChange: (value: string) => void;
}

const languages = [
  { value: "en", label: "English" },
  { value: "vi", label: "Tiếng Việt" },
];

const ChooseCVLanguageButton = React.forwardRef<
  HTMLButtonElement,
  ChooseCVLanguageButtonProps
>((props, ref) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 w-48">
          <Globe className="h-5 w-5" />
          <span>
            {
              languages.find((language) => language.value === props.value)
                ?.label
            }
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.value}
            onSelect={() => props.onChange(language.value)}
          >
            <div className="flex items-center justify-between">
              <span>{language.label}</span>
              {props.value === language.value && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ChooseCVLanguageButton.displayName = "ChooseIconButton";
export default ChooseCVLanguageButton;

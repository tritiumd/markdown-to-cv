import { Button } from "@/components/ui/button";
import { CircleMinus } from "lucide-react";
import * as React from "react";
import "./RemoveSubFieldButton.module.css";

interface RemoveSubFieldButtonProps {
  onClick: () => void;
}

const RemoveSubFieldButton = React.forwardRef<
  HTMLButtonElement,
  RemoveSubFieldButtonProps
>(({ onClick }, ref) => {
  return (
    <Button
      variant="link"
      onClick={onClick}
      size="icon"
      className="dynamic-delete-button"
    >
      <CircleMinus />
    </Button>
  );
});

RemoveSubFieldButton.displayName = "RemoveSubFieldButton";

export default RemoveSubFieldButton;

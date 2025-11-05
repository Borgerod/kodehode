import React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./Button";

// Tag is a thin preset wrapper around Button. It fixes:
//   shape = "pill", mode = "text", variant = "frosted"
// while allowing color and brightness (and other button props) to be passed.
export type TagProps = Omit<ButtonProps, "shape" | "mode" | "variant">;

export const Tag: React.FC<TagProps> = ({
  color = "grey",
  brightness = "dark",
  className = "",
  disabled = true,
  clickable = false,
  children,
  ...props
}) => {
  return (
    <Button
      {...props}
      variant="frosted"
      shape="pill"
      mode="text"
      color={color}
      brightness={brightness}
      disabled={disabled}
      clickable={clickable}
      // make tags compact by default and add small spacing so they wrap nicely
      className={cn("px-2 py-1 text-sm font-normal ", className)}
    >
      {children}
    </Button>
  );
};
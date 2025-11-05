import React from "react";
import { cn } from "@/lib/utils";

// ButtonGrid is a simple container grid that can be tinted via
// `color` and `brightness` props (keeps the same color names as Button).
export type Color = "none" | "white" | "grey" | "black" | "green";
export type Brightness = "light" | "dark";

// Constants for frosted/grid visuals — keep these together like `baseColor`.
const FROSTED_BASE = "backdrop-blur-md ";

const FROSTED_VARIANT: Record<Brightness, string> = {
  light: "text-[var(--color-foreground)]",
  dark: "text-[var(--color-background)] ",
};

const BUTTON_BRIGHTNESS: Record<Brightness, string> = {
  light: "text-[var(--color-foreground)]",
  dark: "text-[var(--color-background)]",
};

const BASE_COLOR: Record<Color, string> = {
  none: "",
  white: "bg-[var(--color-surface-white-primary)]",
  grey:  "bg-[var(--color-surface-grey-primary)]",
  black: "bg-[var(--color-surface-black-secondary)]",
  green: "bg-[var(--color-surface-green-primary)]",
};

// Per-item base/hover mappings (mirrors the button color mapping so
// grid children match Button hover behavior).
const ITEM_BG: Record<Color, string> = {
//   none: "bg-[color-mix(in_srgb,black_1%,var(--color-surface-grey-secondary)_5%)]",
  none: "bg-[color-mix(in_srgb,black_1%,var(--color-surface-grey-secondary)_5%)] hover:bg-[color-mix(in_srgb,black_5%,var(--color-surface-grey-secondary)_5%)] active:bg-[var(--color-surface-grey-primary)]",
  // include active states to better mirror `Button.tsx`
  white:
    "bg-[color-mix(in_srgb,black_1%,var(--color-surface-white-secondary)_5%)] hover:bg-[color-mix(in_srgb,black_10%,var(--color-surface-white-secondary)_15%)] active:bg-[var(--color-surface-white-primary)]",
  grey:
    "bg-[color-mix(in_srgb,black_1%,var(--color-surface-grey-secondary)_5%)] hover:bg-[color-mix(in_srgb,black_10%,var(--color-surface-grey-secondary)_15%)] active:bg-[var(--color-surface-grey-primary)]",
  black:
    "bg-[color-mix(in_srgb,black_1%,var(--color-surface-black-secondary)_5%)] hover:bg-[color-mix(in_srgb,black_10%,var(--color-surface-black-secondary)_15%)] active:bg-[var(--color-surface-black-secondary)]",
  green:
    "bg-[color-mix(in_srgb,black_1%,var(--color-surface-green-secondary)_5%)] hover:bg-[color-mix(in_srgb,black_10%,var(--color-surface-green-secondary)_15%)] active:bg-[var(--color-surface-green-primary)]",
};

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: Color;
  brightness?: Brightness;
  frosted?: boolean;
}

export const ButtonGrid: React.FC<GridProps> = ({
  brightness = "dark",
  color = "none",
  frosted = false,
  className,
  children,
  ...props
}) => {


 

  // use shared constants defined above

  const classes = cn(
    "grid grid-cols-4 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.18)] h-full w-full p-0 gap-1 place-items-stretch",
    // "grid grid-cols-4 rounded-3xl h-full w-full p-0 gap-1 place-items-stretch",
    // "grid grid-cols-4 rounded-3xl drop-shadow-xs h-full w-full p-0 gap-1 place-items-stretch",
    // "grid grid-cols-4 rounded-3xl h-full w-full p-0 gap-1 place-items-stretch",

    // put brightness before baseColor so explicit colors override brightness bg
    // when frosted, prefer the frosted-style variant background (similar to Button's frosted variant)
    frosted ? FROSTED_VARIANT[brightness] : BUTTON_BRIGHTNESS[brightness],
    // apply explicit color override after background so it wins
    BASE_COLOR[color],
    // apply backdrop/rounded when frosted
    frosted ? FROSTED_BASE : "",
    className
  );

  return (
    <div {...props} className={classes}>
      {React.Children.map(children, (child, idx) => {
        // If the grid has no explicit color, provide a subtle hover fallback
        const hoverFallback = brightness === "light" ? "hover:bg-white/10" : "hover:bg-black/10";
        const bgClasses = ITEM_BG[color] || hoverFallback;

        // compute per-item corner classes so outer items match the container shape
        const count = React.Children.count(children);
        const cols = 4;
        const rows = Math.ceil(count / cols);

        let cornerClass = "";
        if (count === 1) {
          cornerClass = "rounded-xl";
        } else {
          if (idx === 0) cornerClass += " rounded-tl-xl";
          const topRightIdx = Math.min(cols - 1, count - 1);
          if (idx === topRightIdx && Math.floor(idx / cols) === 0) cornerClass += " rounded-tr-xl";
          if (Math.floor(idx / cols) === rows - 1 && idx % cols === 0) cornerClass += " rounded-bl-xl";
          if (idx === count - 1) cornerClass += " rounded-br-xl";
        }

        const baseItemClass = cn(
          "w-full h-full overflow-hidden flex items-center justify-center transition-colors duration-200",
          // pointer + remove focus/border styles
          "cursor-pointer focus:outline-none focus:ring-0 border-0",
          // subtle white drop shadow for each item
        //   "shadow-[0_0_18px_rgba(255,255,255,0.06)]",
        // "bg-yellow-400",
        // "bg-[] ",
        // "bg-[darken(var(--color-surface-grey-secondary), 50%)]",
        
          // apply item bg/hover/active classes based on the grid color prop or fallback
        );

        // If child is a native <button> element, merge our classes into it.
        if (React.isValidElement(child) && typeof child.type === "string") {
          const tag = child.type as string;
          if (tag === "button" || tag === "a") {
            // merge className props; keep child's existing behavior
            const reactEl = child as React.ReactElement<any>;
            const childClass = (reactEl.props && (reactEl.props.className as string)) || "";
            return React.cloneElement(reactEl, {
              key: idx,
              className: cn(baseItemClass, cornerClass, bgClasses, childClass),
            });
          }
        }

        // Otherwise, wrap the child in a native button for correct semantics and keyboard support.
        return (
          <button key={idx} type="button" className={cn(baseItemClass, cornerClass, bgClasses)}>
            {child}
          </button>
        );
      })}
    </div>
  );
};
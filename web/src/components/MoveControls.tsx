import type { MouseEvent, ReactNode } from "react";

type MoveControlSize = "xs" | "sm" | "md";

type MoveControlsProps = {
  onPrevious?: () => void;
  onNext?: () => void;
  previousLabel: string;
  nextLabel: string;
  orientation?: "horizontal" | "vertical";
  size?: MoveControlSize;
  stopPropagation?: boolean;
  className?: string;
  buttonClassName?: string;
  dividerClassName?: string;
  disabled?: boolean;
  previousIcon?: ReactNode;
  nextIcon?: ReactNode;
};

const sizeStyles: Record<
  MoveControlSize,
  {
    buttonText: string;
    padding: string;
    horizontalDivider: string;
    verticalSpacing: string;
  }
> = {
  xs: {
    buttonText: "text-[0.7rem] font-semibold",
    padding: "px-1.5 py-0.5",
    horizontalDivider: "h-3",
    verticalSpacing: "my-0.5",
  },
  sm: {
    buttonText: "text-xs font-semibold",
    padding: "px-2 py-1",
    horizontalDivider: "h-4",
    verticalSpacing: "my-1",
  },
  md: {
    buttonText: "text-lg leading-none",
    padding: "px-2 py-1",
    horizontalDivider: "h-5",
    verticalSpacing: "my-1.5",
  },
};

export default function MoveControls({
  onPrevious,
  onNext,
  previousLabel,
  nextLabel,
  orientation = "horizontal",
  size = "md",
  stopPropagation = false,
  className = "",
  buttonClassName = "",
  dividerClassName = "",
  disabled = false,
  previousIcon,
  nextIcon,
}: MoveControlsProps) {
  const isVertical = orientation === "vertical";
  const variant = sizeStyles[size];
  const previousDisabled = disabled || !onPrevious;
  const nextDisabled = disabled || !onNext;
  const resolvedPreviousIcon =
    previousIcon ?? (isVertical ? "↑" : "←");
  const resolvedNextIcon =
    nextIcon ?? (isVertical ? "↓" : "→");

  const handleClick = (action?: () => void, isDisabled?: boolean) => {
    return (event: MouseEvent<HTMLButtonElement>) => {
      if (stopPropagation) {
        event.stopPropagation();
      }
      if (isDisabled) return;
      action?.();
    };
  };

  return (
    <div
      className={`flex ${
        isVertical ? "flex-col" : "flex-row"
      } items-center rounded-full border border-amber-200 bg-white/80 shadow-sm ${className}`}
    >
      <button
        type="button"
        onClick={handleClick(onPrevious, previousDisabled)}
        disabled={previousDisabled}
        aria-label={previousLabel}
        className={`${variant.padding} text-stone-600 transition hover:text-stone-900 disabled:cursor-not-allowed disabled:text-stone-300 ${
          variant.buttonText
        } ${buttonClassName}`}
      >
        {resolvedPreviousIcon}
      </button>
      <div
        aria-hidden="true"
        className={`bg-amber-200 ${
          isVertical
            ? `${variant.verticalSpacing} h-px w-full`
            : `${variant.horizontalDivider} w-px`
        } ${dividerClassName}`}
      />
      <button
        type="button"
        onClick={handleClick(onNext, nextDisabled)}
        disabled={nextDisabled}
        aria-label={nextLabel}
        className={`${variant.padding} text-stone-600 transition hover:text-stone-900 disabled:cursor-not-allowed disabled:text-stone-300 ${
          variant.buttonText
        } ${buttonClassName}`}
      >
        {resolvedNextIcon}
      </button>
    </div>
  );
}

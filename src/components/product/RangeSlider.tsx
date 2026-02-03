import * as Slider from "@radix-ui/react-slider";
import { cn } from "../../libs/utils";

interface RangeSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min?: number;
  max: number;
  step?: number;
}

export function RangeSlider({
  value,
  onChange,
  min = 0,
  max,
  step = 1,
}: RangeSliderProps) {
  return (
    <Slider.Root
      className="relative flex items-center w-full h-6 select-none touch-none"
      value={value}
      min={min}
      max={max}
      step={step}
      onValueChange={(v) => onChange(v as [number, number])}
    >
      {/* Track */}
      <Slider.Track className="relative grow rounded-full h-1.5 bg-muted">
        {/* Active range */}
        <Slider.Range className="absolute h-full rounded-full bg-gold-gradient" />
      </Slider.Track>

      {/* Thumbs */}
      <Slider.Thumb
        className={cn(
          "block h-5 w-5 rounded-full bg-white border-2 border-yellow-500",
          "shadow-sm transition",
          "hover:scale-110 focus:outline-none focus:ring-2"
        )}
      />
      <Slider.Thumb
        className={cn(
          "block h-5 w-5 rounded-full bg-white border-2 border-yellow-500",
          "shadow-sm transition",
          "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
        )}
      />
    </Slider.Root>
  );
}

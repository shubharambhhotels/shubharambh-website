import { ImageIcon } from "lucide-react";

interface Props {
  label?: string;
  className?: string;
  aspectRatio?: string; // e.g. "aspect-video", "aspect-square", "aspect-[3/4]"
}

export default function ImagePlaceholder({
  label = "Photo",
  className = "",
  aspectRatio = "aspect-video",
}: Props) {
  return (
    <div
      className={`img-placeholder ${aspectRatio} w-full ${className}`}
      aria-label={`Image placeholder: ${label}`}
    >
      <div className="flex flex-col items-center gap-2 opacity-50">
        <ImageIcon size={28} strokeWidth={1} />
        <span className="text-[10px] tracking-widest uppercase">{label}</span>
      </div>
    </div>
  );
}

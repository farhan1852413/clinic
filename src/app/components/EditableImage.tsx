'use client';

import Image from "next/image";
import { useState, useRef } from "react";
import EditableImage from "components/app/components/EditableImage";

// ─── Editable Image Component ───────────────────────────────────────────────
// Shared across all pages so every image on the site can be swapped client-side.
export default function EditableImage({
  src,
  alt,
  fill,
  className,
  priority,
  width,
  height,
  label = "Change Image",
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  label?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImgSrc(URL.createObjectURL(file));
  };

  return (
    <div className="group relative w-full h-full">
      {fill ? (
        <Image src={imgSrc} alt={alt} fill className={className} priority={priority} />
      ) : (
        <Image src={imgSrc} alt={alt} width={width} height={height} className={className} />
      )}
      <button
        onClick={() => inputRef.current?.click()}
        className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/80 text-primary-gold text-xs font-ui tracking-widest px-3 py-1.5 rounded-full border border-primary-gold/40 backdrop-blur-sm"
      >
        ✦ {label}
      </button>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}
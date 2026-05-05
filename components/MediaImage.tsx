import Image from "next/image";

type MediaImageProps = {
  src: string;
  alt: string;
  aspect?: "16:9" | "4:5" | "1:1" | "3:2" | "auto";
  priority?: boolean;
  caption?: string;
  className?: string;
  sizes?: string;
};

const ASPECT_CLASSES: Record<NonNullable<MediaImageProps["aspect"]>, string> = {
  "16:9": "aspect-[16/9]",
  "4:5": "aspect-[4/5]",
  "1:1": "aspect-square",
  "3:2": "aspect-[3/2]",
  auto: "",
};

export function MediaImage({
  src,
  alt,
  aspect = "auto",
  priority = false,
  caption,
  className = "",
  sizes = "100vw",
}: MediaImageProps) {
  return (
    <figure className={className}>
      <div
        className={`relative w-full ${ASPECT_CLASSES[aspect]} bg-sage overflow-hidden`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-[11px] tracking-[0.14em] uppercase text-olive">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

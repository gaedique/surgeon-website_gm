import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ImageCarouselProps } from "./types";

export const ImageCarousel = ({
  specialties,
  currentSpecialty,
  isScrolled,
  scrollProgress,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setcurrentSpecialty,
  ...otherProps
}: ImageCarouselProps) => {
  // State to track current screen size
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  // Calculate scale class based on scroll progress
  const scaleClass = useMemo(() => {
    if (scrollProgress < 0.03) return "scale-100";
    if (scrollProgress < 0.06) return "scale-105";
    if (scrollProgress < 0.09) return "scale-110";
    return "scale-110";
  }, [scrollProgress]);

  // Update screen size based on window width
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    // Set initial screen size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define a type for the specialty object
  type Specialty = {
    id: string;
    title: string;
    image: {
      src: string;
      alt: string;
      blurDataURL?: string;
      srcSet?: {
        mobile?: string;
        tablet?: string;
        desktop?: string;
      };
    };
  };

  // Helper to get the right image based on screen size
  const getResponsiveImage = (specialty: Specialty) => {
    if (specialty.image.srcSet && specialty.image.srcSet[screenSize]) {
      return specialty.image.srcSet[screenSize];
    }
    return specialty.image.src;
  };

  return (
    <div className="relative w-full h-full" {...otherProps}>
      {specialties.map((specialty, index) => (
        <div
          key={specialty.id || index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSpecialty ? "opacity-100" : "opacity-0"
          } ${scaleClass} transition-transform duration-100 ease-out`}
          data-specialty={specialty.title}
          itemProp="about"
        >
          <div className="relative w-full h-full">
            <Image
              src={getResponsiveImage(specialty)}
              alt={`${specialty.title} - Dr. Gilles Mariambourg, Chirurgien Orthopédiste à Castres - ${specialty.image.alt}`}
              fill
              priority={index === 0}
              placeholder={specialty.image.blurDataURL ? "blur" : "empty"}
              blurDataURL={specialty.image.blurDataURL}
              className={`object-cover object-center transition-transform duration-1000 ease-out ${
                isScrolled ? "scale-110" : "scale-100"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
              onError={(e) => {
                console.error(
                  `Failed to load image: ${getResponsiveImage(
                    specialty as Specialty
                  )}`
                );
                // Fallback to default image if responsive image fails
                if (
                  (e.target as HTMLImageElement).src !== specialty.image.src
                ) {
                  (e.target as HTMLImageElement).src = specialty.image.src;
                }
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

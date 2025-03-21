// "use client";
// import { contact, doctor, specialties } from "@/src/data/siteData";
// import useScroll from "@/src/hooks/useScroll";
// import CtaButton from "@/src/ui/CtaButton";
// import ScrollReveal from "@/src/ui/ScrollReveal";
// import TexturedBackground from "@/src/ui/TexturedBackground";
// import { Phone } from "lucide-react";
// import { HeroHeading } from "./components/HeroHeading";
// import { ImageCarousel } from "./components/ImageCarousel";
// import { SpecialtyLabel } from "./components/SpecialtyLabel";
// import { SpecialtyWaypoints } from "./components/Waypoints";
// import { useImageCarousel } from "./hooks/useImageCarousel";

// const Hero = () => {
//   const { isScrolled, scrollProgress } = useScroll({
//     scrollThreshold: 50,
//     heightReference: window.innerHeight,
//   });

//   const { currentSpecialty, setcurrentSpecialty } =
//     useImageCarousel(specialties);

//   return (
//     <section
//       className="container-full h-svh min-h-[40rem] px-4  pt-[calc(var(--navbar-height)+32px)] lg:pt-[calc(var(--navbar-height)+48px)]"
//       aria-labelledby="hero-heading"
//       role="banner"
//     >
//       {/* SEO enhancing metadata added as data attributes for client components */}
//       <div className="hidden" aria-hidden="true" data-seo-metadata>
//         <div data-schema="MedicalBusiness">
//           <span data-prop="name">{doctor.fullName}</span>
//           <span data-prop="description">{doctor.description.short}</span>
//           <span data-prop="telephone">{contact.details.phone}</span>
//           <span data-prop="address">{`${contact.address.street}, ${contact.address.postalCode} ${contact.address.city}`}</span>
//           <span data-prop="medicalSpecialty">
//             {doctor.specialties.join(", ")}
//           </span>
//         </div>
//       </div>

//       <div className="relative flex flex-col justify-start mx-auto gap-6 h-full max-w-[1920px] overflow-hidden rounded-2xl text-center">
//         {/* Background texture */}
//         <TexturedBackground className="absolute inset-0" />

//         {/* Layered overlay */}
//         <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-bay-of-many-800/50"></div>

//         <ScrollReveal threshold={0.1} duration={1250}>
//           {/* Main content */}
//           <article className="relative pt-12 md:pt-16 px-4 sm:px-8">
//             {/* Pass required props to HeroHeading */}
//             <HeroHeading
//               id="hero-heading"
//               doctorName={doctor.shortName}
//               doctorTitle={doctor.title}
//               doctorLocation="Castres, France"
//             />

//             {/* Cta buttons */}
//             <div
//               className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
//               role="group"
//               aria-label="Options de contact"
//             >
//               <CtaButton
//                 href={`tel:${contact.details.phone.replace(/\s/g, "")}`}
//                 icon={Phone}
//                 variant="light"
//                 className="w-full sm:w-auto"
//                 aria-label="Appeler la clinique"
//               >
//                 Appeler
//               </CtaButton>
//               <CtaButton
//                 href={contact.details.doctolib || "https://www.doctolib.fr"}
//                 external
//                 variant="dark"
//                 className="w-full sm:w-auto"
//                 aria-label="Prendre rendez-vous sur Doctolib"
//               >
//                 DOCTOLIB
//               </CtaButton>
//             </div>
//           </article>
//         </ScrollReveal>

//         {/* Image area */}
//         <div className="z-10 mx-0 flex-1 w-full md:relative md:mx-auto max-w-7xl px-4 sm:px-8">
//           <figure className="relative overflow-hidden rounded-lg md:rounded-xl lg:rounded-2xl bg-black/20 h-full">
//             {/* Image carousel */}
//             <ImageCarousel
//               specialties={specialties}
//               currentSpecialty={currentSpecialty}
//               setcurrentSpecialty={setcurrentSpecialty}
//               isScrolled={isScrolled}
//               scrollProgress={scrollProgress}
//               aria-live="polite"
//             />

//             {/* Layered gradient */}
//             <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
//           </figure>
//         </div>

//         <div className="absolute bottom-3 inset-x-0 flex flex-col items-center gap-3">
//           {/* Waypoints */}
//           <SpecialtyWaypoints
//             specialties={specialties}
//             currentSpecialty={currentSpecialty}
//             setcurrentSpecialty={setcurrentSpecialty}
//           />
//           {/* Specialty label */}
//           <SpecialtyLabel specialty={specialties[currentSpecialty]} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
"use client";
import { contact, doctor, specialties } from "@/src/data/siteData";
import useScroll from "@/src/hooks/useScroll";
import CtaButton from "@/src/ui/CtaButton";
import ScrollReveal from "@/src/ui/ScrollReveal";
import TexturedBackground from "@/src/ui/TexturedBackground";
import { Phone } from "lucide-react";
import { HeroHeading } from "./components/HeroHeading";
import { ImageCarousel } from "./components/ImageCarousel";
import { SpecialtyLabel } from "./components/SpecialtyLabel";
import { SpecialtyWaypoints } from "./components/Waypoints";
import { useImageCarousel } from "./hooks/useImageCarousel";
import { useWindowSize, useHasMounted } from "@/src/utils/clientOnly";

const Hero = () => {
  // Get window height safely
  const { height } = useWindowSize();
  const hasMounted = useHasMounted();

  // Use the safe height from the hook
  const { isScrolled, scrollProgress } = useScroll({
    scrollThreshold: 50,
    // Only pass height after component has mounted
    heightReference: hasMounted ? height : 800,
  });

  const { currentSpecialty, setcurrentSpecialty } =
    useImageCarousel(specialties);

  return (
    <section
      className="container-full h-svh min-h-[40rem] px-4 pt-[calc(var(--navbar-height)+32px)] lg:pt-[calc(var(--navbar-height)+48px)]"
      aria-labelledby="hero-heading"
      role="banner"
    >
      {/* SEO enhancing metadata added as data attributes for client components */}
      <div className="hidden" aria-hidden="true" data-seo-metadata>
        <div data-schema="MedicalBusiness">
          <span data-prop="name">{doctor.fullName}</span>
          <span data-prop="description">{doctor.description.short}</span>
          <span data-prop="telephone">{contact.details.phone}</span>
          <span data-prop="address">{`${contact.address.street}, ${contact.address.postalCode} ${contact.address.city}`}</span>
          <span data-prop="medicalSpecialty">
            {doctor.specialties.join(", ")}
          </span>
        </div>
      </div>

      <div className="relative flex flex-col justify-start mx-auto gap-6 h-full max-w-[1920px] overflow-hidden rounded-2xl text-center">
        {/* Background texture */}
        <TexturedBackground className="absolute inset-0" />

        {/* Layered overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-bay-of-many-800/50"></div>

        <ScrollReveal threshold={0.1} duration={1250}>
          {/* Main content */}
          <article className="relative pt-12 md:pt-16 px-4 sm:px-8">
            {/* Pass required props to HeroHeading */}
            <HeroHeading
              id="hero-heading"
              doctorName={doctor.shortName}
              doctorTitle={doctor.title}
              doctorLocation="Castres, France"
            />

            {/* Cta buttons */}
            <div
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
              role="group"
              aria-label="Options de contact"
            >
              <CtaButton
                href={`tel:${contact.details.phone.replace(/\s/g, "")}`}
                icon={Phone}
                variant="light"
                className="w-full sm:w-auto"
                aria-label="Appeler la clinique"
              >
                Appeler
              </CtaButton>
              <CtaButton
                href={contact.details.doctolib || "https://www.doctolib.fr"}
                external
                variant="dark"
                className="w-full sm:w-auto"
                aria-label="Prendre rendez-vous sur Doctolib"
              >
                DOCTOLIB
              </CtaButton>
            </div>
          </article>
        </ScrollReveal>

        {/* Image area */}
        <div className="z-10 mx-0 flex-1 w-full md:relative md:mx-auto max-w-7xl px-4 sm:px-8">
          <figure className="relative overflow-hidden rounded-lg md:rounded-xl lg:rounded-2xl bg-black/20 h-full">
            {/* Image carousel */}
            <ImageCarousel
              specialties={specialties}
              currentSpecialty={currentSpecialty}
              setcurrentSpecialty={setcurrentSpecialty}
              isScrolled={isScrolled}
              scrollProgress={scrollProgress}
              aria-live="polite"
            />

            {/* Layered gradient */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
          </figure>
        </div>

        <div className="absolute bottom-3 inset-x-0 flex flex-col items-center gap-3">
          {/* Waypoints */}
          <SpecialtyWaypoints
            specialties={specialties}
            currentSpecialty={currentSpecialty}
            setcurrentSpecialty={setcurrentSpecialty}
          />
          {/* Specialty label */}
          <SpecialtyLabel specialty={specialties[currentSpecialty]} />
        </div>
      </div>
    </section>
  );
};

export default Hero;

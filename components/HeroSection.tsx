import PlanifierButton from "@/components/PlanifierButton";
import GarageHouse from "@/components/GarageHouse";

export default function HeroSection() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-14">
        <div className="flex-1 max-w-2xl text-center md:text-left">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-brand uppercase leading-tight mb-6">
            Experts Portes de Garage
          </h1>
          <p className="text-[#1a1a1a] text-lg md:text-xl leading-relaxed mb-3">
            Réparation rapide, service local, résultats garantis.
          </p>
          <p className="text-[#1a1a1a] text-base leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
            Nos experts se déplacent rapidement partout en Estrie et
            Montérégie pour régler le problème dès la première visite.
            Service courtois, honnête et garanti.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center md:items-start">
            <PlanifierButton className="bg-brand text-white font-bold px-8 py-3.5 rounded-lg text-center hover:bg-brand-dark transition-colors shadow-lg w-full sm:w-auto">
              Planifier maintenant
            </PlanifierButton>
            <a
              href="tel:4505585788"
              className="border-2 border-brand text-brand font-bold px-8 py-3.5 rounded-lg text-center hover:bg-brand hover:text-white transition-colors w-full sm:w-auto"
            >
              450-558-5788
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-center w-full">
          <GarageHouse />
        </div>
      </div>
    </section>
  );
}

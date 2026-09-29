import AvisGoogle from "@/components/AvisGoogle";
import ReviewsSlider from "@/components/ReviewsSlider";

export default function ReviewsSection() {
  return (
    <>
      <AvisGoogle />
      <section className="bg-muted py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-3xl md:text-4xl text-brand text-center uppercase mb-12">
            Mes engagements
          </h2>
          <ReviewsSlider />
        </div>
      </section>
    </>
  );
}

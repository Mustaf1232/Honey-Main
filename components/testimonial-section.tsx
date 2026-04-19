import { TestimonialCarouselComponent } from "./testimonial-carousel";
import type { Children } from "./rich-text/serialize";
import RichText from "./rich-text";
import type { Testimonials } from "./home-page-client-wrapper";
const TestimonialSection = ({
  testimonial_title,
  testiominals,
}: {
  testimonial_title: Children;
  testiominals: Testimonials;
}) => {
  return (
    <div className="max-w-7xl mx-auto">
      <RichText content={testimonial_title} className="text-center" />
      <TestimonialCarouselComponent testimonials={testiominals} />
    </div>
  );
};
export default TestimonialSection;

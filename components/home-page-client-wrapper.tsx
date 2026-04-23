"use client"

import { HoneyShopLandingComponent } from "./honey-shop-landing"
import InfoSection from "./info-section"
import PresentationSection from "./presentation-section"
import ScienceSection from "./science-section"
import RecipeSection from "./recipe-section"
// import TestimonialSection from "./testimonial-section"
import type { HomePageData, AllProducts } from "@/types"
import type { Children } from "./rich-text/serialize"
import type { StudyArray } from "./science-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export type Testimonial = {
  testimonial_author: string
  testimonial_content: string
  testimonial_picture: string
}

export type Testimonials = { docs: Testimonial[] }

const HomePageClientWrapper = ({
  page_data,
  science_section_title,
  science_array,
  presentation_paragraph,
  presentation_products,
  product_data,
  order_button,
  recipe_section_paragraph,
}: {
  page_data: HomePageData
  science_section_title: Children
  science_array: StudyArray
  presentation_paragraph: Children
  presentation_products: string[]
  order_button: string
  product_data: AllProducts
  recipe_section_paragraph: Children
}) => {

  return (
    <main className="min-h-screen w-full h-full mx-auto">
      <HoneyShopLandingComponent page_data={page_data} buy_button={order_button} />
      <PresentationSection
        presentation_paragraph={presentation_paragraph}
        presentation_products={presentation_products}
        product_data={product_data}
      />
      <InfoSection page_data={page_data} />
      <ScienceSection title={science_section_title} studies={science_array} />
      <div className="pt-32" />
      <RecipeSection recipe_paragraph={recipe_section_paragraph} />
      <div className="pt-32" />
      {/* <TestimonialSection
        testimonial_title={testimonial_title}
        testiominals={testimonials}
      /> */}
      <Link href="/product/4" className="w-full flex items-center justify-center">
        <Button className="rounded-full text-md px-8 py-6 min-w-[150px] z-30 uppercase font-semibold text-background background-noise hover:bg-red-900 transition-all duration-500 hover:text-background">
          {order_button}
        </Button>
      </Link>

    </main>
  )
}

export default HomePageClientWrapper

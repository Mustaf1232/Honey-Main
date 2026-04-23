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

      {/* Wave separator */}
      <div className="w-full overflow-hidden leading-none -mt-1 bg-background">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[60px] md:h-[100px] block">
          <path d="M0,40 C180,100 360,0 540,60 C720,120 900,20 1080,70 C1260,120 1380,40 1440,60 L1440,0 L0,0 Z" fill="transparent"/>
          <path d="M0,40 C180,100 360,0 540,60 C720,120 900,20 1080,70 C1260,120 1380,40 1440,60 L1440,120 L0,120 Z" fill="#7f1d1d" opacity="0.6"/>
          <path d="M0,70 C200,20 400,100 600,50 C800,0 1000,90 1200,50 C1350,20 1420,80 1440,70 L1440,120 L0,120 Z" fill="#991b1b" opacity="0.8"/>
          <path d="M0,90 C240,50 480,110 720,80 C960,50 1200,100 1440,85 L1440,120 L0,120 Z" fill="#7f1d1d"/>
        </svg>
      </div>

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

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
      <HoneyShopLandingComponent page_data={page_data} buy_button={order_button} product_data={product_data} />

      {/* Wave separator */}
      <div className="w-full overflow-hidden leading-none -mt-[2px] bg-background relative z-10">
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
      <RecipeSection recipe_paragraph={recipe_section_paragraph} />

      {/* CTA section */}
      <section className="w-full bg-gradient-to-b from-white to-red-50/60 py-20 px-4">
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-red-800/30" />
            <span className="text-xs font-bold text-red-800 tracking-[0.2em] uppercase">Naruči danas</span>
            <span className="h-px w-8 bg-red-800/30" />
          </div>
          <p className="text-gray-500 text-sm text-center max-w-xs">
            100% prirodan med — isporučujemo na vašu adresu
          </p>
          <Link href="/product/4">
            <Button className="rounded-full text-sm px-10 py-6 uppercase font-bold bg-red-900 text-white hover:bg-red-800 transition-all duration-300 shadow-lg shadow-red-900/20 tracking-widest">
              {order_button}
            </Button>
          </Link>
        </div>
      </section>

    </main>
  )
}

export default HomePageClientWrapper

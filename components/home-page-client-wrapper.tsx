"use client"

import { useState, useEffect } from "react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { PercentIcon } from "lucide-react"

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
  
  user_data,
}: {
  page_data: HomePageData
  science_section_title: Children
  science_array: StudyArray
  presentation_paragraph: Children
  presentation_products: string[]
  order_button: string
  product_data: AllProducts
  recipe_section_paragraph: Children
  
  user_data: string | null
}) => {
  const [showSignupModal, setShowSignupModal] = useState(false)

  useEffect(() => {
    // Show modal only if user is not logged in
    if (user_data === null) {
      // Small delay to ensure the modal doesn't appear immediately on page load
      const timer = setTimeout(() => {
        setShowSignupModal(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [user_data])

  return (
    <main className="min-h-screen w-full h-full mx-auto">
      <HoneyShopLandingComponent page_data={page_data} buy_button={order_button} />
      <InfoSection page_data={page_data} />
      <ScienceSection title={science_section_title} studies={science_array} />
      <PresentationSection
        presentation_paragraph={presentation_paragraph}
        presentation_products={presentation_products}
        product_data={product_data}
      />
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

      {/* Signup Discount Modal */}
      <Dialog open={showSignupModal} onOpenChange={setShowSignupModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <PercentIcon className="h-5 w-5 text-red-900" />
              Special Offer for New Customers
            </DialogTitle>
            <DialogDescription className="pt-2 text-base">
              Sign up today and receive <span className="font-bold text-red-900">10% off</span> your first order!
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Join our community of honey lovers and enjoy exclusive benefits:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>10% discount on your first purchase</li>
              <li>Early access to seasonal products</li>
              <li>Track your orders easily</li>
            </ul>
          </div>
          <DialogFooter className="sm:justify-between flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowSignupModal(false)}>
              Maybe Later
            </Button>
            <Link href="/account">
              <Button className="w-full sm:w-auto rounded-full bg-red-900 hover:bg-red-800">Sign Up Now</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default HomePageClientWrapper

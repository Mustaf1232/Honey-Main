"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table"
import type { OrderObjectType } from "@/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { AuthFormTranslations } from "@/components/auth-form"
import { LogOut } from "lucide-react"
import { user_signout, update_user } from "@/app/[locale]/account/actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useUserContext } from "@/context/UserContext"
import LoadingSpinner from "@/components/loading-spinner"

export default function AccountPage({
  user_data,
  translations,
}: {
  user_data: string | null
  translations: AuthFormTranslations
}) {
  
  const user_info = JSON.parse(user_data as string)
  const { user_orders, user_orders_loading, user_order_error } = useUserContext()

  const [user, setUser] = useState({
    name: user_info.user_name || "",
    last_name: user_info.user_last_name || "",
    phone: user_info.user_phone_number || "",
    email: user_info.user_email || "",
    birthday: user_info.user_birthday || "",
  })
  const [isSaving, setIsSaving] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handle_save_changes = async () => {
    setIsSaving(true)
    try {
      await update_user({
        user_name: user.name,
        user_last_name: user.last_name,
        user_phone_number: user.phone,
        user_birthday: user.birthday,
      })
      toast({
        title: "Saved",
        description: "Your information has been updated successfully.",
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handle_user_signout = async () => {
    try {
      await user_signout()
      toast({
        title: "Success",
        description: "You have been successfully logged out of your account",
        variant: "default",
      })
      router.refresh()
    } catch (error) {
      console.error("Error loging out", error)
      toast({
        title: "Error",
        description: "Sorry there has been an error logging you out. Please try again or contact us",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6 min-h-[70vh]">
      <Card>
        <CardHeader>
          <CardTitle>{translations.personal_information}</CardTitle>
          <CardDescription>{translations.update_info}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{translations.first_name}</Label>
            <Input id="name" name="name" value={user.name} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">{translations.last_name}</Label>
            <Input id="last_name" name="last_name" value={user.last_name} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthday">{translations.birthday}</Label>
            <Input
              id="birthday"
              name="birthday"
              type="date"
              max={new Date().toISOString().split("T")[0]}
              value={user.birthday}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" value={user.email} disabled className="bg-gray-100 cursor-not-allowed" />
          </div>
        </CardContent>
        <div className="px-6 pb-6">
          <Button
            className="rounded-full bg-red-900"
            onClick={handle_save_changes}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : translations.save_changes}
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View your recent orders and their status.</CardDescription>
        </CardHeader>
        <CardContent>
          {user_order_error && <></>}
          {user_orders_loading && (
            <div className="w-full h-full animate-pulse flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
          {user_orders?.docs?.length === 0 && (
            <div className="w-full h-full flex items-center justify-center">
              <p>You currently have no orders.</p>
            </div>
          )}
          {user_orders !== null &&
            !user_orders_loading &&
            user_orders.docs !== undefined &&
            user_orders?.docs.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user_orders?.docs?.map((order: OrderObjectType) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.order_date}</TableCell>
                      <TableCell>{order.order_total}</TableCell>
                      <TableCell className="capitalize">{order.order_status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
        </CardContent>
      </Card>

      <div className="flex space-x-4 justify-end">
        <Button onClick={() => handle_user_signout()} className="flex items-center bg-red-900 rounded-full">
          <LogOut className="mr-2 h-4 w-4" />
          {translations.sign_out}
        </Button>
      </div>
    </div>
  )
}

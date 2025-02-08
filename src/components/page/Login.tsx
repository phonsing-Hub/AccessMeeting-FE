import {Image} from "@heroui/react";
// import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          {/* <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Access Meeting
          </a> */}
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-gradient-to-br from-[#00B4D8] to-[#03045E] lg:flex flex-col justify-center items-center text-zinc-50">
        <Image src="/images/PTG_Energy_Logo.png" className=" size-52"/>
        <div className="text-center w-2/3 mt-5">
          <h2 className="text-4xl">WELCOME TO</h2>
          <h1 className="text-5xl">ACCESS MEETING</h1>
          <p>Connecting everyone to have the opportunity to access a life that is 
          “well, happy” in every aspect of their lives.</p>
        </div>
      </div>
    </div>
  )
}

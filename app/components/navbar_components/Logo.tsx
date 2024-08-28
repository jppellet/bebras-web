"use client"

import { getBasePath } from "@/app/components/Utils"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {
  const router = useRouter()
  const basePath = getBasePath()
  return (
    <Image
      onClick={() => router.push("/tasks")}
      alt="Logo"
      className="hidden md:block cursor-pointer select-none "
      height="50"
      width="150"
      src={`${basePath}/images/bebras_CH.png`}
    />
  )
}

export default Logo

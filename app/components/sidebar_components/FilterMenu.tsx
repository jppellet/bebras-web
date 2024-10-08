"use client"

import { CategoryCaptions } from "@/app/components/Utils"
import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { useEffect } from "react"
import { BiMinus, BiPlus } from "react-icons/bi"

const CATEGORY_SEARCH_KEY = "category"
const SUBCATEGORY_SEARCH_KEY = "subcategory"

interface FilterMenuProps {
  categoryCode: string
  subCategoryCodes?: readonly string[]
  categorySearchKey?: string
  subcategorySearchKey?: string
  clickable?: boolean
}

export default function FilterMenu({
  categoryCode,
  subCategoryCodes,
  categorySearchKey = CATEGORY_SEARCH_KEY,
  subcategorySearchKey = SUBCATEGORY_SEARCH_KEY,
  clickable,
}: FilterMenuProps) {
  const router = useRouter()
  const params = useSearchParams()

  const isOpen = params.get(categorySearchKey) === categoryCode || !clickable

  // On toggle function to handle changes in checked categories
  function pushSearchParams(
    key: string,
    value: string,
    clear: boolean = false
  ) {
    const query = {
      ...qs.parse(params.toString()),
    }

    if (clear) {
      query[categorySearchKey] = ""
      query[subcategorySearchKey] = ""
    }

    if (params.get(key) == value) {
      query[key] = ""
    } else {
      query[key] = value
    }

    const url = qs.stringifyUrl(
      {
        url: "/tasks/",
        query: query,
      },
      { skipNull: true, skipEmptyString: true }
    )
    router.push(url)
  }

  // Add on click effect on menu label
  useEffect(() => {
    const label = document.getElementById(`${categoryCode}Label`)

    label?.addEventListener("click", () => {
      if (clickable) {
        pushSearchParams(categorySearchKey, categoryCode, true)
      }
    })
  })

  return (
    <div className="select-none ml-2 mb-2">
      <div
        id={`${categoryCode}Label`}
        className={`flex justify-between text-lg px-2 py-3 rounded-sm leading-none
        ${isOpen ? "text-black font-semibold" : "text-gray-900 font-medium"} ${isOpen && clickable
            ? " border-l-[6px] border-thunderbird-700 bg-neutral-100"
            : ""
          }
           ${clickable ? "hover:bg-neutral-100 cursor-pointer" : ""}`}
      >
        <h3>{CategoryCaptions[categoryCode].fr}</h3>

        <div className="flex flex-row items-center justify-end">
          {(subCategoryCodes?.length ?? 0) > 0 &&
            clickable &&
            (isOpen ? <BiMinus size={20} /> : <BiPlus size={20} />)}
        </div>
      </div>
      <div className={isOpen ? "block" : "hidden"}>
        <div className="flex flex-col">
          {subCategoryCodes?.map((subCat) => (
            <div
              key={subCat}
              onClick={() => pushSearchParams(subcategorySearchKey, subCat)}
              className={`mx-6 pl-2 py-1 mt-1 hover:bg-neutral-100 rounded-sm cursor-pointer leading-none ${params.get(subcategorySearchKey) === subCat
                ? "bg-neutral-100 border-l-4 border-thunderbird-700 font-medium"
                : "bg-white font-normal"
                }`}
            >
              <h1>{CategoryCaptions[subCat].fr}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

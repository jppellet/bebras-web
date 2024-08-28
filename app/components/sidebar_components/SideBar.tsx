"use client"

import { categories } from "bebras/out/patterns"
import { AgeCategories } from "bebras/out/util"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { FiFilter } from "react-icons/fi"
import FilterMenu from "./FilterMenu"

export default function SideBar() {
  const params = useSearchParams()
  return (
    <div className="h-full bg-white border-r-2">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-center px-2 py-[9px] gap-2 border-b-2">
          <h1 className="font-semibold text-xl">Filtres</h1>
          <FiFilter size={20} />
        </div>

        <Suspense>
          <div className="border-b-2">
            <FilterMenu
              categoryCode="age"
              subCategoryCodes={AgeCategories}
              subcategorySearchKey="age"
            />
          </div>
          {categories.map((cat) => <FilterMenu
            key={cat.name}
            categoryCode={cat.name}
            subCategoryCodes={cat.subs.map((sub) => sub.name)}
            clickable
          />)
          }
        </Suspense>
      </div>
    </div>
  )
}

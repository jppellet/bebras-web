"use client"

import Button from "@/app/components/Button"
import { SortTasksOptions } from "@/app/components/Utils"
import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { useCallback, useState } from "react"
import { BsChevronDown } from "react-icons/bs"

export default function TaskListSort() {
  const router = useRouter()
  const params = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  function sortOnClick(sortKey: string) {
    const query = {
      ...qs.parse(params.toString()),
      sort: params.get("sort") === sortKey ? undefined : sortKey,
    }

    const url = qs.stringifyUrl(
      {
        url: "/tasks/",
        query: query,
      },
      { skipNull: true }
    )
    router.push(url)
  }

  return (
    <div onMouseOver={toggleOpen} onMouseOut={toggleOpen} className="">
      <Button label="Trier" onClick={() => null} icon={BsChevronDown} />
      {isOpen && (
        <div className="absolute bg-white overflow-hidden border rounded-lg">
          <div className="flex flex-col cursor-pointer">
            {SortTasksOptions.map((o) => (
              <div
                key={o.key}
                onClick={() => sortOnClick(o.key)}
                className={`px-2 py-1 hover:bg-neutral-100 text-sm text-gray-500 
                ${params.get("sort") === o.key && "bg-neutral-100"}`}
              >
                {o.caption.fr}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import Button from "@/app/components/Button"
import useDownloadZip from "@/app/hooks/useDownloadZip"
import { GrDocumentZip } from "react-icons/gr"

interface TaskDownloadZipProps {
  taskId: string
  htmlContent: string
  mdContent: string
  texContent: string
}

export default function TaskDownloadZip({
  taskId,
  htmlContent,
  mdContent,
  texContent,
}: TaskDownloadZipProps) {
  const downloadZip = useDownloadZip(
    taskId,
    htmlContent,
    mdContent,
    texContent
  )

  return (
    <div className="">
      <Button
        large
        label=""
        onClick={downloadZip}
        icon={GrDocumentZip}
        iconSize="20"
      />
    </div>
  )
}

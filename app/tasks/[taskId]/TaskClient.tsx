"use client"

import { CategoryCaptions } from "@/app/components/Utils"
import TaskDownloadPdf from "@/app/components/tasks_components/TaskDownloadPdf"
import TaskDownloadZip from "@/app/components/tasks_components/TaskDownloadZip"
import TaskHtmlFrame from "@/app/components/tasks_components/TaskHtmlFrame"
import TaskKeyword from "@/app/components/tasks_components/TaskKeyword"
import { TaskMetadata } from "bebras/out/util"

interface TaskClientProps {
  task: TaskMetadata
  htmlContent: string
  mdContent: string
  texContent: string
}

export default function TaskClient({
  task,
  htmlContent,
  mdContent,
  texContent,
}: TaskClientProps) {
  return (
    <div>
      <div className="">
        <div className="h-1/6 flex justify-between border-b-2">
          <div className=" w-1/3 py-2 px-5 ml-2 border-r-2">
            <h1 className="text-lg font-bold">Mots-clés</h1>
            {task.keywords.map((keyword, index) => (
              <TaskKeyword key={`keyword${index}`} keyword={keyword} />
            ))}
          </div>

          <div className="w-1/3 py-2 px-5 border-r-2">
            <h1 className="text-lg font-bold">Catégories</h1>
            <ul className=" list-disc pl-7">
              {task.categories.map((cat, index) => {
                const subs = cat.subs.filter(subcat => subcat.name !== "other")
                return (<div key={`cat${index}`}>
                  <li className="text-base">{CategoryCaptions[cat.name].fr}</li>
                  {
                    subs.length === 0 ? undefined :
                      <ul className="ml-3 list-square">
                        {subs.map(subcat =>
                          <li key={subcat.name} className="text-xs">
                            {CategoryCaptions[subcat.name].fr}
                          </li>
                        )}
                      </ul>
                  }
                </div>
                )
              })}
            </ul>
          </div>

          <div className="w-1/3 py-2 px-5 justify-end mr-2">
            <h1 className="text-lg font-bold">Téléchargements</h1>
            <div className="flex flex-row items-center justify-start">
              <TaskDownloadZip
                taskId={task.id}
                htmlContent={htmlContent}
                mdContent={mdContent}
                texContent={texContent}
              />
              <TaskDownloadPdf taskId={task.id} />
            </div>
          </div>
        </div>
        <div className="mx-2">
          <TaskHtmlFrame htmlText={htmlContent} />
        </div>
      </div>
    </div>
  )
}

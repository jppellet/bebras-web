"use client"

import { getBasePath } from "@/app/components/Utils"
import { previewTextPrefix, previewTextSuffix } from "bebras/out/patterns"
import { TaskMetadata } from "bebras/out/util"
import { useRouter, useSearchParams } from "next/navigation"
import TaskKeyword from "./TaskKeyword"
import TaskLevel from "./TaskLevel"

const MAX_KEYWORDS = 3

interface TaskCardProps {
  task: TaskMetadata
}

const TaskCard: React.FC<TaskCardProps> = ({ task }: TaskCardProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get task's keywords
  const keywords = task.keywords.slice(0, MAX_KEYWORDS)

  // Get current age
  const age = searchParams.get("age")!
  const difficulty = TaskMetadata.difficultyForAge(age, task)
  const basePath = getBasePath()
  const taskId = TaskMetadata.parseId(task.id)?.id_plain ?? task.id

  return (
    <div
      key={taskId}
      onClick={() => router.push(`/tasks/${taskId}`)}
      className="cursor-pointer p-2 my-1 z-0 bg-white border border-gray-300 rounded-lg hover:bg-neutral-100 transition ease-out duration-500"
    >
      <div className="flex">
        <div style={{ marginRight: "1em", width: 100, maxHeight: 100, display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
          {
            (task.preview)
              ? (task.preview.startsWith(previewTextPrefix))
                ? <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} className="bg-gray-50">{task.preview.substring(previewTextPrefix.length, task.preview.length - previewTextSuffix.length)}</div>
                : <img src={`${basePath}/tasks/${task.preview}`} style={{ width: "100%", height: "auto", maxHeight: "100%" }} />
              // fallback gray box
              : <div style={{ height: "100%", width: "100%" }} className="bg-gray-50"></div>
          }
        </div>
        <div style={{ flex: "auto" }}>
          <div className="flex flex-row items-end gap-2">
            <h2 className="text-xl text-cod-gray-950 font-medium">
              {task.title}
            </h2>
            <h2>{" · "}</h2>
            <h3 className="text-base text-cod-gray-300 font-light" style={{ fontSize: "80%" }}>
              {task.id}
            </h3>
          </div>
          <div className="task-summary text-cod-gray-400">
            {task.summary}
          </div>
        </div>

        <div className="w-1/3 mt-5 flex justify-end flex-wrap" style={{ alignItems: "flex-start" }}>
          {
            keywords.map((keyword: string, i: number) => (
              <TaskKeyword key={keyword} keyword={keyword} />
            ))
          }
        </div>
      </div>
      <ul>
        {difficulty && (
          <TaskLevel age={age} difficulty={difficulty} />
        )}
      </ul>
    </div>
  )
}

export default TaskCard

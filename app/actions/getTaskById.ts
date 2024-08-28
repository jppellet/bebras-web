import { data } from "@/app/tools/data"
import { TaskMetadata } from "bebras/out/util"

/**
 * Get one task from Task collection given its id
 * @param taskId the id of the task (format YYYY-CC-XX-lll)
 * @returns the task object
 */
export default function getTaskById(taskId: string) {
  const task: TaskMetadata = data.filter((t) => {
    return t.id === taskId
  })[0]

  return task
}

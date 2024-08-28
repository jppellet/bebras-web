import {
  getTaskHtml,
  getTaskTex,
} from "@/app/actions/getTaskContent"
import { readFileStrippingBom } from "bebras/out/fsutil"
import { TaskMetadata } from "bebras/out/util"
import TaskClient from "./TaskClient"

interface TaskPageProps {
  task: TaskMetadata
}

export default async function TaskPage({ task }: TaskPageProps) {
  const mdContent = await readFileStrippingBom(task.filePath)

  // TODO refactor this to not have to reread the task all the time!
  const htmlContent = await getTaskHtml(task.filePath)
  const texContent = await getTaskTex(task.filePath)

  return (
    <div>
      <TaskClient
        task={task}
        htmlContent={htmlContent}
        mdContent={mdContent}
        texContent={texContent}
      />
    </div>
  )
}

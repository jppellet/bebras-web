import getTaskById from "@/app/actions/getTaskById"
import Empty from "@/app/components/Empty"
import Loading from "@/app/loading"
import { Suspense } from "react"
import TaskPage from "./TaskPage"

interface TaskPageProps {
  params: { taskId: string }
}

export default function Page({ params }: TaskPageProps) {
  const task = getTaskById(params.taskId)
  if (!task) {
    return <Empty subtitle="La tâche recherchée n'existe pas." />
  }

  return (
    <div>
      <Suspense fallback={<Loading />}>
        {/* @ts-expect-error Async Server Component */}
        <TaskPage task={task} />
      </Suspense>
    </div>
  )
}

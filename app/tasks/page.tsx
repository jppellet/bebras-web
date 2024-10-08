import getTasks, { ISearchParams } from "@/app/actions/getTasks"
import Empty from "@/app/components/Empty"
import SideBar from "@/app/components/sidebar_components/SideBar"
import TaskCard from "@/app/components/tasks_components/TaskCard"
import TaskListHeader from "@/app/components/tasks_components/TaskListHeader"

interface TasksProps {
  searchParams: ISearchParams
}

export default async function TasksPage({ searchParams }: TasksProps) {
  const tasks = getTasks(searchParams)

  return (
    <div className="h-full pb-3">
      <div className="h-full grid grid-cols-4">
        <div className="h-full col-span-1">
          <SideBar />
        </div>
        <div className="col-span-3">
          <div className="flex flex-col gap-0">
            <TaskListHeader tasks={tasks} />
          </div>
          <div className="px-1">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
          {tasks.length === 0 ? <Empty /> : <></>}
        </div>
      </div>
    </div>
  )
}

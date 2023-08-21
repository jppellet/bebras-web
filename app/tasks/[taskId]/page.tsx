import TaskHtmlFrame from "../../components/tasks/TaskHtmlFrame";
import {
  getTaskHtmlString,
  getTaskMdString,
  getTaskTexString,
} from "@/app/libs/utils";
import getTaskById, { IParams } from "@/app/actions/getTaskById";
import Empty from "@/app/components/Empty";
import TaskKeyword from "@/app/components/tasks/TaskKeyword";
import TaskDownload from "@/app/components/tasks/TaskDownload";
import { Task } from "@/app/types/Task";

interface TaskPageProps {
  params: IParams;
}

export default async function TaskPage({ params }: TaskPageProps) {
  const task: Task = await getTaskById(params);

  if (task == null) {
    return <Empty subtitle="La tâche recherchée n'existe pas." />;
  }

  const htmlContent = getTaskHtmlString(task.filePath);
  const mdContent = getTaskMdString(task.filePath);
  const texContent = getTaskTexString(task.filePath);

  return (
    <div>
      <div className="grid grid-cols-4">
        <div className="col-span-1 mx-2">
          <TaskDownload
            taskId={task.taskId}
            htmlContent={htmlContent}
            mdContent={mdContent}
            texContent={texContent}
          />
          <h1 className="text-lg font-bold">Keywords</h1>
          {task.bebrasKeywords?.map((keyword) => (
            <TaskKeyword keyword={keyword} />
          ))}
        </div>
        <div className="col-span-3 mx-2">
          <TaskHtmlFrame htmlText={htmlContent} />
        </div>
      </div>
    </div>
  );
}

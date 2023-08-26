import TaskHtmlFrame from "../../components/tasks/TaskHtmlFrame";
import {
  getTaskHtmlString,
  getTaskMdString,
  getTaskTexString,
} from "@/app/libs/utils";
import getTaskById from "@/app/actions/getTaskById";
import Empty from "@/app/components/Empty";
import TaskKeyword from "@/app/components/tasks/TaskKeyword";
import TaskDownloadZip from "@/app/components/tasks/TaskDownloadZip";
import { Task } from "@/app/types/Task";
import TaskDownloadPdf from "@/app/components/tasks/TaskDownloadPdf";

interface TaskPageProps {
  params: { taskId: string };
}

export default async function TaskPage({ params }: TaskPageProps) {
  const task: Task = getTaskById(params.taskId);

  if (task == null) {
    return <Empty subtitle="La tâche recherchée n'existe pas." />;
  }

  const htmlContent = getTaskHtmlString(task.filePath);
  const mdContent = getTaskMdString(task.filePath);
  const texContent = getTaskTexString(task.filePath);

  return (
    <div>
      <div className="">
        <div className="flex items-start justify-between p-2 m-2">
          <div className="w-1/3 px-5">
            <h1 className="text-lg font-bold">Mots-clés</h1>
            {task.bebrasKeywords?.map((keyword) => (
              <TaskKeyword keyword={keyword} />
            ))}
          </div>

          <div className="w-1/5">
            <h1 className="text-lg font-bold">Téléchargement</h1>
            <div className="flex justify-start">
              <TaskDownloadZip
                taskId={task.taskId}
                htmlContent={htmlContent}
                mdContent={mdContent}
                texContent={texContent}
              />
              <TaskDownloadPdf taskId={task.taskId} />
            </div>
          </div>
        </div>
        <div className="mx-2 border-t-2">
          <TaskHtmlFrame htmlText={htmlContent} />
        </div>
      </div>
    </div>
  );
}

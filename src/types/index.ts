export interface ITask {
  id: number;
  title: string;
  description: string;
  column: string;
  order?: number;
}
export interface ITaskCardProps {
  task: ITask;
}
export interface IColumnProps {
  id: string;
  title: string;
}
export interface IKanbanColumnProps {
  column: IColumnProps;
  allTasks: ITask[];
  limit: number;
  keyword?: string;
  isLoading?: boolean;
  isError?: boolean;
}
export interface IGetTasksParams {
  limit?: number;
  page?: number;
  params?: Record<string, any>;
  column?: string;
}

export interface ITaskFormModal {
  isOpen: boolean;
  title: string;
  description: string;
  status: string;
  setIsOpen: (value: boolean) => void;
  handleSave: () => void;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setStatus: (value: string) => void;
  disableSave?: boolean;
}

export const TASK_COLUMNS = [
  "backlog",
  "in-progress",
  "review",
  "done",
] as const;
export type TaskColumn = (typeof TASK_COLUMNS)[number];

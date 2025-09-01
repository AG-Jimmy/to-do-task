export interface ITask {
  id: number;
  title: string;
  description: string;
  column: string;
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
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: () => void;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

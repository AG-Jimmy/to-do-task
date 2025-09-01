export interface ITask {
  id: number;
  title: string;
  description: string;
  column: string;
}
export interface ITaskCardProps {
  task: ITask;
  // onEdit: (id: number, updates: Partial<Task>) => void;
  // onDelete: (id: number) => void;
}
export interface IColumnProps {
  id: string;
  title: string;
}
export interface IKanbanColumnProps {
  column: IColumnProps;
  allTasks: ITask[];
//   page: number;
  limit: number;
  keyword?: string;
  isLoading?: boolean;
  isError?: boolean;
  //   onPageChange: (page: number) => void;
  //   tasks: ITask[];
  // onEdit: (id: number, updates: Partial<Task>) => void;
  // onDelete: (id: number) => void;
  //   searchTerm: string;
}
export interface IGetTasksParams {
  limit?: number;
  page?: number;
  params?: Record<string, any>;
  column?: string;
}

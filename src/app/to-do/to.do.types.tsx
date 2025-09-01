interface Task {
  id: number;
  title: string;
  description: string;
  column: string;
}
interface TaskCardProps {
  task: Task;
  // onEdit: (id: number, updates: Partial<Task>) => void;
  // onDelete: (id: number) => void;
}
interface ColumnProps {
  id: string;
  title: string;
}
interface KanbanColumnProps {
  column: ColumnProps;
  tasks: Task[];
  // onEdit: (id: number, updates: Partial<Task>) => void;
  // onDelete: (id: number) => void;
  searchTerm: string;
}

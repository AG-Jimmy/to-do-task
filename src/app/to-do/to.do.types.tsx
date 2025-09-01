interface Task {
  id: number;
  title: string;
  description: string;
  column: string;
}
interface TaskCardProps {
  task: Task;
}
interface ColumnProps {
  id: string;
  title: string;
}
interface KanbanColumnProps {
  column: ColumnProps;
  tasks: Task[];
  searchTerm: string;
}

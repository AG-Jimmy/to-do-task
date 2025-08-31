interface Task {
  id: number;
  title: string;
  description: string;
  column: string;
}
interface TaskCardProps {
  task: Task;
  onEdit: (id: number, updates: Partial<Task>) => void;
  onDelete: (id: number) => void;
}

interface KanbanColumnProps {
  column: {
    id: string;
    title: string;
  };
  tasks: Task[];
  onEdit: (id: number, updates: Partial<Task>) => void;
  onDelete: (id: number) => void;
  searchTerm: string;
}

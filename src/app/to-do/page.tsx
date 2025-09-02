"use client";
import { KanbanColumn, SearchBar } from "./components";
import { useAddTask, useTasks } from "./hooks/useTasks";
import TaskFormModal from "./components/TaskFormModal";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { TASK_COLUMNS } from "@/types";
import {
  selectTodo,
  setDescription,
  setKeyword,
  setOpen,
  setStatus,
  setTitle,
  resetForm,
} from "../../store/todoSlice";

const columns = [
  { id: "backlog", title: "Backlog" },
  { id: "in-progress", title: "In Progress" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
];

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { keyword, open, title, description, status } =
    useAppSelector(selectTodo);
  const limit = 5;
  const { data: allTasks = [], isLoading, isError } = useTasks();
  const createTaskMutation = useAddTask();

  const handleCreateTask = () => {
    if (!TASK_COLUMNS.includes(status as unknown as typeof TASK_COLUMNS[number])) return;
    createTaskMutation.mutate(
      {
        title,
        description,
        column: status,
      },
      {
        onSuccess: () => {
          dispatch(resetForm());
          dispatch(setOpen(false));
        },
      }
    );
  };
  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <div className="bg-white p-4 d-flex flex-column gap-3 rounded-3 container-xxl ">
      <div className="row justify-content-between gap-3 align-items-center border-bottom pb-3">
        <SearchBar
          searchTerm={keyword}
          setSearchTerm={(v) => dispatch(setKeyword(v))}
        />
        <div className="col-5 col-md-2 col-lg-1">
          <button
            onClick={() => dispatch(setOpen(true))}
            type="button"
            className="btn btn-primary text-nowrap"
          >
            Add Task
          </button>
        </div>
      </div>

      <div
        className="row g-3 mb-4 d-flex flex-nowrap overflow-x-auto"
        style={{
          width: "100%",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x proximity",
        }}
      >
        {columns.map((column, index) => (
          <div
            key={column.id}
            className={`col-12 col-md-6 col-lg-3 ${
              index !== columns.length - 1 ? "border-end" : ""
            }`}
          >
            <KanbanColumn
              column={column}
              allTasks={allTasks}
              limit={limit}
              keyword={keyword}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
        ))}
      </div>
      <TaskFormModal
        isOpen={open}
        title={title}
        description={description}
        status={status}
        setIsOpen={(v) => dispatch(setOpen(v))}
        handleSave={handleCreateTask}
        setTitle={(v) => dispatch(setTitle(v))}
        setDescription={(v) => dispatch(setDescription(v))}
        setStatus={(v) => dispatch(setStatus(v))}
      />
    </div>
  );
}

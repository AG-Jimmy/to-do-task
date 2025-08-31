"use client";
import { KanbanColumn, SearchBar } from "./components";

const HomePage = () => {
  const columns: ColumnProps[] = [
    { id: "backlog", title: "Backlog" },
    { id: "in-progress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
  ];
  return (
    <div className=" bg-white p-4 d-flex  flex-column gap-3 rounded-3 ">
      {/* Search Bar */}
      <div className="row justify-content-between gap-3 align-items-center border-bottom pb-3">
        <SearchBar searchTerm="" setSearchTerm={() => {}} />
        <div className="col-5 col-md-2 col-lg-1 ">
          <button type="button" className="btn btn-primary text-nowrap ">
            Add Task
          </button>
        </div>
      </div>
      
      {/* Kanban Board */}
      <div
        className="row g-3 mb-4  d-flex flex-nowrap overflow-x-auto"
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
              tasks={[]}
              onEdit={() => {}}
              onDelete={() => {}}
              searchTerm=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomePage;

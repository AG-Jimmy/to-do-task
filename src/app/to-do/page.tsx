"use client";
import React from "react";
import TaskCard from "./components/TaskCard";

const page = () => {
  return (
    <div>
      <TaskCard
        onDelete={() => {}}
        onEdit={() => {}}
        task={{
          id: 1,
          title: "Task 1",
          description: "Description 1",
          column: "To Do",
        }}
      />
    </div>
  );
};

export default page;

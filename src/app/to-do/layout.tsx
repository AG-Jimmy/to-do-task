import React from "react";

const ToDoLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container-xxl bg-light min-vh-100 py-4">{children}</div>
  );
};

export default ToDoLayout;

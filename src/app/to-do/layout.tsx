import React from "react";

const ToDoLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="  min-vh-100  container-xxl d-flex align-items-center ">
      {children}
    </div>
  );
};

export default ToDoLayout;

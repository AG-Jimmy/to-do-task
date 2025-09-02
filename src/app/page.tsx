"use client";
import React from "react";
import { ArrowRight, CheckSquare, Github } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <center className="min-vh-100 bg-primary ">
        <div className=" d-flex flex-column justify-content-center  min-vh-100 container  gap-5 min-vh-50">
          <div className="col-lg-6  ">
            <h1 className="display-4 fw-bold mb-4">
              Front-end Developer Assessment Task{" "}
              <span className="text-warning d-block">Kanban To Do List</span>
            </h1>
            <p className="lead mb-4 text-white">
              Streamline your project management with our intuitive Kanban-style
              to-do list. Track progress, manage tasks, and boost productivity.
            </p>
            <div className="d-flex  justify-content-center gap-3">
              <Link
                href={"/to-do"}
                className="btn btn-warning btn-lg d-flex align-items-center gap-2 fw-bold"
              >
                Get Started
                <ArrowRight size={20} />
              </Link>
              <Link
                href="https://github.com/AG-Jimmy/to-do-task"
                className="btn btn-outline-light btn-lg"
                target="_blank"
              >
                <Github />
                Git hub
              </Link>
            </div>
          </div>
          <div className="col-lg-6 ">
            <div className="text-center">
              <div className="bg-white bg-opacity-10 rounded-3 p-4">
                <CheckSquare size={120} className="text-warning mb-3" />
                <h4 className="text-white">Ready to get organized?</h4>
              </div>
            </div>
          </div>
        </div>
      </center>
    </>
  );
};

export default HomePage;

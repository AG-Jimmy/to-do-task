import Image from "next/image";
import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div className="d-flex flex-column gap-3 justify-content-center align-items-center vh-100">
      <h3 className="fw-bold w-50 text-center">
        Something went wrong with the server please try again
      </h3>
      <Image
        width={175}
        height={175}
        className="img-fluid"
        src="/error.png"
        alt="error"
      />
      <Link href="/" className="btn btn-warning">
        Back to Home
      </Link>
    </div>
  );
};

export default Error;

import React from "react";

const Errorpage = () => {
  const title = "Not found!";
  const message = "Could not find resource or page";

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-5">
            <img src="/images/sad-cmp.png" className="card-img" alt="Error" />
          </div>
          <div className="col-sm-7 mt-5">
            <h1>{title}</h1>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Errorpage;

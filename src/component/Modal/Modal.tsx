import React from "react";


const Modal: React.FC = () => {
  return (
    <div
      className={"position-absolute z-1 start-0 top-0 bg-white"}
      style={{display: show ? "block" : "none", width: "100%", height: "100%"}}
    >
      <div className={"h-100 d-flex flex-column"}>
        <div className={"px-4 py-3"}>

        </div>
        <div className={"d-flex flex-column mt-auto"}>
          <button>Cancel</button>
          <button>Order</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
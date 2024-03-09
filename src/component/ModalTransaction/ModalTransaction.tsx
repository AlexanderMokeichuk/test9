import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {canselModalTransaction, selectModal} from "../../store/budgetSlice.ts";

const ModalTransaction: React.FC = () => {
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectModal);

  return (
    <div
      className={"position-fixed top-0 start-0 w-100 h-100"}
      style={{display: show ? "block" : "none", width: "100%", height: "100%"}}
    >
      <div className={"card mx-auto mt-5 bg-white border"} style={{width: 300, height:400}}>
        <div className={"card-header"}>
          <h5>Add Expense/Income</h5>
        </div>
        <div className={"card-body d-flex justify-content-end mt-auto"}>
          <form>
            <button onClick={() => dispatch(canselModalTransaction())}>Cancel</button>
            <button>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalTransaction;
import React, {useState} from "react";

interface Props {
  show: boolean,
  modalCancel: () => void,
}

const defaultState = {
  title: "",
  type: "income",
};

const ModalCategories: React.FC<Props> = ({show, modalCancel}) => {
  const [formState, setFormState] = useState(defaultState);

  return (
    <div
      className={"position-fixed top-0 start-0 w-100 h-100"}
      style={{display: show ? "block" : "none", width: "100%", height: "100%"}}
    >
      <div className={"card mx-auto mt-5 bg-white border"} style={{width: 300, height: 400}}>
        <div className={"card-header"}>
          <h5>Add/Edit Categories</h5>
        </div>
        <form className={"form-control d-flex flex-column h-100 gap-2"}>
          <div>
            <label>Title</label>
            <input className={"form-control"}/>
          </div>
          <div>
            <div>
              <label>Type</label>
              <select className={"form-select"}>
                <option>Income</option>
                <option>Expense</option>
              </select>
            </div>
          </div>
          <div className={"mt-auto d-flex justify-content-end gap-2"}>
            <button type={"button"} onClick={modalCancel}>Cancel</button>
            <button>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCategories;
import React, {FormEvent, useEffect, useState} from "react";
import {ApiCategory} from "../../type";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {addNewCategory, editCategory, fetchCategories} from "../../store/budgetThunks.ts";
import {resetEditCategory, selectEditCategory} from "../../store/budgetSlice.ts";

interface Props {
  show: boolean,
  modalCancel: () => void,
}

const defaultState: ApiCategory = {
  name: "",
  type: "income",
};

const ModalCategories: React.FC<Props> = ({show, modalCancel}) => {
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState<ApiCategory>(defaultState);
  const edit = useAppSelector(selectEditCategory);

  useEffect(() => {
    if (edit) {
      setFormState({
        name:edit.name,
        type: edit.type
      });
    }
  }, [edit]);

  const changeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.value !== " ") {
      setFormState(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (edit) {
      await dispatch(editCategory({...formState, id: edit.id}));
    } else {
      await dispatch(addNewCategory(formState));
    }
    await dispatch(fetchCategories());
    setFormState(defaultState);
    modalCancel();
  };

  const cansel = () => {
    modalCancel();
    dispatch(resetEditCategory());
  };

  return (
    <div
      className={"position-fixed z-3 top-0 start-0 w-100 h-100"}
      style={{display: show ? "block" : "none", width: "100%", height: "100%"}}
    >
      <div className={"card mx-auto mt-5 bg-white border"} style={{width: 300, height: 400}}>
        <div className={"card-header"}>
          <h5>Add/Edit Categories</h5>
        </div>
        <form onSubmit={onSubmit} className={"form-control d-flex flex-column h-100 gap-2"}>
          <div>
            <label>Title</label>
            <input
              type={"text"}
              name={"name"}
              className={"form-control"}
              required

              value={formState.name}
              onChange={changeForm}
            />
          </div>
          <div>
            <div>
              <label>Type</label>
              <select
                name={"type"}
                className={"form-select"}

                value={formState.type}
                onChange={changeForm}
              >
                <option value={"income"}>Income</option>
                <option value={"expense"}>Expense</option>
              </select>
            </div>
          </div>
          <div className={"mt-auto d-flex justify-content-end gap-2"}>
            <button type={"button"} onClick={cansel}>Cancel</button>
            <button type={"submit"}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCategories;
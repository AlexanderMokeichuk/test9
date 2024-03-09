import React, {FormEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {
  canselModalTransaction,
  resetEditTransaction,
  selectCategories,
  selectEditTransaction,
  selectModal
} from "../../store/budgetSlice.ts";
import {ApiFormTransaction} from "../../type";
import {addNewTransaction, editTransaction, fetchCategories, fetchTransactions} from "../../store/budgetThunks.ts";

const defaultState: ApiFormTransaction = {
  type: "income",
  category: "",
  amount: "",
};

const ModalTransaction: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState<ApiFormTransaction>(defaultState);
  const show = useAppSelector(selectModal);
  const categories = useAppSelector(selectCategories);
  const edit = useAppSelector(selectEditTransaction);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (edit) {
      setFormState({
        amount:edit.amount,
        type: edit.type,
        category: edit.category,
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

  const cansel = () => {
    dispatch(canselModalTransaction());
    dispatch(resetEditTransaction());
    setFormState(defaultState);
  };
  
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (edit) {
      await dispatch(editTransaction({
        id: edit.id,
        category: formState.category,
        amount: formState.amount,
        createdAt: edit.createdAt,
      }));
    } else {
      const date = new Date();
      const newDate = date.toISOString();
      await dispatch(addNewTransaction({
        category: formState.category,
        amount: formState.amount,
        createdAt: newDate,
      }));
    }
    await dispatch(fetchTransactions());
    setFormState(defaultState);
    dispatch(canselModalTransaction());
  };

  return (
    <div
      className={"position-fixed z-3 top-0 start-0 w-100 h-100"}
      style={{display: show ? "block" : "none", width: "100%", height: "100%"}}
    >
      <div className={"card mx-auto mt-5 bg-white border"} style={{width: 300, height: 400}}>
        <div className={"card-header"}>
          <h5>Add/Edit Expense/Income</h5>
        </div>
        <form onSubmit={onSubmit} className={"form-control d-flex flex-column h-100 gap-3 p-2"}>
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
          <div>
            <label>Category</label>
            <select
              className={"form-select"}
              name={"category"}

              value={formState.category}
              onChange={changeForm}
            >
              {categories.map((item) => {
                if (item.type === formState.type) {
                  defaultState.category = item.id;
                  return <option key={item.id} value={item.id}>{item.name}</option>;
                }
              }).reverse()}
            </select>
          </div>
          <div>
            <label>Amount</label>
            <input
              name={"amount"}
              type={"number"}
              required
              className={"form-control"}

              value={formState.amount}
              onChange={changeForm}
            />
          </div>
          <div className={"d-flex mt-auto justify-content-end gap-3"}>
            <button type={"button"} onClick={cansel}>Cancel</button>
            <button type={"submit"}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalTransaction;
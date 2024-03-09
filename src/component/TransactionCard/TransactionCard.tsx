import React from "react";
import {Transaction} from "../../type";
import dayjs from "dayjs";
import {useAppDispatch} from "../../app/hooks.ts";
import {deleteTransaction, fetchTransactionEdit} from "../../store/budgetThunks.ts";
import {showModalTransaction} from "../../store/budgetSlice.ts";


interface Props {
  transaction: Transaction,
}
const TransactionCard: React.FC<Props> = ({transaction}) => {
  const dispatch = useAppDispatch();

  const symbol = (transaction.type === "income") ? "+" : "-";


  const editCategory = async () => {
    await dispatch(fetchTransactionEdit(transaction.id));
    dispatch(showModalTransaction());
  };

  return (
    <div className={"alert alert-primary d-flex"}>
      <div className={"d-flex w-75 gap-5"}>
        <span>{dayjs(transaction.createdAt).format("DD.MM.YYYY HH:mm:ss")}</span>
        <div>
          {transaction.name}
        </div>
      </div>
      <div className={"d-flex align-items-center w-25 justify-content-between"}>
        <div className={(transaction.type === "income") ? "text-success" : "text-danger"}>
          {symbol}{transaction.amount} KGS
        </div>
        <div className={"d-flex gap-2"}>
          <button type={"button"} onClick={editCategory} className={"btn btn-primary"}>Edit</button>
          <button type={"button"} onClick={() => dispatch(deleteTransaction(transaction.id))} className={"btn btn-danger"}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
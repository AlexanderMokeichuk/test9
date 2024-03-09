import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchTransactions} from "../../store/budgetThunks.ts";
import {selectTransactions} from "../../store/budgetSlice.ts";
import TransactionCard from "../../component/TransactionCard/TransactionCard.tsx";

const Transactions: React.FC = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const total = transactions.reduce((sum, transaction) => {
    if (transaction.type === "income") {
      return sum + parseInt(transaction.amount);
    } else {
      return sum - parseInt(transaction.amount);
    }
  }, 0);


  return (
    <div>
      <div className={"mt-3"}>
        <h4 className={(total < 0) ? "text-danger" : "text-success"}>Total {total}</h4>
      </div>
      <div className={"mt-3"}>
        {transactions.map((item) => {
          return <TransactionCard key={item.id} transaction={item} />;
        })}
      </div>
    </div>
  );
};

export default Transactions;
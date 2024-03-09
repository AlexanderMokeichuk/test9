import React from "react";
import {Category} from "../../type";
import {useAppDispatch} from "../../app/hooks.ts";
import {deleteCategory, fetchCategoryEdit} from "../../store/budgetThunks.ts";

interface Props {
  category: Category,
  modalShow: () => void,
}
const CategoryCard: React.FC<Props> = ({category, modalShow}) => {
  const dispatch = useAppDispatch();

  const editCategory = async () => {
    dispatch(fetchCategoryEdit(category.id));
    modalShow();
  };

  return (
    <div className={"alert alert-primary d-flex align-items-center justify-content-between"}>
      <div>{category.name}</div>
      <div className={"d-flex align-items-center gap-3"}>
        <span className={(category.type === "income") ? "text-success" : "text-danger"}>{category.type}</span>
        <button type={"button"} onClick={editCategory} className={"btn btn-primary"}>Edit</button>
        <button type={"button"} onClick={() => dispatch(deleteCategory(category.id))} className={"btn btn-danger"}>Delete</button>
      </div>
    </div>
  );
};

export default CategoryCard;
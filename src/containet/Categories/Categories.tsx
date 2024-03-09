import React, {useEffect, useState} from "react";
import ModalCategories from "../../component/ModalCategory/ModalCategories.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCategories} from "../../store/budgetSlice.ts";
import {fetchCategories} from "../../store/budgetThunks.ts";
import CategoryCard from "../../component/CategoryCard/CategoryCard.tsx";

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const modalCansel = () => setShowModal(false);
  const modalShow = () => setShowModal(true);

  return (
    <div className={"d-flex flex-column mt-4"}>
      <ModalCategories show={showModal} modalCancel={modalCansel}/>
      <button type={"button"} onClick={() => setShowModal(true)} className={"btn btn-primary ms-auto"}>Add</button>
      <div>
        <h4>Categories</h4>
        {categories.map((item) => {
          return <CategoryCard key={item.id} category={item} modalShow={modalShow}/>;
        })}
      </div>
    </div>
  );
};

export default Categories;
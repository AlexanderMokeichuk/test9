import React, {useState} from "react";
import ModalCategories from "../../component/ModalCategories/ModalCategories.tsx";

const Categories: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const modalCansel = () => setShowModal(false);

  return (
    <div className={"d-flex flex-column mt-4"}>
      <ModalCategories show={showModal} modalCancel={modalCansel}/>
      <button type={"button"} onClick={() => setShowModal(true)} className={"btn btn-primary ms-auto"}>Add</button>
      <div>
        <h4>Categories</h4>
      </div>
    </div>
  );
};

export default Categories;
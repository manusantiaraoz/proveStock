import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Table } from "react-bootstrap";
import { conBudget, delBudget, printBudget } from "../../../helpers/budget";
import BudgetModal from "./BudgetModal";
import BudgetItem from "./budgetItem";
import { PlusCircle } from "react-bootstrap-icons";


const BudgetTab = ({budget, fetchDataBudget,product, clients}) => {
  const jwt = sessionStorage.getItem("accessToken") || null;
  const listBudget = budget
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
}
  const handleCloseModal = () => setShowModal(false);
 
  const printBudgetFunc = async(id)=>{
    try{
      const result= await printBudget(id,jwt)
      console.log(result);
      
      return result
    }catch(e){

    }
  }
  const confirmBudget= async(id)=>{
    try{
     const result =  conBudget(id,jwt)
     if (result && result.data) {
      Swal.fire({
        title: "presupuesto confirmado",
        icon: "success",
      });
      fetchDataBudget();
    }
    }catch(e){
      console.error("error en confirmar presupuesto", error);
    }
  }

  const EliminarBudget = async (id) => {
    try {
      const status = await Swal.fire({
        title: "¿Seguro quieres borrarlo?",
        text: "El presupuesto se eliminaría permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d08799",
        cancelButtonColor: "#81a1c1",
        confirmButtonText: "Borrar",
        cancelButtonText: "Cancelar",
      });
      if (status.isConfirmed) {
        const result = await delBudget(id, jwt);
        if (result && result.data) {
          Swal.fire({
            title: "presupuesto borrado",
            icon: "success",
          });
          fetchDataBudget();
        }
      }
    } catch (error) {
      console.error("error en eliminar", error);
    }
  };


  useEffect(() => {
    fetchDataBudget();
  }, []);
  return (
    <article className="container">
      <button className="btn btn-secondary my-2" onClick={() => handleShowModal(null, false)}><PlusCircle></PlusCircle> presupuesto</button>
      <Table responsive>
      <thead>
        <tr className="glass-efect">
          <th className="bg-dark text-light">CLIENTE</th>
          <th className="bg-dark text-light">PIEZAS</th>
          <th className="bg-dark text-light">DETALLE</th>
          <th className="bg-dark text-light">TOTAL</th>
          <th className="bg-dark text-light">OPCIONES</th>
        </tr>
      </thead>
      <tbody>

      {listBudget.map((budget, posicion) => (
        <BudgetItem budget={budget} key={posicion} EliminarBudget={EliminarBudget} printBudgetFunc={printBudgetFunc} confirmBudget={confirmBudget}></BudgetItem>
      ))}
      </tbody>
      </Table>
      <BudgetModal show={showModal} handleClose={handleCloseModal} budget={budget} clients={clients} fetchData={fetchDataBudget} jwt={jwt} product={product}></BudgetModal>
    </article>
  );
};

export default BudgetTab;

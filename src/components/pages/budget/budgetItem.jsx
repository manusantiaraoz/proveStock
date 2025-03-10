import React from "react";
import { CheckCircleFill, FileEarmarkArrowDownFill, FiletypePdf, PencilSquare, Trash3 } from "react-bootstrap-icons";

const BudgetItem = ({ budget,EliminarBudget, printBudgetFunc, confirmBudget }) => {
  const {detail,totalAmount}= budget
  const {name,lastName}= budget.client
  const products = []
  for(const prod of budget.productLine){
    const nombre = prod.product.name
    const cantidad =prod.quantity
    products.push(`${nombre} (${cantidad})`) 
  }
  return (
    <tr className="colorPrimarioTexto border-bottom">
      <td>
        {name}, {lastName}
      </td>
      <td>
        {products} 
      </td>
      <td>
        {detail}
      </td>
      <td>
      {totalAmount}
      </td>
      <td>
        <div className=" align-content-center py-2">
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-success m-2"
              onClick={()=>printBudgetFunc(budget.id)}
            >
              <FileEarmarkArrowDownFill></FileEarmarkArrowDownFill>
            </button>
            <button
              className="btn btn-outline-danger m-2"
              onClick={() => EliminarBudget(budget.id)}
            >
              <Trash3></Trash3>
            </button>
            {
          budget.status!== "CONFIRM"?<button
          className="btn btn-outline-warning m-2"
          onClick={() => confirmBudget(budget.id)}
        >
          PENDING
        </button>:<button
              className="btn btn-outline-success m-2"
              disabled
            >
              <CheckCircleFill></CheckCircleFill>
            </button>
           }
            
          </div>
        </div>
      </td>
    </tr>
 
  );
};

export default BudgetItem;

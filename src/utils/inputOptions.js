import income from "../images/income.png";
import expense from "../images/expense.png";
import transfer from "../images/transfer.png";

export const transactionTypeOptions = [
  {
    name: "type",
    value: "income",
    label: "Ingreso",
    image: income,
    disabled: false,
    required: true,
  },
  {
    name: "type",
    value: "expense",
    label: "Gasto",
    image: expense,
    disabled: false,
    required: true
  },
  {
    name: "type",
    value: "transfer",
    label: "Transferir",
    image: transfer,
    disabled: true
  },
];

export const transactionInputOptions = [
  {
    name: "amount",
    label: "Monto",
    type: "number",
    placeholder: "Ej: 20.000",
    required: true,
    min: 0,
  },
  {
    name: "description",
    label: "Descripción",
    type: "text",
    placeholder: "Ej: Almuerzo en el trabajo",
    required: true,
    maxLength: 40, 
  },
];

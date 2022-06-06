const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }
  //mostrar  digítos no visro da claculadora
  addDigit(digit) {
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();
  }
  //Processando todas as operações da calculadora
  processOperation(operation) {
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    //valor atual e o anterior
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;

      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;

      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;

      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;

      case "DEL":
        this.processDelOperator();
        break;

      case "CE":
        this.processClearCurrentOperator();
        break;

      case "C":
        this.processClearOperator();
        break;

      case "=":
        this.processEqualOperator();
        break;

      default:
        return;
    }
  }
  //mudar os valores na tela da calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      //verifique se o valor é zero, se não adicione o valor atual
      if (previous === 0) {
        operationValue = current;
      }
      //adicionar o valor atual ao anterior
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }
  //alterar operações matemáticas
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];
    if (!mathOperations.includes(operation)) {
      return;
    }
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }
  //excluir o último dígito
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }
  //limpar operação atual
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }
  //processar uma operação
  processEqualOperator() {
    let operation = previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation);
  }
  //limpar todas as operações
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }
}
//cliacando nos botões, recebendo o valor de texto na guia console
const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});

let input = document.getElementById("inputNumber");
let buttons = document.querySelectorAll("button");

let string = "";
let arr = Array.from(buttons);
arr.forEach((button) => {
  button.addEventListener("click", (e) => {
    let value = e.target.innerHTML;
    if (value === "÷") {
      string += "/";
      input.value += "÷";
    } 
    else if(value==="x"){
        string += '*'
        input.value += 'x'
    }
        else if (value === "=") {
      try {
        string = eval(string);
        input.value = string;
      } catch {
        input.value = "Error";
        string = "";
      }
    } else if (value === "AC") {
      string = "";
      input.value = string;
    } else if (value === "C") {
      string = string.substring(0, string.length - 1);
      input.value = input.value.substring(0,input.value.length -1)
    } else {
      string += value;
      input.value = string;
    }
  });
});

//Selecting DOM elements
const keys = document.querySelectorAll(".key");
const input = document.querySelector(".input");
const output = document.querySelector(".output");
const history = [];

//Adding click event listener to all calculator keys 
  keys.forEach((key) => {
  key.addEventListener("click", () => {
    //getting the value of the clicked key 
    const keyValue = key.dataset.key;
    //Getting the correct input and output text
    const inputText = input.textContent;
    const outputText = output.textContent;

    //Clear button functionality
    if (keyValue === "clear") {
      input.textContent = "";
      output.textContent = "";
    } 
    //backspace button functionality
    else if (keyValue === "backspace") {
      input.textContent = inputText.slice(0, -1);
    }
    //square button functionality 
    else if(keyValue == "^2"){
     const num = parseFloat(inputText);
     input.textContent = `${num}^2`;
     const result = num ** 2;
     output.textContent = result;
     history.push({expression: inputText, result: result});
    }
    //brackets button functionality
     else if (keyValue === "brackets") {
      //Adding opening bracket if no bracket is present in input, or if there are more opening brackets than closing ones 
      if (
       inputText.indexOf("(") == -1 ||
        (inputText.indexOf("(") != -1 &&
          inputText.indexOf(")") != -1 &&
          inputText.lastIndexOf("(") < inputText.lastIndexOf(")"))
      ) {
        input.textContent += "(";
      } 
      //Adding closing brackets if there are more opening brackets than closing ones, or if an opening bracket has already been added
      else if (
        (inputText.indexOf("(") != -1 && inputText.indexOf(")") == -1) ||
        (inputText.indexOf("(") != -1 &&
          inputText.indexOf(")") != -1 &&
          inputText.lastIndexOf("(") > inputText.lastIndexOf(")")
        )
      ) {
        input.textContent += ")";
      }
      //Cleaning the input to add formatting to brackets and percent sign
      display_input.innerHTML = CleanInput(input);
    } 
    //Equal button functionality 
    else if (keyValue === "=") {
      try {
        let result;
        //Calculating percentage if input contains percent sign
        if (inputText.includes("%")) {
          const inputArray = inputText.split("%");
          const num1 = parseFloat(inputArray[0]);
          const num2 = parseFloat(inputArray[1]);
          result = (num1 * num2) / 100;
        }
        //Calculating modulus if input conatains "mod" keyword 
        else if (inputText.includes("mod")) {
          const inputArray = inputText.split("mod");
          const num1 = parseFloat(inputArray[0]);
          const num2 = parseFloat(inputArray[1]);
          result = num1 % num2;
        } 
        //Evaluating the input expression for other cases 
        else {
          result = eval(inputText);
        }
        //Setting the input text and output text to the result 
        input.textContent = inputText;
        output.textContent = result;
        history.push({ expression: inputText, result: result });
      } catch (err) {
      	//Displaying error message if input expression is invalid
        output.textContent = "Error";
      }
    }
    //Modulus button functionality 
     else if (keyValue === "mod") {
      input.textContent += "mod";
    } 
    //Percent button functionality 
    else if (keyValue === "%") {
    	//Replacing percent sign with "/100" for easy evaluation
      input.textContent += "%";
    } else {
      input.textContent += keyValue;
    }
  });
});
//function to wrap brackets and percent signs in the input with HTML tags
function CleanInput(input) {
  let input_array = input.split("");
  let input_array_length = input_array.length;
  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == "(") {
      input_array[i] = `<span class="brackets">(</span>`;
    } else if (input_array[i] == ")") {
      input_array[i] = `<span class="brackets">)</span>`;
    } else if (input_array[i] == "%") {
      input_array[i] = `<span class="percent">%</span>`;
    }
  }
  return input_array.join("");
}

//function to prepare the input for evaluation by replacing percent signs with division by 100
function PrepareInput(input){
	return input.replace(/%/g, "/100");
}

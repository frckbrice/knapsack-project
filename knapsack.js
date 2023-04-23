//* to bind html elements

const addObjectButton = document.querySelector(".add-object-btn");
const doneButton = document.querySelector(".done-btn");
const ulListOfObjects = document.querySelector(".ul-of-objects");

//* add events
// doneButton.addEventListener("click", displayResults);
addObjectButton.addEventListener("click", addOjects);
addObjectButton.addEventListener("click", createArrayObject);
doneButton.addEventListener("click", knapSack);

function addOjects(e) {
  e.preventDefault();
  const inputName = document.querySelector("#input-name").value;
  const inputWeight = parseFloat(document.querySelector("#input-weight").value);
  const inputValue = parseFloat(document.querySelector("#input-value").value);

  const line = document.createElement("li");
  line.className = "li-for-objects";

  const pTag1 = document.createElement("p");
  pTag1.appendChild(document.createTextNode(inputName));
  pTag1.classList.add("ptag");

  const pTag2 = document.createElement("p");
  pTag2.appendChild(document.createTextNode(inputWeight));
  pTag2.classList.add("ptag");

  const pTag3 = document.createElement("p");
  pTag3.classList.add("ptag");
  pTag3.appendChild(document.createTextNode(inputValue));

  line.appendChild(pTag1);
  line.appendChild(pTag2);
  line.appendChild(pTag3);

  ulListOfObjects.appendChild(line);

  //   document.querySelector("#input-name").value = "";
  //   document.querySelector("#input-weight").value = "";
  //  document.querySelector("#input-value").value = "";
}

function createArrayObject() {
let inputName = document.querySelector("#input-name").value;
let inputWeight = parseFloat(document.querySelector("#input-weight").value);
let inputValue = parseFloat(document.querySelector("#input-value").value);

let arrayOfObject = [{}];
console.log(inputValue);
console.log(inputWeight);
//to not allow empty input
if (!inputName || !inputValue || !inputWeight) {
  alert("empty input value not allowed");
  return false;
} else {
  // to get inputs while the number is less than 20
  if (ulListOfObjects.childElementCount <= 20) {
    // to create an array of abjects
Array.from(ulListOfObjects.children).forEach((line) => {
  console.log(line.children[2].textContent);
  inputName = parse(line.children[0].textContent);
  inputWeight = line.children[1].textContent;
  inputValue = line.children[2].textContent;

  let item = new Objects(`${inputName}`, `${inputWeight}`, `${inputValue}`);

  arrayOfObject.push(item);
});
  }
  console.log(arrayOfObject);
  return arrayOfObject;
}
}

//* create the constructor of objects that we need for the purpose
function Objects(name, weight, value) {
  this.name = name;
  this.weight = weight;
  this.value = value;
  return this;
}

//*  the knapSack constructor
function bags(capacity, items, weight, value) {
  this.capacity = capacity;
  this.items = items;
  this.weight = weight;
  this.value = value;
  return this;
}

/*
 * function to get a particular random list of objects given an interval of elements
 * to avoid entring objects manually*/

// const items = (min, max) => {
//   //* let's make items array to not be empty and the computation start at index 1
//   let arr = [{}];
//   for (let i = min; i <= max; i++) {
//     let n1 = Math.floor(Math.random() * (max - min)) + min;
//     let n2 = Math.floor(Math.random() * (max - min)) + min;
//     let item = new Objects(`${i}`, n1, n2);
//     arr.push(item);
//   }
//   return arr;
// };

//* the function to get the maximum value within a set of objects with weight and value

function knapSack(e) {
  e.preventDefault();
  const capacity = parseFloat(
    document.querySelector(".input-for-capacity").value
  );

  const items = createArrayObject();

  // some check first
  if (!(capacity > 0 && items.length)) {
    alert(
      "capacity must be a positive (> 0) number and list of object(s) not empty"
    );
    return false;
  } else {
    console.log("the receive array is : ");
    console.table(items);

    let itemsSize = items.length;
    let tabMaxProfit = [];

    //create and initialize table of maximum profit

    for (let i = 0; i < itemsSize; i++) {
      tabMaxProfit[i] = [];
      for (let j = 0; j <= capacity; j++) {
        tabMaxProfit[i][j] = 0;
      }
    }
    // to print the initialized table of computation
    console.log();
    console.log("the initialize table is : ");
    console.table(tabMaxProfit);
    // to get a particular list of objects between an interval given
    let newitems = [];
    newitems = items;
    let i = 0,
      w = 0,
      optimalValue = 0,
      indexOptimalValue = 0,
      weigh = 0;
    //print list of object used for this case of searching the optimal value
    console.log();
    console.log("The list of objects used for computation of optimal value: ");
    console.log(newitems);
    console.log();
    //fill the bags from o kg weight to the maximum capacity weight

    for (i = 1; i < newitems.length; i++) {
      // get the weight and the value of the current item
      let wi = newitems[i].weight;
      let vi = newitems[i].value;
      for (w = 1; w <= capacity; w++) {
        // to have the right value in the table
        if (w >= wi) {
          tabMaxProfit[i][w] = Math.max(
            tabMaxProfit[i - 1][w - wi] + vi,
            tabMaxProfit[i - 1][w]
          );
        }
      }
      //* *to get the optimal value of the table and its index.     sometimes the optimal value is not right-bottom corner element
      if (tabMaxProfit[i][capacity] >= optimalValue) {
        optimalValue = tabMaxProfit[i][capacity];
        indexOptimalValue = i;
      }
    }

    //* return tabMaxProfit;
    console.log();
    console.log("The table after computing the optimal value is: ");
    console.table(tabMaxProfit);
    console.log(
      "the optimal value for this sequence of objects is : " + optimalValue
    );

    //* serching the items that led us to optimal value
    let c = capacity;
    let objectUsed = [];

    //*going back in the table from the optimal value index to the original value index to get elements of the used list
    for (let i = indexOptimalValue; i >= 1; i--) {
      if (tabMaxProfit[i][c] > tabMaxProfit[i - 1][c]) {
        objectUsed.push(i);
        c -= newitems[i].weight;
        weigh += newitems[i].weight;
      }
    }
    console.log();
    console.log(
      "the list of elements chosen to rich the optimal value in order is: "
    );
    objectUsed = objectUsed.reverse();

    //* to show the object used to achieve the goal while taking them
    console.log();
    let newBags = new bags(
      capacity + "kg",
      objectUsed,
      weigh + "kg",
      optimalValue + "$"
    );
    console.log();
    console.log(
      "the return object containing net capacity of the bags, set of used items, total weight of such items and the optimal value is :  "
    );
    console.log();
    console.log(newBags);
    document.querySelector(".resulting-bag").innerHTML = JSON.stringify(
      newBags,
      null,
      2
    );
  }
}

// console.log(knapSack(15, items(1, 20)));

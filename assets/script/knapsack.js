//* to bind html elements

const doneButton = document.querySelector(".done-btn");
const ulListOfObjects = document.querySelector(".ul-of-objects");
const selectTag = document.getElementById("select__item--list");
const progressBar = document.querySelector(".progress-bar");

let resultBag = {};

//* add events

doneButton.addEventListener("click", displayResult);
selectTag.addEventListener("change", createArrayObjectFromSelectTag);

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
  localStorage.setItem("lines", ulListOfObjects.innerHTML);
  ulListOfObjects.innerHTML = localStorage.getItem("lines");
}

function createArrayObject() {
  let arrayOfObject = [{}];
  //to not allow empty input
  if (ulListOfObjects.childElementCount < 1) {
    alert("empty input value not allowed");
    return false;
  } else {
    // to get inputs while the number is less than 20
    if (ulListOfObjects.childElementCount <= 20) {
      // to create an array of abjects
      Array.from(ulListOfObjects.children).forEach((line) => {
        // console.log(line.children[2].textContent);
        let inputName = line.children[0].textContent;
        let inputWeight = line.children[1].textContent;
        let inputValue = line.children[2].textContent;
        //create an object
        let item = new Objects(
          `${inputName}`,
          `${inputWeight}`,
          `${inputValue}`
        );
        // to push object to array
        arrayOfObject.push(item);
      });
    }
    document.querySelector("#input-name").value = "";
    document.querySelector("#input-weight").value = "";
    document.querySelector("#input-value").value = "";
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

const listOfOfFakeObjects = (min, max) => {
  //   //* let's make items array to not be empty and the computation start at index 1
  let arr = [];
  let count = 0;
  for (let i = min; i <= max; i++) {
    let n1 = Math.floor(Math.random() * (max - min)) + min;
    let n2 = Math.floor(Math.random() * (max - min)) + min;
    arr.push(new Objects(`rebase${i}`, `${n1}`, `${n2}`));
    count++;
    if (count === 20) break;
  }
  return arr;
};

//* the function to get the maximum value within a set of objects with weight and value

function knapSack(e) {
  const capacity = parseFloat(
    document.querySelector(".input-for-capacity").value
  );

  // to get the list of objets to choose from
  let items = [];
  if (ulListOfObjects.childElementCount === 0) {
    items = listOfOfFakeObjects(1, 100);
  } else {
    items = createArrayObject();
  }

  // some check first
  if (!(capacity > 0 && items.length)) {
    alert("capacity must be a positive number");
    return;
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
      totalWeigh = 0;
    //print list of object used for this case of searching the optimal value
    console.log();
    console.log("The list of objects used for computation of optimal value: ");
    console.log(newitems);
    console.log();
    //fill the bags from o kg weight to the maximum capacity weight

    for (i = 1; i < newitems.length; i++) {
      // get the weight and the value of the current item
      let wi = parseFloat(newitems[i].weight);
      console.log(typeof wi);
      let vi = parseFloat(newitems[i].value);
      console.log(typeof vi);
      for (w = 1; w <= capacity; w++) {
        // to have the right value in the table
        if (w >= wi) {
          tabMaxProfit[i][w] = Math.max(
            tabMaxProfit[i - 1][w - wi] + vi,
            tabMaxProfit[i - 1][w]
          );
        }
      }
      // to get the optimal value of the table and its index.     sometimes the optimal value is not right-bottom corner element
      if (tabMaxProfit[i][capacity] >= optimalValue) {
        optimalValue = tabMaxProfit[i][capacity];
        indexOptimalValue = i;
      }
    }

    // return tabMaxProfit;
    console.log();
    console.log("The table after computing the optimal value is: ");
    console.table(tabMaxProfit);
    console.log(
      "the optimal value for this sequence of objects is : " + optimalValue
    );

    // serching the items that led us to optimal value
    let c = capacity;
    let objectUsed = [];

    //going back in the table from the optimal value index to the original value index to get elements of the used list
    for (let i = indexOptimalValue; i >= 1; i--) {
      if (tabMaxProfit[i][c] > tabMaxProfit[i - 1][c]) {
        objectUsed.push(newitems[i].name);
        c -= newitems[i].weight;
        totalWeigh += parseFloat(newitems[i].weight);
      }
    }
    console.log();
    console.log(
      "the list of elements chosen to rich the optimal value in order is: "
    );
    objectUsed = objectUsed.reverse();

    // to show the object used to achieve the goal while taking them
    console.log();
    let newBags = new bags(
      capacity + "kg",
      objectUsed,
      totalWeigh + "kg",
      optimalValue + "$"
    );
    // the progress bar
    // changeWidthofProgressBar();
    const progressBar = document.querySelector(".progress-bar");

    progressBar.style.width = `${(totalWeigh / capacity) * 100}%`;
    progressBar.innerHTML = `${Math.ceil(eval(totalWeigh / capacity) * 100)}%`;

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

//* fixed list of objects/*

// document.querySelector(".listofFakeObjects").innerHTML = "hello";
// document.querySelector(".listofFakeObjects").innerHTML = JSON.stringify(
//   listOfOfFakeObjects(1, 100)
// );

//*build a select tag from array of fake objects

// const fakeListOfFakeObjects = JSON.stringify(listOfOfFakeObjects(1, 100));

const fakeListOfFakeObjects = listOfOfFakeObjects(1, 100);
console.log(Array.from(fakeListOfFakeObjects));

//* fill the select tag with fake data
const selectListOfObjects = Array.from(fakeListOfFakeObjects).map((item) => {
  const itemObject = {
    name: item.name,
    weight: item.weight,
    value: item.value,
  };
  return (selectTag.innerHTML += `<option value=${JSON.stringify(
    itemObject
  )} class='select__option'>${JSON.stringify(itemObject)}</option>`);
});

//* fill the bag
function createArrayObjectFromSelectTag() {
  const capacity = parseFloat(
    document.querySelector(".input-for-capacity").value
  );
  if (!capacity) {
    document.querySelector(
      ".resulting-bag"
    ).innerHTML = `<span class='alert__nocapacity'>No select before adding the capacity.<br/> reload the page to try again<span>`;
    return;
  }
  //create an objec
  const optionValue = JSON.parse(selectTag.value);
  console.log(optionValue);
  let inputName = optionValue.name;
  let inputWeight = parseFloat(optionValue.weight);
  let inputValue = parseFloat(optionValue.value);

  addOjectsFromSelectTag(inputName, inputWeight, inputValue);
  return { name: inputName, weight: inputWeight, value: inputValue };
}

//* fill the ul list from the select tag values

function addOjectsFromSelectTag(inputName, inputWeight, inputValue) {
  const capacity = parseFloat(
    document.querySelector(".input-for-capacity").value
  );

  let totalWeight;
  let totalValue;
  let objectUsed = [];

  let noAddItem = false;
  const line = document.createElement("li");
  line.className = "li-for-objects";

  Array.from(ulListOfObjects.children).forEach((line) => {
    if (`"${line.children[0].textContent}"` === `"${inputName}"`) {
      noAddItem = true;
    }
  });

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

  if (noAddItem) {
    return;
  } else {
    totalValue = Array.from(ulListOfObjects.children).reduce(
      (sum, curr) => sum + parseFloat(curr.children[2].textContent),
      0
    );

    totalWeight = Array.from(ulListOfObjects.children).reduce(
      (sum, curr) => sum + parseFloat(curr.children[1].textContent),
      0
    );
    totalWeight += parseFloat(line.children[1].textContent);
    totalValue += parseFloat(line.children[2].textContent);
    console.log("totalWeight", totalWeight);
    console.log("totalValue", totalValue);

    objectUsed = Array.from(ulListOfObjects.children).map(
      (object) => object.children[0].textContent
    );
    objectUsed.push(line.children[0].textContent);
    ulListOfObjects.appendChild(line);
  }
  //*progress bar
  progressBar.style.width = `${(totalWeight / capacity) * 100}%`;
  progressBar.innerHTML = `${Math.ceil(eval(totalWeight / capacity) * 100)}%`;

  if (totalWeight > capacity) {
    progressBar.style.background = "red";
  }

  // resulting bag
  let newBags = new bags(
    capacity + "kg",
    objectUsed.reverse(),
    totalWeight + "kg",
    totalValue + "$"
  );

  resultBag = newBags;
  // document.querySelector(".resulting-bag").innerHTML = JSON.stringify(
  //   newBags,
  //   null,
  //   2
  // );

  localStorage.setItem("lines", ulListOfObjects.innerHTML);
  ulListOfObjects.innerHTML = localStorage.getItem("lines");
  return newBags;
}

function renderResult() {
  if (ulListOfObjects.childElementCount) {
    if (progressBar.style.background !== "red") {
      doneButton.style.background = "#0bda51";
    } else {
      doneButton.style.background = "brown";
    }

    document.querySelector(".resulting-bag").innerHTML = JSON.stringify(
      resultBag,
      null,
      2
    );
  } else {
    document.querySelector(".resulting-bag").innerHTML = "";
    window.location.reload();
    return;
  }
}

function displayResult() {
  return renderResult();
}

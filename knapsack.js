// create the constructor of objects that we need for the purpose
function Objects(name, weight, value) {
  this.name = name;
  this.weight = weight;
  this.value = value;
}

/*
 function to get a particular random list of objects given an interval of elements 
 to avoid entring objects manually*/

const items = (min, max) => {
  // let's make items array to not be empty and the computation start at index 1 
  let arr = [{}];
  for (let i = min; i <= max; i++) {
    let n1 = Math.floor(Math.random() * (max - min)) + min;
    let n2 = Math.floor(Math.random() * (max - min)) + min;
    let item = new Objects(`${i}`, n1, n2);
    arr.push(item);
  }
  return arr;
};

// the function to get the maximum value between a set of objects with weight and value

function tableOfMaxProfit(capacity, items) {
  // some check first
  if (!(capacity > 0 && items.length)) {
    console.warn(
      "capacity should be a positive (> 0) number and array of object not empty"
    );
  } else {
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
    let newItems = [];
    newItems = items;
    let i = 0,
      w = 0,
      optimalValue = 0,
      indexOptimalValue = 0;
    //print list of object used for this case of searching the optimal value
    console.log();
    console.log("The list of objects used for computation of optimal value: ");
    console.log(newItems);
    console.log();
    //fill the bags from o kg weight to the maximum capacity weight

    for (i = 1; i < newItems.length; i++) {
      // get the weight and the value of the current item
      let wi = newItems[i].weight;
      let vi = newItems[i].value;
      for (w = 1; w <= capacity; w++) {
        // to have the right value in the table
        if (w >= wi) {
          tabMaxProfit[i][w] = Math.max(
            tabMaxProfit[i - 1][w - wi] + vi,
            tabMaxProfit[i - 1][w]
          );
        }
      }
      /* to get the optimal value of the table and its index. 
    sometimes the optimal value is not right-bottom corner element */
      if (tabMaxProfit[i][capacity] >= optimalValue) {
        optimalValue = tabMaxProfit[i][capacity];
        indexOptimalValue = i;
      }
    }
    // return tabMaxProfit;
    console.log();
    console.log("The table after computing the optimal value is: ");
    console.table(tabMaxProfit);
    // }
    // let optimalValue = tabMaxProfit[newItems.length - 1][capacity];
    console.log(
      "the optimal value for this sequence of objects is : " + optimalValue
    );
    // serching the items that led us to optimal value
    // let nLines = newItems.length;
    let c = capacity;
    let objectUsed = [];
    //going back in the table from the optimal value index to the original value index
    for (let i = indexOptimalValue; i >= 1; i--) {
      if (tabMaxProfit[i][c] !== tabMaxProfit[i - 1][c] && newItems[i].value) {
        objectUsed.push(i);
        c -= newItems[i].weight;
        //to show the object used to achieve the goal while taking them
        //  console.log(objectUsed);
      }
    }

    console.log();
    console.log(
      "the list of elements chosen to rich the optimal value in order is: "
    );
    objectUsed = objectUsed.reverse();
    console.log(objectUsed);
  }
}
console.log(tableOfMaxProfit(-12, items(10,20)));

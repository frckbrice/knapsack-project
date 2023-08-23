//* to bind html elements

const doneButton = document.querySelector('.done-btn')
const ulListOfObjects = document.querySelector('.ul-of-objects')
const selectTag = document.getElementById('selectitemlist')
const progressBar = document.querySelector('.progress-bar')

let resultBag = {}

//* add events

doneButton.addEventListener('click', displayResult)
selectTag.addEventListener('change', createArrayObjectFromSelectTag)

//* create the constructor of objects that we need for the purpose
function Objects (name, weight, value) {
  this.name = name
  this.weight = weight
  this.value = value
  return this
}

//*  the knapSack constructor
function Bags (capacity, items, weight, value) {
  this.capacity = capacity
  this.items = items
  this.weight = weight
  this.value = value
  return this
}

/*
 * function to get a particular random list of objects given an interval of elements
 * to avoid entring objects manually */

const listOfOfFakeObjects = (min, max) => {
  //   //* let's make items array to not be empty and the computation start at index 1
  const arr = []
  let count = 0
  for (let i = min; i <= max; i++) {
    const n1 = Math.floor(Math.random() * (max - min)) + min
    const n2 = Math.floor(Math.random() * (max - min)) + min
    arr.push(new Objects(`rebase${i}`, `${n1}`, `${n2}`))
    count++
    if (count === 20) break
  }
  return arr
}

//* the function to get the maximum value within a set of objects with weight and value

//* build a select tag from array of fake objects

const fakeListOfFakeObjects = listOfOfFakeObjects(1, 100)
console.log(Array.from(fakeListOfFakeObjects))

//* fill the select tag with fake data
Array.from(fakeListOfFakeObjects).map((item) => {
  const itemObject = {
    name: item.name,
    weight: item.weight,
    value: item.value
  }
  return (selectTag.innerHTML += `<option value=${JSON.stringify(
    itemObject
  )} class='select__option'>${JSON.stringify(itemObject)}</option>`)
})

//* fill the bag
function createArrayObjectFromSelectTag () {
  const capacity = parseFloat(
    document.querySelector('.input-for-capacity').value
  )
  if (!capacity) {
    document.querySelector(
      '.resulting-bag'
    ).innerHTML = '<span class=\'alertnocapacity\'>No select before adding the capacity.<br/> reload the page to try again<span>'
    return
  }
  // create an objec
  const optionValue = JSON.parse(selectTag.value)
  console.log(optionValue)
  const inputName = optionValue.name
  const inputWeight = parseFloat(optionValue.weight)
  const inputValue = parseFloat(optionValue.value)

  addOjectsFromSelectTag(inputName, inputWeight, inputValue)
  return { name: inputName, weight: inputWeight, value: inputValue }
}

//* fill the ul list from the select tag values

function addOjectsFromSelectTag (inputName, inputWeight, inputValue) {
  const capacity = parseFloat(
    document.querySelector('.input-for-capacity').value
  )

  let totalWeight
  let totalValue
  let objectUsed = []

  let noAddItem = false
  const line = document.createElement('li')
  line.className = 'li-for-objects'

  Array.from(ulListOfObjects.children).forEach((line) => {
    if (`"${line.children[0].textContent}"` === `"${inputName}"`) {
      noAddItem = true
    }
  })

  const pTag1 = document.createElement('p')
  pTag1.appendChild(document.createTextNode(inputName))
  pTag1.classList.add('ptag')

  const pTag2 = document.createElement('p')
  pTag2.appendChild(document.createTextNode(inputWeight))
  pTag2.classList.add('ptag')

  const pTag3 = document.createElement('p')
  pTag3.classList.add('ptag')
  pTag3.appendChild(document.createTextNode(inputValue))

  line.appendChild(pTag1)
  line.appendChild(pTag2)
  line.appendChild(pTag3)

  if (noAddItem) {
    return
  } else {
    totalValue = Array.from(ulListOfObjects.children).reduce(
      (sum, curr) => sum + parseFloat(curr.children[2].textContent),
      0
    )

    totalWeight = Array.from(ulListOfObjects.children).reduce(
      (sum, curr) => sum + parseFloat(curr.children[1].textContent),
      0
    )
    totalWeight += parseFloat(line.children[1].textContent)
    totalValue += parseFloat(line.children[2].textContent)
    console.log('totalWeight', totalWeight)
    console.log('totalValue', totalValue)

    objectUsed = Array.from(ulListOfObjects.children).map(
      (object) => object.children[0].textContent
    )
    objectUsed.push(line.children[0].textContent)
    ulListOfObjects.appendChild(line)
  }
  //* progress bar
  progressBar.style.width = `${(totalWeight / capacity) * 100}%`
  progressBar.innerHTML = `${Math.ceil(totalWeight / capacity) * 100}%`

  if (totalWeight > capacity) {
    progressBar.style.background = 'red'
  }

  // resulting bag
  const newBags = new Bags(
    capacity + 'kg',
    objectUsed.reverse(),
    totalWeight + 'kg',
    totalValue + '$'
  )

  resultBag = newBags
  // document.querySelector(".resulting-bag").innerHTML = JSON.stringify(
  //   newBags,
  //   null,
  //   2
  // );

  localStorage.setItem('lines', ulListOfObjects.innerHTML)
  ulListOfObjects.innerHTML = localStorage.getItem('lines')
  return newBags
}

function renderResult () {
  if (ulListOfObjects.childElementCount) {
    if (progressBar.style.background !== 'red') {
      doneButton.style.background = '#0bda51'
    } else {
      doneButton.style.background = 'brown'
    }

    document.querySelector('.resulting-bag').innerHTML = JSON.stringify(
      resultBag,
      null,
      2
    )
  } else {
    document.querySelector('.resulting-bag').innerHTML = ''
    window.location.reload()
  }
}

function displayResult () {
  return renderResult()
}

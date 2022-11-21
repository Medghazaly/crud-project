let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let temp;

// get total
function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// Save data in localStorage
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newPro.count <= 100
  ) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[temp] = newPro;
      mood = "create";
      count.style.display = "block";
      submit.innerHTML = "Create";
    }
    clearInputs();
  }

  localStorage.setItem("product", JSON.stringify(dataPro));

  showData();
};

// Clear Inputs
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// Read
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick='updateData(${i})'>Update</button></td>
            <td><button onclick='deleteData(${i})'>Delete</button></td>
        </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;

  let delete_All = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    delete_All.innerHTML = `
        <button onclick='deleteAll()'>Delete All (${dataPro.length})</button>
        `;
  } else {
    delete_All.innerHTML = "";
  }
}
showData();

// Delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

// Delete All Data From local Storage and showData
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// Update Data
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  mood = "Update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search
let searchMood = "title";

function getSearchData(id) {
  let search = document.getElementById("search");

  if (id === "search_title") {
    search.placeholder = "Search By Title";
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = `search by ${searchMood}`;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood === "title") {
      if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick='updateData(${i})'>Update</button></td>
            <td><button onclick='deleteData(${i})'>Delete</button></td>
        </tr>
        `;
      }
    } else {
      if (dataPro[i].category.toLowerCase().includes(value)) {
        table += `
          <tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick='updateData(${i})'>Update</button></td>
              <td><button onclick='deleteData(${i})'>Delete</button></td>
          </tr>
          `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

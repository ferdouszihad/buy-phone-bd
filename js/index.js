const loadAPI = async (value, limit) => {
  toggleLoader(true);
  const url = `https://openapi.programming-hero.com/api/phones?search=${value}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    display(data.data, limit);
  } catch (error) {
    console.log(error);
  }
};
const display = (phones, limit) => {
  const phoneBox = document.getElementById("phone-container");
  phoneBox.textContent = ``;
  const showBtn = document.getElementById("show-btn");
  if (limit && phones.length > 12) {
    phones = phones.slice(0, 12);
    showBtn.classList.remove("d-none");
  } else {
    showBtn.classList.add("d-none");
  }
  let errorMSg = document.getElementById("no-found-msg");
  console.log(errorMSg);

  if (phones.length == 0) {
    errorMSg.classList.remove("d-none");
  } else {
    errorMSg.classList.add("d-none");
  }

  for (let phone of phones) {
    console.log(phone);
    let col = document.createElement("div");
    col.classList.add("col");
    col.innerHTML = `
    <div class="card">
        <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">brand : ${phone.brand}</p>
            <button class="btn btn-primary" onclick=displayDetailof('${phone.slug}')>See Details</button>
        </div>
    </div>
    `;
    phoneBox.appendChild(col);
  }
  toggleLoader(false);
};

const doSearch = (limit) => {
  const searchInput = document.getElementById("input-text");
  loadAPI(searchInput.value, limit);
};

document.getElementById("search-btn").addEventListener("click", function () {
  doSearch(12);
});

document
  .getElementById("input-text")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      doSearch(12);
    }
  });

const toggleLoader = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};

document.getElementById("show-btn").addEventListener("click", function () {
  doSearch();
});

const displayDetailof = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.data);
};

loadAPI("iphone");

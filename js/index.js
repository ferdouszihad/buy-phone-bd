const loadAPI = async (value) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${value}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    display(data.data);
  } catch (error) {
    console.log(error);
  }
};
const display = (phones) => {
  const phoneBox = document.getElementById("phone-container");
  phoneBox.textContent = ``;
  phones = phones.slice(0, 16);

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
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">brand : ${phone.brand}</p>
            <a href="#" class="btn btn-primary" id='${phone.slug}'>See Details</a>
        </div>
    </div>
    `;
    phoneBox.appendChild(col);
  }
};

document.getElementById("search-btn").addEventListener("click", function () {
  const searchInput = document.getElementById("input-text");
  loadAPI(searchInput.value);
  searchInput.value = "";
});
loadAPI("iphone");

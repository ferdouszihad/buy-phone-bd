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
    let col = document.createElement("div");
    col.classList.add("col");
    col.innerHTML = `
    <div class="card">
        <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">brand : ${phone.brand}</p>
            <button class="btn btn-primary" onclick=loadDetailof('${phone.slug}') data-bs-toggle="modal" data-bs-target="#phoneDetailModal">See Details</button>
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

const loadDetailof = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetailOf(data.data);
};

const displayDetailOf = (phone) => {
  console.log(phone);
  const title = document.getElementById("phoneDetailModalLabel");
  title.innerText = `${phone.name}`;

  let phoneBody = document.getElementById("modal-container");
  phoneBody.innerHTML = `
  <div class="row align-items-center">
        <div class="col-4">
            <img src=${phone.image} class="img-fluid" />

        </div>
        <div class="col-8">
            <p>Release Date : ${
              phone.releaseDate.length == 0 ? "Not Provided" : phone.releaseDate
            } </p>
            
            <table class="table">
            <tbody>
                <tr>
                <th colspan=2>Features</th>
                
                </tr>
                <tr>
                <th>Display</th>
                <td>${phone.mainFeatures.displaySize}</td>
            
                </tr>
                <tr>
                <th>Storage</th>
                <td>${phone.mainFeatures.storage}</td>
                </tr>
                <tr>
                <th>Chipset</th>
                <td>${phone.mainFeatures.chipSet}</td>
                </tr>
                <tr>
                <th>Memory</th>
                <td>${phone.mainFeatures.memory}</td>
                </tr>
                <tr>
                <th>Sensors</th>
                <td>${phone.mainFeatures.sensors.join(" , ")}</td>
                </tr>
            </tbody>
            </table>
            
        </div>
    </div>



  `;
};

loadAPI("iphone");

// {
//     "mainFeatures": {
//         "storage": "128GB/256GB/512GB storage, no card slot",
//         "displaySize": "5.4 inches, 71.9 cm2 (~85.1% screen-to-body ratio)",
//         "chipSet": "Apple A15 Bionic (5 nm)",
//         "memory": "128GB 4GB RAM, 256GB 4GB RAM, 512GB 4GB RAM",
//         "sensors": [
//             "Face ID",
//             "accelerometer",
//             "gyro",
//             "proximity",
//             "compass",
//             "barometer"
//         ]
//     },
//     "slug": "apple_iphone_13_mini-11104",
//     "name": "iPhone 13 mini",
//     "releaseDate": "Released 2021, September 24",
//     "brand": "Apple",
//     "image": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg"
// }

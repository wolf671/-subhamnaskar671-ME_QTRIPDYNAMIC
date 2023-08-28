import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
//console.log("From init()");
  let cities = await fetchCities();

  //Updates the DOM with the cities
  
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let cities = await fetch(config.backendEndpoint+`/cities`);
    
    return cities.json();
    
  }
  catch(e){
    return null;
  }

}



//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let card = document.getElementById("data");
  let content = document.createElement("div");
  content.className = "col-6 col-md-4 col-lg-3 mb-4";
  content.innerHTML =  `
  <a href="pages/adventures/?city=${id}" id="${id}">
    <div class="tile">
      <div class="tile-text text-center">
        <h5>${city}</h5>
        <p>${description}</p>
      </div>
    <img class="img-responsive" src="${image}">
    </div>
  </a>
  `;
    card.appendChild(content); 

//   let container = document.createElement("div");
//   container.setAttribute("class", "col-sm-6 col-lg-3 my-4")
//   container.innerHTML = `
// <a href="pages/adventures/?city=${id}" id="${id}" target="_blank">
// <div class="tile">
// <img src="${image}">
// <div class="tile-text text-center">
// <h5>${city}</h5>
// <p>${description}</p>
// </div>
// </div>
// </a>
// `;
//   let parent = document.getElementById("data");
//   parent.append(container);

}

export { init, fetchCities, addCityToDOM };

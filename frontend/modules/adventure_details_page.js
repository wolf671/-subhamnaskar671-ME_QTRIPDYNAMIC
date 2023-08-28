import config from "../conf/index.js";
import { filterByCategory } from "./adventures_page.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let parameters = new URLSearchParams(search);
  let adventureId =  parameters.get('adventure');
  return adventureId;


  // Place holder for functionality to work in the Stubs
  
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let url = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`;
    let resp = await fetch(url);

    let advDetails = await resp.json();
    return advDetails;
  }

  catch(error){
    return null;
  }
  

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById( "adventure-name" ).textContent  =  adventure.name;
  document.getElementById( "adventure-subtitle" ).textContent  =  adventure.subtitle;

  for(let i = 0; i < adventure.images.length; i++){
    let div = document.createElement("div");
    let img = document.createElement("img");

    img.setAttribute("class" , "activity-card-image" );
    img.src = adventure.images[i];

    div.append(img);
    
    document.getElementById("photo-gallery").append(div);
  }
  document.getElementById("adventure-content").textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery")
   photoGallery.innerHTML=`
   <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
   <div class="carousel-indicators">
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true"></button>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="slide 2"></button>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="slide 3"></button>
   </div>
   <div class="carousel-inner"  id="carousel-inner">
   </div>
   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Previous</span>
   </button>
   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
     <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Next</span>
   </button>
 </div>
   `
  images.map(( key,index ) => {
    var divElement = document.createElement( "div" );
    divElement.innerHTML = `<img src=${key} class="activity-card-image pb-3"/>`;

    divElement.className = `carousel-item ${ index==0?'active':'' }`;
    
    document.getElementById("carousel-inner").appendChild(divElement);
  });

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
      document.getElementById("reservation-panel-sold-out").style.display = "none";
      document.getElementById("reservation-panel-available").style.display = "block";
    // reserveation update
      document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-available").style.display = "none";
      document.getElementById("reservation-panel-sold-out").style.display = "block";
      
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const totalSum  = adventure.costPerHead*persons;
  document.getElementById("reservation-cost").innerHTML =totalSum;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const myForm=document.getElementById("myForm");
  myForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let  data={
      name:myForm.elements["name"].value,
      date:new Date(myForm.elements["date"].value),
      person:myForm.elements["person"].value,
      adventure:adventure["id"]
    }
    //console.log(data);
    try{
      const url=`${config.backendEndpoint}/reservations/new`;
      const res=await fetch(url,{
        method:"POST",
       headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(data)
      });
     alert("success");
     window.location.reload();
    }
    catch(error){
      console.log(error);
      alert("failed");
 
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

    let dStyl = adventure.reserved  ?  "block":"none";
    document.getElementById("reserved-banner").style.display = dStyl;

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};

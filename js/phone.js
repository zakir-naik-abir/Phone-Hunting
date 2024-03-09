const loadPhone = async (searchText='iphone', isShowAll) =>  {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data
  // console.log(phones);
  displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
  // console.log(phones)
  const phoneContainer = document.getElementById('phone-container')
  // clear phone container cards before adding new cards
  phoneContainer.textContent ='';

  const showAllContainer = document.getElementById('show-all-container')
  if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden')
  }
  else{
    showAllContainer.classList.add('hidden')
  }
  
  console.log('is show all', isShowAll)
  // display only 9 phones
  if(!isShowAll){
    phones = phones.slice(0,9);
  }

  phones.forEach(phone => {
    console.log(phone)
    // 1 create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-gray-100 shadow-xl p-7`;
    phoneCard.innerHTML = `
      <figure><img src="${phone.image}" alt="image" /></figure>
      <div class="card-body text-center items-center">
        <h2 class="card-title">${phone.phone_name
        }</h2>
        <p>There are many variations of<br>passages of avaiable, but the<br>majority have suffered</p>
        <h2 class="text-2xl font-bold">$999</h2>
        <div class="card-actions justify-center">
          <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>

          
        </div>
      </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
}

// handle search button
const handleSearch = (isShowAll) =>{
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}

// handle show all
const handleShowAll = () => {
  handleSearch(true)
}

// show details
const handleShowDetail = async (id) => {
  console.log('click', id);
  // load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;

  showPhoneDetailes(phone);
}

// show details phone
const showPhoneDetailes = (phone) => {
  console.log(phone);
  // const PhoneName = document.getElementById('details-phone-name');
  // PhoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
    <img class="items-center text-center m-auto mb-4 bg-slate-300 " src="${phone.image}" alt="image"/>
    <h3 class="font-bold text-3xl">${phone.name}</h3>
    <p class="font-bold text-lg"><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p class="font-bold text-lg"><span>Display: </span>${phone?.mainFeatures?.displaySize}</p>
    <p class="font-bold text-lg"><span>Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
    <p class="font-bold text-lg"><span>Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p class="font-bold text-lg"><span>Slug: </span>${phone?.mainFeatures?.slug}</p>
    <p class="font-bold text-lg"><span>Release date: </span>${phone?.releaseDate}</p>
    <p class="font-bold text-lg"><span>Brand: </span>${phone?.brand}</p>
    <p class="font-bold text-lg"><span>GPS: </span>${phone?.others?.GPS || 'No GPS'}</p>
    <p class="font-bold text-lg"><span>GPS: </span>${phone?.others?.GPS ? phone.others.GPS : 'No GPS available'}</p>
  `

  // show the modal
  show_modal.showModal();
}

loadPhone();
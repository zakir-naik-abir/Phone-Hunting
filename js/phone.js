const loadPhone = async (searchText) =>  {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data
  // console.log(phones);
  displayPhones(phones);
}

const displayPhones = phone => {
  // console.log(phones)
  const phoneContainer = document.getElementById('phone-container')
  // clear phone container cards before adding new cards
  phoneContainer.textContent ='';

  phone.forEach(phone => {
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
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Show Details</button>
        </div>
      </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
}

// handle search button
const handleSearch = () =>{
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText);
}

// loadPhone();
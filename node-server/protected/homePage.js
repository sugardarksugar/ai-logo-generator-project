//Let user see pictures which are in their preference list 
window.onload = async () => {
  getUserName()
  afterLogin()
};

//Logout
document
  .querySelector(".logoutBtn")
  .addEventListener("click", async function (event) {
    const res = await fetch("/logout", { method: 'POST' }) //fetch to user.routes

    const result = await res.json();

    if (result.error) {
      Swal.fire({
        title: result.error,
        backdrop: false
      })
    }

    else {
      Swal.fire({
        title: result.message,
        backdrop: false
      })
      setTimeout(() => {
        location.reload();
      }, "1000")
    }
  });


//Getting username from server and writing welcoming message
async function getUserName() {
  let userInfo = await fetch("/username"); //fetch to user.routes
  let result = await userInfo.json();
  let welcomeMessage = document.querySelector(".username");

  let message = `Welcome back ${result.username || "User"}`

  welcomeMessage.textContent = message;
}



//Getting user's initial preference before getting images
async function getPreference() {
  const res = await fetch("/preference");     //fetch to preference.routes

  const result = await res.json();
  console.log("preferenceResult: ", result);

  let preference = result.preference.map(v => +v.preference_id) //actually this has been 拆包 already in preference.service.ts
  return preference   //e.g [2,3,5,6]
}


//Getting images after knowing user's initial preference
async function getImage(preference = []) {
  const res = await fetch("/image", {       //fetch to image.routes
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ preference })
  })

  const result = await res.json();
  console.log("imageResult: ", result);

  let images = result.images
  return images     //e.g [{file_name: 123.png, XXX: YYY},{...},{...}, ...]
}


//Generate card after getting images(using innerHTML)
async function createCard(images = []) {
  let cards = document.querySelector(".pin_container");
  let message = '';

  if (images.length < 1) {
    Swal.fire("Sorry, there is no picture in such themes. Please try with another keyword.")

  }
  else {
    console.log("images: ", images);

    images = images.map(v => v.file_name)  //將images拆包
    for (let img of images) {
      console.log('img', img)
      let chance = Math.floor(Math.random() * 3)

      if (chance == 1) {
        message += `<div class="card card_small"><a href="/generated/${img}" download class="saveBtn">Save</a><img class="images" src="/generated/${img}"></div>`
      }
      else if (chance == 2) {
        message += `<div class="card card_medium"><a href="/generated/${img}" download class="saveBtn">Save</a><img class="images" src="/generated/${img}"></div>`
      }
      else {
        message += `<div class="card card_large"><a href="/generated/${img}" download class="saveBtn">Save</a><img class="images" src="/generated/${img}"></div>`
      }

    }
    cards.innerHTML = message
  }

  const imagesArr = document.querySelectorAll(".images")
  for (let v of imagesArr) {

    v.addEventListener('click', (e) => {

      Swal.fire({
        imageUrl: v.src,
        background: `rgb(0, 0, 0,0.3)`,
        backdrop: `rgb(0, 0, 0,0.9)`,
        imageWidth: v.maxwidth,
        imageHeight: v.maxheight,
        imageAlt: 'Custom image',
      })
    })
  }


}


//clear old cards
async function clearOldCards() {
  let cards = document.querySelector(".pin_container");
  // let message = '';

  cards.innerHTML = ""
}


//Getting images from DB after getting keyword from search bar
async function getImagesByKeyword(str) {
  const res = await fetch("/imagesByKeyword", {    //fetch to image.routes
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ keyword: str })
  })

  const result = await res.json();
  console.log("searchImageResult: ", result);

  let images = result.images
  return images     //e.g [{file_name: 123.png, XXX: YYY},{...},{...}, ...]
}



//showing pictures when user login
async function afterLogin() {
  await clearOldCards();
  let preference = await getPreference();
  console.log("preference: ", preference);
  let images = await getImage(preference);
  await createCard(images)
}

//Search other pictures after user input a new keyword
const searchingItem = document.querySelector('#searchBar')
searchingItem.addEventListener("change", async () => {
  console.log("searchBar input: ", searchingItem.value);

  let input = searchingItem.value

  let images = await getImagesByKeyword(input)
  await clearOldCards();
  await createCard(images)
})



//showing pictures when user searches something else
// async function afterSearch() {
//   await clearOldCards();
//   let input = await getSearchBarInput();
//   let images = await getImagesByKeyword(input)
//   await createCard(images)
// }
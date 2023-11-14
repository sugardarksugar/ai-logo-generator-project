//logout
document
  .querySelector(".logoutBtn")
  .addEventListener("click", async function (event) {
    const res = await fetch("/logout")     //fetch to user.routes

    const result = await res.json();

    if (result.error) {
      alert(result.error);
    } else {
      alert(result.message);
    }

    location.reload();

  });


//getting username from server and writing welcoming message
async function getUserName() {
  let userInfo = await fetch("/username");       //fetch to user.routes
  let result = await userInfo.json();
  let welcomeMessage = document.querySelector(".username");

  let message = `Welcome back ${result.username || "User"}`

  welcomeMessage.textContent = message;

}
getUserName()


//submit preference
document
  .querySelector('.submitBtn')
  .addEventListener('click', async function (event) {

    let list = [];
    let checked = document.querySelectorAll("[type=checkbox]:checked");
    for (let i = 0; i < checked.length; i++) {
      list.push(+checked[i].value);
    }
    console.log(list);

    const res = await fetch("/preference", {       //fetch to preference.routes
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: list }),
    });

    const result = await res.json();
    console.log(result);

    if (!result.status) {
      // alert(result.message);
      Swal.fire({
        title: result.message,
        backdrop: false
      })
    }
    else if (result.status) {
      // alert(result.message);
      Swal.fire({
        title: result.message,
        backdrop: false
      })
      setTimeout(() => {
        location.href = "homePage.html";
      }, "1000")
    }

  });
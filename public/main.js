const urlForm = document.getElementById("url-form");
const originalUrl = document.getElementById("original-url");
const uniqueName = document.getElementById("unique-name");
const confirmationShow = document.getElementById("confirmationShow");
const status = document.getElementById("status");

const formSubmit = (e) => {
  e.preventDefault();

  console.log("Submit called");

  status.innerHTML = '<button type="button" class="loader"></button>';

  console.log("Submit called");

  fetch("/createShortLink", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      originalUrl: originalUrl.value,
      unique_name: uniqueName.value,
    }),
  })
    .then((data) => data.json())
    .then((response) => {
      status.innerHTML = "<button>SHORTEN</button>";
      if (!response.ok) {
        confirmationShow.innerText = response.error;
      } else {
        console.log("whats app");

        confirmationShow.innerHTML = `Hooray!!! The link can now be visited 
            through <a target="_blank" 
            href=${response.shortUrl} rel = "noopener noreferer" > 
            ${response.shortUrl} </a>`;
      }
    })
    .catch((err) => {
      console.log("oops", err);
      status.innerHTML = "<button>SHORTEN</button>";
      confirmationShow.innerText = "Network error, retry";
    });
};

urlForm.addEventListener("submit", formSubmit);

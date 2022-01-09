const DOG_URL = "https://dog.ceo/api/breeds/image/random";
const doggos = document.querySelector(".doggos");

function addNewDoggo() {
  doggos.innerHTML = "Loading...";
  const promise = fetch(DOG_URL);
  promise
    .then(function (response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function (processedResponse) {
      const img = document.createElement("img");
      img.src = processedResponse.message;
      img.alt = "Cute doggo";
      doggos.appendChild(img);
    })
    .then(function () {
      console.log("something else I want to do");
    })
    .catch(function () {
      console.log("aqui falla");
      doggos.innerHTML = "Oops something went wrong...";
    })
    .finally(function () {
      console.log("termina");
      doggos.innerHTML = doggos.innerHTML.replace("Loading...", "");
      console.log(doggos.innerHTML);
    });
}

document.querySelector(".add-doggo").addEventListener("click", addNewDoggo);

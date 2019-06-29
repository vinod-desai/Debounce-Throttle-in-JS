const searchInput = document.getElementById("searchInput");
const getUserBtn = document.getElementById("getUserBtn");

function getGitHubUsers() {
  console.log(searchInput.value);
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    // console.log(`${this.readyState} ${this.status}`);
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("searchResults").innerHTML = `
      <h3>Name: ${JSON.parse(this.responseText).name}</h3>
      <h4>About: ${JSON.parse(this.responseText).bio}</h4>
      <h4>UserID: ${JSON.parse(this.responseText).login}</h4>
      <h4>Followers: ${JSON.parse(this.responseText).following}</h4>
      <h4>GitHub: ${JSON.parse(this.responseText).html_url}</h4>
      `;
    }
    if (this.readyState == 4 && this.status == 403) {
      document.getElementById("searchResults").innerHTML = this.responseText;
    }
    if (this.status == 404) {
      document.getElementById(
        "searchResults"
      ).innerHTML = `<h3>No user found with this ID</h3>`;
    }
  };
  if (searchInput.value !== "") {
    xhttp.open(
      "GET",
      `https://api.github.com/users/${searchInput.value}`,
      true
    ); // Async
  } else {
    xhttp.open("GET", `https://api.github.com/users`, true); // Async
  }

  // xhttp.open("GET", "https://api.github.com/users", false); // Sync
  xhttp.send();
}

const debounce = (func, delay) => {
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const throttle = (func, limit) => {
  let inThrottle = false;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

searchInput.addEventListener("input", debounce(getGitHubUsers, 400));

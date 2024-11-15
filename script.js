const accessKey = 'OFmQltpMYcHCufyOFDCfnfiCv5E5XXKS8W8GwKVWOeU';

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const welcomeSection = document.getElementById("welcome-section");  // New element reference

let keyword = '';
let page = 1;

async function searchImage(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1){
        searchResult.innerHTML = "";
    }
    
    results.forEach((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });

    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImage();
    welcomeSection.style.display = "none";  // Hide welcome section on search
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImage();
});

// Add the hide-scrollbar class on page load
document.body.classList.add("hide-scrollbar");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImage();
    welcomeSection.style.display = "none";  // Hide welcome section on search
    
    // Remove hide-scrollbar class to show scrollbar after search
    document.body.classList.remove("hide-scrollbar");
});

const logoContainer = document.getElementById("logo-container");

logoContainer.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default anchor behavior
    searchResult.innerHTML = ''; // Clear the search results
    showMoreBtn.style.display = "none"; // Hide the "Show More" button
    searchBox.value = ''; // Clear the search box
    welcomeSection.style.display = "block"; // Show the welcome section again
});
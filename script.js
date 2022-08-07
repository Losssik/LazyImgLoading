const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

let count = 5;
const apiKey = "YsNgqbt-lQsw_BAWzS8kIqO6yNDR5ZCaXHBr4h6zbdY";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}
`;

//check if all images were loaded

function imageLoaded() {
  console.log("img loaded");
  imageLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    initialLoad = false;
    count = 30;
    console.log(`ready - ${ready}`);
  }
}

const setAttributes = function (element, attrubutes) {
  for (const key in attrubutes) {
    element.setAttribute(key, attrubutes[key]);
  }
};

// create function for displaying photos

const displayPhotos = function () {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log(`total images ${totalImages}`);
  photosArray.forEach((photo) => {
    //create 'a' tag
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    //create img for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", "random photos from usplash API");
    img.setAttribute("title", photo.alt_description);

    //event listern, check when easch is finished loading

    img.addEventListener("load", imageLoaded);

    //put img inside 'a' element and then both in img element container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

//get photos from API

const getPhotos = async function () {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (err) {
    console.log(err);
  }
};

// check to see if scrolling near of bottom

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.screenY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();

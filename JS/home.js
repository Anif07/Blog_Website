const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navbar.classList.toggle("active");
});
document.querySelectorAll(".link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navbar.classList.remove("active");
  })
);

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getDatabase,
  get,
  ref,
  set,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAKoE7m49cheXf-CAdeAk9zYVe_OxX8H7o",
  authDomain: "blogbreeze-e6219.firebaseapp.com",
  databaseURL: "https://blogbreeze-e6219-default-rtdb.firebaseio.com",
  projectId: "blogbreeze-e6219",
  storageBucket: "blogbreeze-e6219.appspot.com",
  messagingSenderId: "806404218202",
  appId: "1:806404218202:web:f17ae91fea3315852d6763",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const storage = getStorage(app);

const add_post_btn = document.querySelector("#post-btn");

function Add_Post(event) {
  event.preventDefault();
  const title = document.querySelector("#heading").value;
  const post_Content = document.querySelector("#article").value;
  const id = Date.now();

  // const imageInput = document.querySelector("#banner-upload");
  // const file = imageInput.files[0];

  //   set(ref(db, "post/" + id), {
  //     title: title,
  //     post_Content: post_Content,
  //   });
  //   // const newPostRef = push(ref(db, "posts"), {
  //   //   title: title,
  //   //   content: content,
  //   // });
  //   document.querySelector("#heading").value = "";
  //   document.querySelector("#article").value = "";
  // }
  //........................................

  const imageInput = document.querySelector("#banner-upload");
  const file = imageInput.files[0];

  const storageReference = storageRef(storage, "images/" + id); // Assuming you are using Firebase Storage
  uploadBytes(storageReference, file)
    .then((snapshot) => {
      // Get the download URL for the image
      getDownloadURL(snapshot.ref)
        .then((downloadURL) => {
          // Save post data along with the image URL to the database
          set(ref(db, "post/" + id), {
            title: title,
            postContent: post_Content,
            imageURL: downloadURL, // Saving the download URL of the image
          })
            .then(() => {
              const imgDisplay = document.getElementById("banner");
              // imgDisplay.style.backgroundImage = `url(${downloadURL})`;
              const imgElement = document.createElement("img");
              imgElement.src = downloadURL;
              imgDisplay.appendChild(imgElement);
              document.querySelector("#heading").value = "";
              document.querySelector("#article").value = "";
              console.log("Post added successfully!");
            })
            .catch((error) => {
              console.error("Error adding post: ", error);
            });
        })
        .catch((error) => {
          console.error("Error getting download URL: ", error);
        });
    })
    .catch((error) => {
      console.error("Error uploading image: ", error);
    });
}
add_post_btn.addEventListener("click", Add_Post);

//get data from database db
// function getPostData() {
//   const user_ref = ref(db, "post/");
//   get(user_ref).then((snapshot) => {
//     const data = snapshot.val();

//     const box = document.querySelector(".box-1");
//     for (const key in data) {
//       const { title, post_Content } = data[key];
//       console.log(title, post_Content);
//     }
//   });
// }
// getPostData();
// function getPostData() {
//   const user_ref = ref(db, "post/");
//   get(user_ref).then((snapshot) => {
//     snapshot.forEach((childSnapshot) => {
//       const { title, post_Content } = childSnapshot.val();
//       console.log(title, post_Content);

//       let box = document.querySelector("#box-1");
//       box.classList.add("box-1");

//       box.innerHTML = `
//       <h2>${title}</h2>
//       <p>${post_Content}</p>
//       `;
//       document.body.appendChild(box);
//     });
//   });
// }
// getPostData();
// const form = document.querySelector("form");
// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const headingDetails = form.querySelector("#heading").value;
//   const contentDetails = form.querySelector("#article").value;

//   const formData = {
//     title: headingDetails,
//     content: contentDetails,
//   };

//   fetch("https://cinezenith-json-server.onrender.com/blogs", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   });
// });
// // fetch("https://cinezenith-json-server.onrender.com/blogs/7", {
// //   method: "DELETE",
// // });

// // async function fetchData() {
// //   const response = await fetch(
// //     "https://cinezenith-json-server.onrender.com/blogs"
// //   );
// //   return response.json().data;
// // }

// // (async () => {
// //   var newDataVariable = await fetchData();
// // })();

// // console.log(newDataVariable);

// const image = document.querySelector("#banner-upload");
// console.log(image);

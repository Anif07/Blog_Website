// const json = localStorage.getItem("form");
// const obj = JSON.parse(json);
// const blogcontainer = document.querySelector(".blog-container");
// for (key in obj) {
//   if (obj.hasOwnProperty(key)) {
//     const value = obj[key];
//     const blogbox = document.createElement("div");
//     blogbox.classList.add("box-1");
//     console.log(value);

//     const heading = document.createElement("h2");
//     heading.textContent = value.heading;
//     console.log(value.heading);

//     const paragraph = document.createElement("p");
//     paragraph.textContent = value.content;

//     const readButton = document.createElement("button");
//     readButton.classList.add("read-btn");
//     readButton.textContent = "Read";

//     blogbox.appendChild(heading);
//     blogbox.appendChild(paragraph);
//     blogbox.appendChild(readButton);

//     blogcontainer.appendChild(blogbox);
//   }
// }

// for (const entry of Object.entries(obj)) {
//   const [key, value] = entry;
//   const blogbox = document.createElement("div");
//   blogbox.classList.add("box-1");
//   console.log(value);

//   const heading = document.createElement("h2");
//   heading.textContent = value.heading;
//   console.log(value.heading);

//   const paragraph = document.createElement("p");
//   paragraph.textContent = value.content;

//   const readButton = document.createElement("button");
//   readButton.classList.add("read-btn");
//   readButton.textContent = "Read";

//   blogbox.appendChild(heading);
//   blogbox.appendChild(paragraph);
//   blogbox.appendChild(readButton);

//   blogcontainer.appendChild(blogbox);
// }

// c = 1;
// for (key in obj) {
//   const blogbox = document.createElement("div");
//   blogbox.classList.add("box-1");
//   if (c == 1) {
//     var value = obj[key];

//     console.log(value);

//     const heading = document.createElement("h2");
//     heading.textContent = value;
//     console.log(value);

//     // const paragraph = document.createElement("p");
//     // paragraph.textContent = value.content;

//     const readButton = document.createElement("button");
//     readButton.classList.add("read-btn");
//     readButton.textContent = "Read";

//     blogbox.appendChild(heading);
//     // blogbox.appendChild(paragraph);
//     blogbox.appendChild(readButton);

//     // blogcontainer.appendChild(blogbox);
//   } else if (c == 2) {
//     const paragraph = document.createElement("p");
//     paragraph.textContent = value;
//     blogbox.appendChild(paragraph);
//   }

//   blogcontainer.appendChild(blogbox);
//   c++;
// }

// let c = 1; // Initialize c outside the loop
// for (const key in obj) {
//   const value = obj[key]; // Declare value inside the loop

//   const blogbox = document.createElement("div");
//   blogbox.classList.add("box-1");

//   if (c === 1) {
//     const heading = document.createElement("h2");
//     heading.textContent = value;
//     blogbox.appendChild(heading);
//   } else if (c === 2) {
//     const paragraph = document.createElement("p");
//     paragraph.textContent = value;
//     blogbox.appendChild(paragraph);
//   }

//   const readButton = document.createElement("button");
//   readButton.classList.add("read-btn");
//   readButton.textContent = "Read";
//   blogbox.appendChild(readButton);

//   blogcontainer.appendChild(blogbox);

//   // Update the value of c for the next iteration
//   c = c === 1 ? 2 : 1;
// }
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getDatabase,
  get,
  ref,
  set,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
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
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const storage = getStorage(app);

// function getPostData() {
//   const user_ref = ref(db, "post/");
//   get(user_ref).then((snapshot) => {
//     snapshot.forEach((childSnapshot) => {
//       const { title, post_Content, image_url } = childSnapshot.val();
//       console.log(title, post_Content, image_url);

//       let container = document.getElementById("blog-container");
//       let box = document.createElement("div");
//       box.classList.add("box-1");
//       container.appendChild(box);
//       box.innerHTML = `
//       <img src="${image_url}" alt="Post Image" />
//       <h2>${title.substring(0, 80) + "..."}</h2>
//       <p>${post_Content.substring(0, 350) + "...."}</p>
//       <button class="read-btn">Read</button>
//       `;
//     });
//   });
// }
// getPostData();
function getPostData() {
  const user_ref = ref(db, "post/");
  get(user_ref).then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const { title, postContent, imageURL } = childSnapshot.val();
      console.log(title, postContent, imageURL);

      let container = document.getElementById("blog-container");
      let box = document.createElement("div");
      box.classList.add("box-1");
      container.appendChild(box);
      box.innerHTML = `
        <div >
        <div id="mainBox"><img src="${imageURL}" alt="Post Image" /></div>
          <h2>${title.substring(0, 80)}</h2>
          <p>${postContent.substring(0, 350) + "..."}</p>
          <button class="read-btn">Read</button>
        </div>
      `;
    });
  });
}

getPostData();

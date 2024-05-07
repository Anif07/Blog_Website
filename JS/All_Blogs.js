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
// Define showBlog function in the global scope
// function showBlog() {
//   const para = document.getElementById("para");
//   console.log(para);
// }

// // Use event delegation to handle button clicks
// document.addEventListener("click", function (event) {
//   if (event.target && event.target.id === "read-btn") {
//     showBlog();
//   }
// });
// function getPostData() {
//   const user_ref = ref(db, "post/");
//   get(user_ref).then((snapshot) => {
//     snapshot.forEach((childSnapshot) => {
//       const { title, postContent, imageURL } = childSnapshot.val();
//       // console.log(title, postContent, imageURL);

//       let container = document.getElementById("blog-container");
//       let box = document.createElement("div");
//       box.classList.add("box-1");
//       container.appendChild(box);
//       box.innerHTML = `
//         <div >
//         <div id="mainBox"><img src="${imageURL}" alt="Post Image" /></div>
//           <h2>${title.substring(0, 80)}</h2>
//           <p id="para">${postContent.substring(0, 350) + "..."}</p>
//         </div>
//       `;
//       //<button id="read-btn">Read</button>
//       //<span class="more">${postContent.substring(350)}</span>
//       // function showBlog() {
//       //   console.log("showBlog");
//       // }
//     });
//   });
// }

// getPostData();

function getPostData() {
  const user_ref = ref(db, "post/");
  get(user_ref).then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const { title, postContent, imageURL } = childSnapshot.val();

      let container = document.getElementById("blog-container");
      let box = document.createElement("div");
      box.classList.add("box-1");
      container.appendChild(box);
      box.innerHTML = `
        <div>
          <div id="mainBox"><img src="${imageURL}" alt="Post Image" /></div>
          <h2>${title.substring(0, 80)}</h2>
          <p id="para">${postContent.substring(
            0,
            350
          )}<span class="more">${postContent.substring(350)}</span></p>
          <button class="read-btn">Read More</button>
        </div>
      `;

      // Hide content beyond the truncated part initially
      let moreContent = box.querySelector(".more");
      if (moreContent) {
        moreContent.style.display = "none";
      }

      // Add event listener to toggle display of additional content
      let readBtn = box.querySelector(".read-btn");
      if (readBtn) {
        readBtn.addEventListener("click", () => {
          if (moreContent.style.display === "none") {
            moreContent.style.display = "inline";
            readBtn.textContent = "Read Less";
          } else {
            moreContent.style.display = "none";
            readBtn.textContent = "Read More";
          }
        });
      }
    });
  });
}
getPostData();

// function getPostData() {
//   const user_ref = ref(db, "post/");
//   get(user_ref).then((snapshot) => {
//     snapshot.forEach((childSnapshot) => {
//       const { title, postContent, imageURL } = childSnapshot.val();
//       const postId = childSnapshot.key; // Get the post ID for deletion

//       let container = document.getElementById("blog-container");
//       let box = document.createElement("div");
//       box.classList.add("box-1");
//       container.appendChild(box);
//       box.innerHTML = `
//         <div>
//           <div id="mainBox"><img src="${imageURL}" alt="Post Image" /></div>
//           <h2>${title.substring(0, 80)}</h2>
//           <p id="para">${postContent.substring(
//             0,
//             350
//           )}<span class="more">${postContent.substring(350)}</span></p>
//           <button class="read-btn">Read More</button>
//           <button class="delete-btn">Delete</button>
//         </div>
//       `;

//       // Hide content beyond the truncated part initially
//       let moreContent = box.querySelector(".more");
//       if (moreContent) {
//         moreContent.style.display = "none";
//       }

//       // Add event listener to toggle display of additional content
//       let readBtn = box.querySelector(".read-btn");
//       if (readBtn) {
//         readBtn.addEventListener("click", () => {
//           if (moreContent.style.display === "none") {
//             moreContent.style.display = "inline";
//             readBtn.textContent = "Read Less";
//           } else {
//             moreContent.style.display = "none";
//             readBtn.textContent = "Read More";
//           }
//         });
//       }

//       // Add event listener to delete the post
//       let deleteBtn = box.querySelector(".delete-btn");
//       if (deleteBtn) {
//         deleteBtn.addEventListener("click", () => {
//           // Here, you can implement the code to delete the post using postId
//           // For example:
//           const postRef = ref(db, `post/${postId}`);
//           remove(postRef);
//           confirm("are you sure");
//           console.log("Delete button clicked for post with ID:", postId);
//         });
//       }
//     });
//   });
// }
// getPostData();

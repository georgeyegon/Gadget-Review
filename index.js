
fetch("https://gadget-review-k9wx.onrender.com/posts")
.then((data)=> data.json() )
.then((posts)=>{
  
  displayPosts(posts)
})

// loop thro the blog posts and append data to the frontend
function displayPosts(posts) {
    let cardsContainer = document.getElementById("cardsContainer")
    for(post of posts){
      cardsContainer.innerHTML += `
    <div class="bg-white md:p-4 md:m-2 border border-gray-200 rounded-lg shadow">
        <h5 class="text-center p-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${post.title}</h5>
        <div class="flex flex-col items-center md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="${post.image}" alt="">
          <div class="flex flex-col justify-between p-4 leading-normal">
              <p class="text-center mb-3 font-normal text-gray-700 dark:text-gray-400">${post.description}</p>
          </div>
        </div>
        <div class="text-2xl flex justify-around p-2">
          <i onclick="deletePost(${post.id})" class="fa fa-trash text-3xl text-red-700" aria-hidden="true"></i>
          <i onclick="editPost(${post.id})" class="fa fa-pencil-square-o text-3xl" aria-hidden="true"></i>
        </div>
    </div>
    `
    }
  }
  
// Function to create data 
document.getElementById("postForm").addEventListener("submit", (event)=>{
    event.preventDefault()
  
    const title = document.getElementById("title").value
    const image = document.getElementById("image").value
    const description = document.getElementById("description").value
    
    fetch("https://gadget-review.onrender.com/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
    },
      body: JSON.stringify({
        title: title,
        image: image,
        description: description, 
        views:0})
    })
    .then((data)=> data.json() )
    .then((res)=>{

      alert("post CREATED")
    })
})


// Function to edit data
function editPost(id) {
    fetch(`https://gadget-review.onrender.com/posts/${id}`)
    .then((data) => data.json())
    .then((post) => {
        const updateContainer = document.getElementById("updateContainer")
        updateContainer.innerHTML = `
        <h3 class="mt-6 font-medium flex justify-center items-center">Update Post</h3>
        <div class="grid container mx-auto mt-4">
            <div id="postForm" class="max-w-md p-2 md:p-2 mx-auto w-full">
                <div class="relative z-0 w-full mb-5 group">
                    <input type="text" id="titleUpdate" value="${post.title}" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Model</label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <input type="text" id="imageUpdate" value="${post.image}" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Image Link</label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <textarea type="text" id="descriptionUpdate" row="10" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required >
                  ${post.description}
                  </textarea>
                  <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Specifications</label>
                </div>

                <button onclick="updatePost(${id})" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
        </div>
    `

    })
}

// function to update data 
function updatePost(id)
{
    const title = document.getElementById("titleUpdate").value
    const image = document.getElementById("imageUpdate").value
    const description = document.getElementById("descriptionUpdate").value

    fetch(`https://gadget-review.onrender.com/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
    },
      body: JSON.stringify (
        {
            title: title,
            image: image,
            description: description})
    })
    .then((data)=> data.json() )
    .then((res)=>{

      alert("post UPDATED")

    })
}

//   Function to delete post
function deletePost(id)
{
  fetch(`https://gadget-review.onrender.com/posts/${id}`, {
    method: "DELETE"
  })
  .then((data)=> data.json() )
  .then((posts)=>{

    // displayPosts(posts)
    alert("post DELETED")

  })
}


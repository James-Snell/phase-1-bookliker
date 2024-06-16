document.addEventListener("DOMContentLoaded", function() { 
    //When the page loads, get a list of books from http://localhost:3000/books
    //and display their titles by creating a li for each book and adding
    //each li to the ul#list element.
    const currUser = {"id":1, "username":"Jimmy"}
     fetch('http://localhost:3000/books')
        .then(r => r.json())
        .then(books => {
            // console.log(books)
            //when a user clicks a title, display book
            //thumbnail, description, list of users who liked the book
            //this info should be displayed in the div #show-panel element 
            displayBook(books[0])

            books.forEach((book)=>{
                const ul = document.querySelector("#list")

                const li = document.createElement("li")
                li.textContent = book.title
                
                ul.append(li)

                li.addEventListener("click",()=>{
                    displayBook(book)
                })
            })
     })  


     function displayBook(book) {
        const panel = document.querySelector('#show-panel')
        panel.innerHTML = ""
          
        const image = document.createElement("img")
        const title = document.createElement("h1")
        const description = document.createElement("p")
        const h3 = document.createElement("h3")
        const likeButton = document.createElement("button")

        image.src = book.img_url
        title.textContent = book.title
        description.textContent = book.description
        h3.textContent = "Liked by: "
        likeButton.textContent = "Like"

        panel.append(image, title, description, h3)

        book.users.forEach((user)=> {
            const userHTML = document.createElement("p")
            userHTML.textContent = user.userName

            panel.append(userHTML)

        })
        panel.append(likeButton)

        likeButton.addEventListener("click", ()=>{
            book.users.push(currUser)
            console.log(book.users)
            fetch(`http://localhost:3000/books/${book.id}`,{
                method:"PATCH",
                headers:{
                    "Content-type": "application/JSON"
                },
                body:{
                    users: [...book.users,currUser]
                }
            })
            .then(r=>r.json())
            .then(book =>{
                displayBook(book)
            })
        })
    }
});

 
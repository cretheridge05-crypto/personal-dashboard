//app.js
let userInputForm = document.getElementById('userInputForm'); //declaring variable for the webpage

//creates a profile object for the user
function userProfile(){
    let profile = {};
    return function updateProfile(name, email, color){
        profile.name = name;
        profile.email = email;
        profile.color = color;

        document.getElementById('userName').textContent = profile.name;
        document.getElementById('userEmail').textContent = profile.email;
        document.getElementById('favColor').textContent = "Favorite color: " + profile.color;
    };
}

//updates user profile and checks validation
const updateProfile = userProfile();
userInputForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const color = document.getElementById("color").value;

    if (name === ""){
        alert("Please enter your name");
        return;
    }
    if (!email.includes("@")){
        alert("Please enter a valid email")
        return;
    }
    updateProfile(name, email, color);
});

//add each assignment to the to do list
const toDoListForm = document.getElementById("toDoListForm");
const taskList = document.getElementById("taskList");
let tasks = [];

toDoListForm.addEventListener("submit", function(event){
    event.preventDefault();
    let newTask = {
        priority: document.getElementById("priority").value,
        task: document.getElementById("task").value,
        class: document.getElementById("class").value
    };
    tasks.push(newTask);

    //JSON stringification and unstringification
    let tasksJSON = JSON.stringify(tasks);
    console.log(tasksJSON);
    let parsedTasks = JSON.parse(tasksJSON);
    console.log(parsedTasks);

    toDoList();
    toDoListForm.reset();
});

//dynamically displays each task on the to-do list
function toDoList(){
    taskList.innerHTML = "";
    tasks.forEach(function(item){
        taskList.innerHTML += "<li>" + item.priority + ": " + item.task + ", " + item.class + "</li>";
    });
}

//sorts by priority
document.getElementById("sortPriority").addEventListener("click", function(){
    tasks.sort(function(a,b){
        return a.priority-b.priority;
    });
    toDoList();
});

//filters only personal tasks
document.getElementById("personal").addEventListener("click", function(){
    const personalTasks = tasks.filter(item => item.class.toLowerCase() === "personal");
    taskList.innerHTML = "";
    personalTasks.forEach(function(item){
        taskList.innerHTML += "<li>" + item.priority + ": " + item.task + ", " + item.class + "</li>";
    });
});

//fetch and display all users
async function getUsers() {
    const display = document.getElementById("users");
    display.textContent = "Loading data..."; 
    //fetch users and displays them
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        //throws any errors
        if (!response.ok) {
            throw new Error("No results found");
        }

        //waits 1.5 seconds with a loading message then loads all users, including extra details
        const users = await response.json();
        await new Promise(resolve => setTimeout(resolve, 1500));
        display.innerHTML = "";
        users.forEach(user => {
            display.innerHTML += `
                <div class="user-card">
                    <p>${user.name}
                    <button class="details-button"
                            data-id="${user.id}">
                        See Details
                    </button>
                    </p>
                    <div id="details-${user.id}"
                         class="user-details"
                         hidden>
                        <p>Username: ${user.username}</p>
                        <p>City: ${user.address.city}</p>
                        <p>Phone: ${user.phone}</p>
                        <p>Website: ${user.website}</p>
                    </div>
                </div>
            `;
        });

    //catch any errors
    } catch (error) {
        console.error("No results found:", error);
        document.getElementById("users").textContent =
            "Unable to load user data.";
    }
}

// View All Users button
document.getElementById("viewAll")
    .addEventListener("click", getUsers);

//See/hide details buttons
document.getElementById("users")
    .addEventListener("click", function(event) {

        if (event.target.classList.contains("details-button")) {
            const userId = event.target.dataset.id;
            const details = document.getElementById(
                `details-${userId}`
            );

            //activates see/hide details
            details.hidden = !details.hidden;
            if (details.hidden) {
                event.target.textContent = "See Details";
            } else {
                event.target.textContent = "Hide Details";
            }
        }
    });


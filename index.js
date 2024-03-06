function createNewRow(name, grade) {
    let temp = document.createElement("tr");
    let temp2 = "";

    for (let i = 0; i < 2; i++) {
        if (i == 0) {
            temp2 = document.createElement("td");
            temp2.innerHTML = name;
            temp.appendChild(temp2);
        } else if (i == 1) {
            temp2 = document.createElement("td");
            temp2.innerHTML = grade;
            temp.appendChild(temp2);
        } 
        
    }

    return temp;
}

// document.querySelector("table").appendChild(createNewRow("Big", "G", "$1500"));

function getAll() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
    //   document.getElementById("demo").innerHTML = this.responseText;
        const value = JSON.parse(this.responseText);
        let text = '<tr><th>Name</th><th>Grade</th></tr>';
        document.querySelector("table").innerHTML = text;
        for (const x in value) {
            document.querySelector("table").appendChild(createNewRow(x, value[x]));
            // console.log(value[x]);
        }
    }
    xhttp.open("GET", "https://amhep.pythonanywhere.com/grades");
    xhttp.send();
}

function get() {
    let name = document.querySelectorAll("input")[0].value;
    document.querySelectorAll("input")[0].value = "";
    document.querySelectorAll("input")[1].value = "";

    const xhttp = new XMLHttpRequest();
    // Make another variable for when name has a space
    xhttp.onload = function() {
        if (this.status == 200) {
            const value = JSON.parse(this.responseText);
            document.querySelector("table").innerHTML = "";
            let text = '<tr><th>Name</th><th>Grade</th></tr>';
            document.querySelector("table").innerHTML = text;
            for (const x in value) {
                document.querySelector("table").appendChild(createNewRow(x, value[x]));
                // console.log(value[x]);
            }
        } else if(this.status == 404) {
            document.querySelector("table").innerHTML = "";
            let text = '<tr><th>Name</th><th>Grade</th></tr>';
            document.querySelector("table").innerHTML = text;
            let errorMessage = '<p style="color:red">Student does not exist</p>';
            document.querySelector("table").appendChild(errorMessage);
        }
        
        // for (const x in value) {
        //     document.querySelector("table").appendChild(createNewRow(x, value[x]));
        //     // console.log(value[x]);
        // }
    }
    
    xhttp.open("GET", "https://amhep.pythonanywhere.com/grades/" + encodeURIComponent(name));
    xhttp.send();
}

// function addStudent(name, grade) {
//     const xhttp = new XMLHttpRequest();
    

//     // xhttp.onload = function() {
//     //     // console.log(this.responseText);
//     //     // const value = JSON.parse(this.responseText);
//     //     // document.querySelector("table").appendChild(createNewRow(Object.keys(value), value[0]));
//     //     document.getElementById("demo").innerHTML = this.responseText;
//     //     // console.log("This is the new value " + document.querySelector("table").appendChild(createNewRow(Object.keys(value), value[0])));
//     // }
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//           document.getElementById("demo").innerHTML = this.responseText;
//         }
//       };

//     xhttp.open("POST", "https://amhep.pythonanywhere.com/grades");
//     xhttp.setRequestHeader("Content-Type", "application/json");
//     const body = {"name":name, "grade":grade};
//     xhttp.send(JSON.stringify(body));
// }
// function deleteTable() {
//     const myNode = document.getElementById("mainTable");
//     myNode.replaceChildren();
// }

function addStudent() {
    let name = document.querySelectorAll("input")[0].value;
    let grade = document.querySelectorAll("input")[1].value;
    document.querySelectorAll("input")[0].value = "";
    document.querySelectorAll("input")[1].value = "";

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // const value = JSON.parse(this.responseText);
            // console.log(value);
            document.querySelector("table").innerHTML = "";
            getAll();
        }
      };
    xhttp.open("POST", "https://amhep.pythonanywhere.com/grades");
    xhttp.setRequestHeader("Content-type", "application/json");
    const body = {"name":name, "grade":grade};
    xhttp.send(JSON.stringify(body));
  }

function updateStudent() {
    let name = document.querySelectorAll("input")[0].value;
    let grade = document.querySelectorAll("input")[1].value;
    document.querySelectorAll("input")[0].value = "";
    document.querySelectorAll("input")[1].value = "";

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // const value = JSON.parse(this.responseText);
            // console.log(value);
            document.querySelector("table").innerHTML = "";
            getAll();
        }
    };
    xhttp.open("PUT", "https://amhep.pythonanywhere.com/grades/" + encodeURIComponent(name));
    xhttp.setRequestHeader("Content-type", "application/json");
    // let value = JSON.parse(xhttp.responseText);
    // value.grade = grade;
    // xhttp.send(JSON.stringify(value));
    const body = {"name":name, "grade":grade};
    xhttp.send(JSON.stringify(body));
}

function deleteStudent() {
    let name = document.querySelectorAll("input")[0].value;
    document.querySelectorAll("input")[0].value = "";
    document.querySelectorAll("input")[1].value = "";

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.querySelector("table").innerHTML = "";
        getAll();
    };
    xhttp.open("DELETE", "https://amhep.pythonanywhere.com/grades/" + encodeURIComponent(name));
    xhttp.send();
}

// Dont forget to create the function that replaces all spaces in a name with %20

function searchStudent() {
    let name = document.querySelectorAll("input")[0].value;
    document.querySelectorAll("input")[0].value = "";
    document.querySelectorAll("input")[1].value = "";
    get(name);
}


getAll();

// Make a function that makes every name lowercase

// getAll();
// get("Bart");
// loadDoc("Tyler", 100);
// addStudent("Bart", "22");

// const xhttp = new XMLHttpRequest();
// xhttp.onload = function() {
// //   document.getElementById("demo").innerHTML = this.responseText;
//     const value = JSON.parse(this.responseText);
//     // console.log(value);
//     console.log(value);
    
// }

// xhttp.open("GET", "https://amhep.pythonanywhere.com/grades");
// xhttp.send();

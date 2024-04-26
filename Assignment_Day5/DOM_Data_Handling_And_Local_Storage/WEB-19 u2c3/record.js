// fill in javascript code here
const form = document.querySelector("form");
const tableBody = document.querySelector("tbody");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const employeeID = document.getElementById("employeeID").value;
  const department = document.getElementById("department").value;
  const experience = document.getElementById("exp").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mbl").value;

  let role;
  if (experience >= 5) {
    role = "Senior";
  } else if (experience >= 2 && experience < 5) {
    role = "Junior";
  } else {
    role = "Fresher";
  }

  const newRow = document.createElement("tr");
  newRow.innerHTML = `
      <td>${name}</td>
      <td>${employeeID}</td>
      <td>${department}</td>
      <td>${experience}</td>
      <td>${email}</td>
      <td>${mobile}</td>
      <td>${role}</td>
      <td><button>Delete</button></td>
    `;

  tableBody.appendChild(newRow);

  form.reset();
});

tableBody.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const rowToDelete = event.target.closest("tr");
    rowToDelete.remove();
  }
});

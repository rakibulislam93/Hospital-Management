// ************* USER Details ***************

const loadUserDetails = () => {
  const user_id = window.localStorage.getItem("user_id");
  console.log(user_id);
  fetch(`https://testing-8az5.onrender.com/users/${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayUserDetails(data);
    });
};
const displayUserDetails = (users) => {
  console.log(users);
  const parent = document.getElementById("userDetails-container");

  const div = document.createElement("div");
  div.classList.add("information-container");

  div.innerHTML = `
            <img class="doc-img" src="./Images/man-1.jpg" alt="">
            <div class="user-info">
                <h5>${users.username}</h5>
                <h5>${users.first_name}${users.last_name}</h5>
                <h5>${users.email}</h5>
                
            </div>
        `;
  parent.appendChild(div);
};

// *************** Load all Apointment ****************

const loadAppointment = () => {
  const patient_id = localStorage.getItem("patient_id");
  fetch(
    `https://testing-8az5.onrender.com/appointment/?patient_id=${patient_id}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayAppointment(data);
    });
};

const displayAppointment = (appointment) => {
  appointment.forEach(element => {

    const parent = document.getElementById("table-info");
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${element.id}</td>
             
    <td>${element.appointment_type}</td>
    <td>${element.appointment_status}</td>
    
    <td>${element.symptom}</td>
    <td>${element.time}</td>
    ${
        element.appointment_status == "Pending"
        ? `<td class="text-danger">X</td>`
        : `<td>X</td>`
    }
    <td>1000 BDT</td>

    <td>
    <button class="btn btn-danger btn-sm">Delete</button>
    </td>
    
    `;
    parent.appendChild(tr)
    
  });
};

loadAppointment();
loadUserDetails();

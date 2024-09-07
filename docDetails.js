
const getParams=()=>{
    const param = new URLSearchParams(window.location.search).get("doctorId")
    DoctorTimeLoad(param)
    
    fetch(`https://testing-8az5.onrender.com/doctor/list/${param}`)
    .then(res=>res.json())
    .then(data=>displayDetails(data))


    fetch(`https://testing-8az5.onrender.com/doctor/review/?doctor_id=${param}`)
    .then(res=>res.json())
    .then(data=>displayDoctorReview(data))
}
const displayDetails = (detail) => {
    console.log(detail);
    
    // Assuming `detail` is an object and not an array:
    const parent = document.getElementById("doctor-details");
    const div = document.createElement("div");
    div.classList.add("details-card");

    // Set the inner HTML with dynamic data from the `detail` object
    div.innerHTML = `
        <div>
        <img class="doc-img" src="${detail.image}" alt="Doctor Image">
        </div>
        <div class="image-text">
            <h5>${detail.full_name}</h5>
            ${detail.specialization.map((item)=>{
                return `<button class="btn btn-secondary mt-2">${item}</button>`
            })}
            <h5 class="mt-2">${detail.designation}</h5>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <p><b>Fee : ${detail.fee} BDT </b> <p>
            <p><b>Meet link :</b><a> ${detail.meet_link} </a></p>
            

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Take Appointment
            </button>
            
        </div>
    `;

    // Append the new div to the parent
    parent.appendChild(div);
};
  
const displayDoctorReview = (reviews) => {
    reviews.forEach((review) => {
      const parent = document.getElementById("doc-details-review");
      const div = document.createElement("div");
      div.classList.add("review-card");
      div.innerHTML = `
          <img src="./Images/girl.png" alt="" />
              <h4>${review.reviewer}</h4>
              <p>
               ${review.body.slice(0, 100)}
              </p>
              <h6>${review.rating}</h6>
          `;
      parent.appendChild(div);
    });
  };

// ############# Doctor er time load korchi ########################
const DoctorTimeLoad =(id)=>{
    fetch(`https://testing-8az5.onrender.com/doctor/availabletime/?doctor_id=${id}`)
    .then(res=>res.json())
    .then(data=>displayDoctorTime(data))
}
const displayDoctorTime = (times)=>{
   times.forEach(element => {

    const parent = document.getElementById("doctor-time")
    const option = document.createElement("option")
    option.value = element.id
    option.innerText = element.name
    parent.appendChild(option)

   });
}

// ############### Handle Appointment ###########

const handleAppointment =()=>{

    const param = new URLSearchParams(window.location.search).get("doctorId")

    const status = document.querySelector('input[name="status"]:checked').value;
    const symtomp = document.getElementById("symtopm-text").value
    const Time = document.getElementById("doctor-time")
    const selectTime = Time.options[Time.selectedIndex].value

    console.log(status)
    console.log(symtomp)
    console.log(selectTime)

    const patient_id = localStorage.getItem("patient_id")

    const info ={
        appointment_type:status,
        appointment_status: "Pending",
        symptom: symtomp,
        cancel: false,
        patient: patient_id,
        doctor: param,
        time: selectTime
    }
    console.log(info)

    fetch("https://testing-8az5.onrender.com/appointment/",{
        method : "POST",
        headers : {"content-type" : "application/json"},
        body : JSON.stringify(info),
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        window.location.href=`pdf.html?doctorId=${param}`
    })
}

const loadPatientId=()=>{
    const user_id = localStorage.getItem("user_id")
    fetch(`https://testing-8az5.onrender.com/patient/list/?${user_id}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        localStorage.setItem("patient_id",data[0].id)
    })
}



loadPatientId()
getParams()
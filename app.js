// ###### Service Api load #########
const loadServices = () =>{
    fetch("https:testing-8az5.onrender.com/services/")
    .then(res=>res.json())
    .then(data=>displayServices(data))
}

const displayServices = (service) =>{
    service.forEach(element => {
        // console.log(element.name)
        const parent = document.getElementById("service-container")
        const li = document.createElement("li")
        li.innerHTML = `
        <div class="card shadow h-100">
                <div class="ratio ratio-16x9">
                <img class="service-img" src="${element.image}" class="card-img-top" loading="lazy" alt="...">
                </div>
                <div class="card-body p-3 p-xl-5">
                <h3 class="card-title">${element.name}</h3>
                <p>${element.description.slice(0,100)}</p>
                
                <div><a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
                </div>
        </div>
        `
        parent.appendChild(li);
    });
}

// ************** Load Doctor ************
const loadDoctors = (search) =>{
    document.getElementById("doctors").innerHTML=""
    document.getElementById("lodding").style.display = "block"
    
    console.log(search)
    fetch(`https://testing-8az5.onrender.com/doctor/list/?search=${search?search:""}`)
    .then(res=>res.json())
    .then(data=>{

        if(data.results.length>0){
            document.getElementById("lodding").style.display = "none"
            document.getElementById("nodata").style.display="none"
            displayDoctors(data.results)
        }
        else{
            document.getElementById("lodding").style.display = "none"
            document.getElementById("doctors").innerHTML=""
            document.getElementById("nodata").style.display="block"
        }

    })
        
    

}
const displayDoctors = (doctor)=>{
    console.log(doctor)  
    doctor.forEach(element => {
        const parent = document.getElementById("doctors")
        const div = document.createElement("div")
        div.classList.add("doc-card")
        div.innerHTML = `
            <img class="doc-img" src="${element.image}" alt="">
            <h5>${element.full_name}</h5>
            <h6>${element.designation}</h6>
        
            ${element.specialization.map((item)=>{
                return `<button class="btn btn-secondary  mt-2">${item}</button>`
            })}
            <p><a href="docDetails.html?doctorId=${element.id}"target="_blank"><button class="btn btn-primary mt-4">Details</button></a></p>
            `
        parent.appendChild(div)
    });
}
// **********Load doctor designation ************
const loadDesignation = () =>{
    fetch("https://testing-8az5.onrender.com/doctor/designation/")
    .then(res=>res.json())
    .then(data=>displayDesignation(data))
}
const displayDesignation =(designation)=>{
    designation.forEach(element=>{
        const parent = document.getElementById("des-dropdown")
        console.log(parent)
        const li = document.createElement("li")
        li.classList.add("dropdown-item")
        li.innerHTML=`
        <li onclick="loadDoctors('${element.name}')">${element.name}</li>
        `
        parent.appendChild(li)
    })

}
// ********* Load Specialization **********
const loadSpecialization=()=>{
    fetch("https://testing-8az5.onrender.com/doctor/specialization/")
    .then(res=>res.json())
    .then(data=>displaySpecialization(data))
}
const displaySpecialization=(specialization)=>{
    specialization.forEach(element=>{
        const parent = document.getElementById("spe-dropdown")
        console.log(parent)
        const li = document.createElement("li")
        li.classList.add("dropdown-item")
        li.innerHTML=`
        <li onclick="loadDoctors('${element.name}')">${element.name}</li>
        `
        parent.appendChild(li)
    })
}
// ************* handle Search ********
const handleSearch =()=>{
    const value = document.getElementById("search-box ").value
    loadDoctors(value)
    document.getElementById("search-box ").value = ""
}

// *************** Doctor Reviews Load ************
const loadReview = () => {
    fetch("https://testing-8az5.onrender.com/doctor/review/")
      .then((res) => res.json())
      .then((data) => displayReview(data));
  };
  
  const displayReview = (reviews) => {
    reviews.forEach((review) => {
      const parent = document.getElementById("review-container");
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
loadReview()
loadSpecialization()
loadDesignation()
loadDoctors()
loadServices()

const handlePdf=()=>{
    const doctor_id = new URLSearchParams(window.location.search).get("doctorId")
    const user_id = localStorage.getItem("user_id")

    console.log(doctor_id)
    console.log(user_id)

    fetch(`https://testing-8az5.onrender.com/doctor/list/${doctor_id}`)
    .then(res=>res.json())
    .then(data=>{
        fetch(`https://testing-8az5.onrender.com/users/${user_id}`)
        .then(res=>res.json())
        .then(pdData=>{
            const newData = [data,pdData]
            console.log(newData)
            console.log(data)

            const parent = document.getElementById("pdf-container")
            const div = document.createElement("div")
            div.innerHTML = `

            <div class="d-flex">
                <div class="patient-info">
                    <p>${pdData.username}</p>
                    <p>${pdData.first_name}</p>
                    <p class="w-50%">${pdData.email}</p>
                    
                </div>
                <div class="doctor-info">
                    <img class="pdf-image" src="${data.image}">
                    <p>${newData[0].full_name}</p>
                    <p>${data.id}</p>
                    
                </div>
            </div>
            <div class="symtomp-text">
            <p>aikhane rugir symtomp lekha thakbe
            </div>
            <h4 class="text-center mt-5">Fees : 1200 BDT</h4>

            `
            parent.appendChild(div)
            
        })
    })

}

const downloadPdf=()=>{
    var element= document.getElementById("pdf-container")
    
    html2pdf()
    .from(element)
    .save()
}


handlePdf()
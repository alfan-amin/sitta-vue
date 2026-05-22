function login(event){
    event.preventDefault();

    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;

    if(username === "" || password === ""){
        alert("Username dan password wajib diisi!");
        return;
    }

    if(username === "admin" && password === "suadmin123"){

        let userLogin = {
            nama: "Admin SITTA",
            username: "admin",
            role: "Administrator"
        };

        localStorage.setItem("userLogin", JSON.stringify(userLogin));

        alert("Login berhasil. Selamat datang Admin SITTA");

        window.location.href = "dashboard.html";

    }else{
        alert("username/password yang anda masukkan salah");
    }
}

function cekLogin(){
    let halamanAplikasi = document.querySelector(".wrapper");

    if(halamanAplikasi){
        let userLogin = localStorage.getItem("userLogin");

        if(!userLogin){
            window.location.href = "index.html";
        }
    }
}

cekLogin();

let namaUser = document.getElementById("namaUser");

if(namaUser){
    let userLogin = localStorage.getItem("userLogin");

    if(userLogin){
        let user = JSON.parse(userLogin);
        namaUser.innerHTML = user.nama;
    }
}

function logout(){
    localStorage.removeItem("userLogin");
    window.location.href = "index.html";
}

function openModal(id){
    document.getElementById(id).style.display = "flex";
}

function closeModal(id){
    document.getElementById(id).style.display = "none";
}

let greeting = document.getElementById("greeting");

if(greeting){
    let jam = new Date().getHours();

    if(jam >= 5 && jam < 12){
        greeting.innerHTML = "Selamat Pagi ☀️";
    }else if(jam >= 12 && jam < 15){
        greeting.innerHTML = "Selamat Siang 🌤️";
    }else if(jam >= 15 && jam < 18){
        greeting.innerHTML = "Selamat Sore 🌇";
    }else{
        greeting.innerHTML = "Selamat Malam 🌙";
    }
}

function toggleSidebar(){
    let sidebar = document.getElementById("sidebar");
    let main = document.querySelector(".main");

    if(sidebar && main){
        sidebar.classList.toggle("close");
        main.classList.toggle("full");
    }
}

function toggleFullscreen(){
    if(!document.fullscreenElement){
        document.documentElement.requestFullscreen();
    }else{
        document.exitFullscreen();
    }
}

function toggleDropdown(){
    let dropdown = document.getElementById("dropdownMenu");

    if(dropdown){
        if(dropdown.style.display === "block"){
            dropdown.style.display = "none";
        }else{
            dropdown.style.display = "block";
        }
    }
}

function toggleLaporan(event){
    event.preventDefault();

    let submenu = document.getElementById("submenuLaporan");
    let icon = document.getElementById("iconLaporan");

    if(submenu){
        if(submenu.style.display === "block"){
            submenu.style.display = "none";

            if(icon){
                icon.style.transform = "rotate(0deg)";
            }
        }else{
            submenu.style.display = "block";

            if(icon){
                icon.style.transform = "rotate(180deg)";
            }
        }
    }
}

window.onclick = function(event){
    if(!event.target.closest(".user-menu")){
        let dropdown = document.getElementById("dropdownMenu");

        if(dropdown){
            dropdown.style.display = "none";
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {

    // Mobile Menu
    const menu = document.querySelector(".navbar");
    const menuBtn = document.getElementById("menuToggle");

    if(menuBtn){
        menuBtn.onclick = () => menu.classList.toggle("open");
    }

    // Dark / Light Mode
    const themeBtn = document.getElementById("themeToggle");

    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark");
    }

    if(themeBtn){
        themeBtn.onclick = () => {
            document.body.classList.toggle("dark");
            localStorage.setItem(
                "theme",
                document.body.classList.contains("dark") ? "dark" : "light"
            );
        };
    }

    // Back To Top
    const topBtn = document.getElementById("backToTop");

    if(topBtn){
        window.onscroll = () => {
            topBtn.style.display = scrollY > 300 ? "block" : "none";
        };

        topBtn.onclick = () =>
            window.scrollTo({top:0, behavior:"smooth"});
    }

    // Counters
    document.querySelectorAll(".counter").forEach(counter => {
        let target = +counter.dataset.target;
        let n = 0;

        let timer = setInterval(() => {
            n++;
            counter.textContent = n + "+";

            if(n >= target) clearInterval(timer);
        }, 30);
    });

    // Contact Form
    const form = document.getElementById("contactForm");

    if(form){
        form.onsubmit = e => {
            e.preventDefault();

            let valid = true;

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const message = document.getElementById("message").value.trim();

            document.querySelectorAll("small").forEach(x => x.textContent="");

            if(!name){
                nameError.textContent = "Name is required";
                valid = false;
            }

            if(!/^\S+@\S+\.\S+$/.test(email)){
                emailError.textContent = "Valid email required";
                valid = false;
            }

            if(!/^[0-9]{10}$/.test(phone)){
                phoneError.textContent = "Enter 10 digit phone";
                valid = false;
            }

            if(!message){
                messageError.textContent = "Message is required";
                valid = false;
            }

            if(valid){
                formSuccess.textContent = "Message sent successfully!";
                form.reset();
            }
        };
    }

    // Project Filter
    const filters = document.querySelectorAll("[data-filter]");
    const projects = document.querySelectorAll(".filter-item");

    filters.forEach(btn => {
        btn.onclick = () => {
            let filter = btn.dataset.filter;

            projects.forEach(project => {
                project.style.display =
                    filter === "all" || project.dataset.category === filter
                    ? "block" : "none";
            });
        };
    });

});
/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

});


/* Close mobile menu when a link is clicked */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

    });

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const currentId = entry.target.id;

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        `#${currentId}`
                    ) {

                        link.classList.add("active");

                    }

                });

            }

        });

    },

    {
        threshold: 0.35
    }

);

sections.forEach(section => {

    observer.observe(section);

});


/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =====================================================
   CONTACT FORM
===================================================== */

/* =====================================================
CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");

contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const organisation =
        document.getElementById("organisation").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (!name || !email || !message) {

        formMessage.textContent =
            "Please fill in all required fields.";

        return;

    }


    formMessage.textContent =
        "Sending...";


    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("organisation", organisation);
    formData.append("message", message);


    try {

        const response = await fetch(
            "http://localhost/arivu_backend/contact.php",
            {
                method: "POST",
                body: formData
            }
        );


        const result = await response.text();


        if (response.ok) {

            formMessage.textContent = result;

            contactForm.reset();

        } else {

            formMessage.textContent =
                "Something went wrong. Please try again.";

        }


    } catch (error) {

        formMessage.textContent =
            "Unable to connect to the server.";

        console.error(error);

    }

});


/* =====================================================
   SCROLL ANIMATION
===================================================== */

const animatedElements =
    document.querySelectorAll(
        ".impact-card, .meaning-card, .belief-card, .collaboration-card"
    );


const animationObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {
            threshold: 0.15
        }

    );


animatedElements.forEach(element => {

    element.classList.add("animate-on-scroll");

    animationObserver.observe(element);

});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    AOS.init();
    
    function animateSkills() {
        document.querySelectorAll(".skill-progress").forEach(skill => {
            let skillValue = skill.getAttribute("data-skill");
            skill.style.width = skillValue + "%";
        });
    }

    // Trigger animation when the skills section is in view
    let skillsSection = document.getElementById("skills");
    let observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            animateSkills();
        }
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
});

window.onscroll = function () {
    let scrollBtn = document.getElementById("scroll-top-btn");
    if (document.documentElement.scrollTop > 200) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Initialize AOS animations
document.addEventListener("DOMContentLoaded", function () {
    AOS.init();
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const successMessage = document.createElement("p"); 
    successMessage.style.display = "none"; 
    successMessage.style.color = "green"; 
    successMessage.style.fontWeight = "bold";
    successMessage.style.marginTop = "10px";
    form.appendChild(successMessage); 

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                successMessage.textContent = "✅ Message sent successfully!";
                successMessage.style.display = "block"; 

                form.reset(); // Clear form

                // Hide the message after 3 seconds
                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 3000);
            } else {
                successMessage.textContent = "❌ Something went wrong. Please try again.";
                successMessage.style.color = "red";
                successMessage.style.display = "block";
            }
        } catch (error) {
            successMessage.textContent = "❌ Error: " + error.message;
            successMessage.style.color = "red";
            successMessage.style.display = "block";
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    var typed = new Typed("#typing-text", {
        strings: ["Software Developer", "Data Science Enthusiast"],
        typeSpeed: 80,
        backSpeed: 50,
        loop: true
    });
});
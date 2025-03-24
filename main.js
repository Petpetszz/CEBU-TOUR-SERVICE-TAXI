document.addEventListener("DOMContentLoaded", function () {
    // Carousel Configuration
    var carousel = document.querySelector("#heroCarousel");
    if (carousel) {
        new bootstrap.Carousel(carousel, {
            interval: 2000, // Adjust speed (milliseconds)
            ride: "carousel",
            pause: false, // Prevents pausing on hover
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const announcements = [
        "🚖 Welcome to Cebu Tour Service Taxi! Book your ride now!",
        "🌴 Explore Cebu with our affordable tour packages!",
        "📞 Contact us for inquiries and bookings!"
    ];

    let index = 0; // Start with the first announcement
    const announcementText = document.getElementById("announcementText");
    const speed = 50; // Typing speed in milliseconds
    const delayBetweenAnnouncements = 2000; // Delay before next announcement starts

    function typeWriter(message, charIndex = 0) {
        if (charIndex < message.length) {
            announcementText.textContent += message.charAt(charIndex);
            setTimeout(() => typeWriter(message, charIndex + 1), speed);
        } else {
            setTimeout(nextAnnouncement, delayBetweenAnnouncements);
        }
    }

    function nextAnnouncement() {
        index = (index + 1) % announcements.length; // Loop back when reaching the end
        announcementText.textContent = ""; // Clear text before typing the next message
        typeWriter(announcements[index]);
    }

    // Start the first announcement
    typeWriter(announcements[index]);
});

window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) { 
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});






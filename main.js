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

// Navbar Shrink
window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) { 
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});

// Testimonials
document.addEventListener("DOMContentLoaded", function () {
    let carousel = new bootstrap.Carousel(document.getElementById("testimonialCarousel"), {
        interval: 4000, // Auto-slide every 4 seconds
        wrap: true
    });
});

// Load More Testimonials

document.addEventListener("DOMContentLoaded", function() {
    const testimonials = document.querySelectorAll(".testimonial-card");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    let visibleCount = 4; // Show initial 4 testimonials
  
    // Hide all testimonials except the first 4
    testimonials.forEach((testimonial, index) => {
      if (index >= visibleCount) {
        testimonial.style.display = "none";
      }
    });
  
    // Load More functionality
    loadMoreBtn.addEventListener("click", function() {
      const hiddenTestimonials = Array.from(testimonials).filter(
        (testimonial) => testimonial.style.display === "none"
      );
  
      // Show next 4 hidden testimonials
      hiddenTestimonials.slice(0, 4).forEach((testimonial) => {
        testimonial.style.display = "flex";
      });
  
      // Hide button if all testimonials are visible
      if (hiddenTestimonials.length <= 4) {
        loadMoreBtn.style.display = "none";
      }
    });
  });

// floating contact   
  document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.toggle-button');
    const contactOptions = document.querySelector('.contact-options');
    const chatIcon = toggleButton.querySelector('.fa-comment-dots');
    const closeIcon = toggleButton.querySelector('.fa-times');
    
    toggleButton.addEventListener('click', function() {
        contactOptions.classList.toggle('show');
        
        // Toggle icons
        if (contactOptions.classList.contains('show')) {
            chatIcon.style.display = 'none';
            closeIcon.style.display = 'block';
            toggleButton.style.backgroundColor = '#dc3545'; // Red when open
        } else {
            chatIcon.style.display = 'block';
            closeIcon.style.display = 'none';
            toggleButton.style.backgroundColor = '#6c757d'; // Gray when closed
        }
    });
});
  
  







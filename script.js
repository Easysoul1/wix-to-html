// Mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const closeMenuBtn = document.querySelector(".close-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-content a");

  // Open mobile menu
  mobileMenuBtn.addEventListener("click", function () {
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
  });

  // Close mobile menu
  closeMenuBtn.addEventListener("click", function () {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  });

  // Close menu when clicking on a link
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    });
  });

  // Initialize phone input
  const phoneInputField = document.querySelector("#phone");
  if (phoneInputField) {
    const phoneInput = window.intlTelInput(phoneInputField, {
      preferredCountries: ["us", "gb", "ca"],
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
      separateDialCode: true,
      formatOnDisplay: true,
      initialCountry: "auto",
      geoIpLookup: function (callback) {
        fetch("https://ipapi.co/json")
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            callback(data.country_code);
          })
          .catch(function () {
            callback("us");
          });
      },
    });

    // Add validation on form submit
    const form = phoneInputField.closest("form");
    if (form) {
      form.addEventListener("submit", function (e) {
        if (!phoneInput.isValidNumber()) {
          e.preventDefault();
          alert("Please enter a valid phone number.");
        }
      });
    }

    // Store the instance
    window.phoneInput = phoneInput;
  }
  document.addEventListener("DOMContentLoaded", function () {
    const mobileNavItem = document.querySelector(".mobile-nav-item");
    const servicesLink = mobileNavItem.querySelector("a");

    servicesLink.addEventListener("click", function (e) {
      e.preventDefault();
      mobileNavItem.classList.toggle("active");
    });
  });
  // Services dropdown toggle
//   const servicesToggle = document.querySelector(".services-toggle");
//   if (servicesToggle) {
//     servicesToggle.addEventListener("click", function (e) {
//       e.preventDefault();
//       const mobileNavItem = this.closest(".mobile-nav-item");
//       mobileNavItem.classList.toggle("active");
//     });
//  }
  const dropdownTrigger = document.querySelector(".dropdown-trigger");
  if (dropdownTrigger) {
    dropdownTrigger.addEventListener("click", function (e) {
      e.preventDefault(); // prevent anything unwanted
      const mobileNavItem = this.closest(".mobile-nav-item");
      mobileNavItem.classList.toggle("active");
    });
  }
});

const testimonials = document.querySelectorAll(".testimonial-content");
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");
let currentIndex = 0;

function showTestimonial(nextIndex, direction = "right") {
  const current = testimonials[currentIndex];
  const next = testimonials[nextIndex];

  // Remove existing "active" from current
  current.classList.remove("active");

  // Add exit class
  current.classList.add(
    direction === "right" ? "exiting-left" : "exiting-right"
  );

  // After transition, clean up
  setTimeout(() => {
    current.classList.remove("exiting-left", "exiting-right");
    current.style.display = "none"; // hide the old one
  }, 1000); // should match CSS transition time

  // Prepare next
  next.style.display = "block"; // make it visible so transition works
  requestAnimationFrame(() => {
    next.classList.add("active"); // trigger transition
  });

  currentIndex = nextIndex;
}

leftArrow.addEventListener("click", () => {
  const nextIndex =
    (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(nextIndex, "left");
});

rightArrow.addEventListener("click", () => {
  const nextIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(nextIndex, "right");
});

// Initialize the first testimonial
testimonials[currentIndex].style.display = "block";
testimonials[currentIndex].classList.add("active");

// Phone input initialization
document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.querySelector("#phone");
  if (phoneInput) {
    const iti = window.intlTelInput(phoneInput, {
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
      separateDialCode: true,
      initialCountry: "auto",
      geoIpLookup: function (callback) {
        fetch("https://ipapi.co/json")
          .then((res) => res.json())
          .then((data) => callback(data.country_code))
          .catch(() => callback("us"));
      },
    });

    // Store iti instance on the input
    phoneInput._iti = iti;
  }
});

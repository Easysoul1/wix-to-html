// scroll-animations.js
document.addEventListener("DOMContentLoaded", () => {
  const animatedItems = document.querySelectorAll(".scroll-animate");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    animatedItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;

      if (itemTop < triggerBottom) {
        item.classList.add("show");
      } else {
        item.classList.remove("show"); // Optional: remove if you want animation once
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger on page load
});

document.addEventListener("DOMContentLoaded", () => {
  const serviceItems = document.querySelectorAll(".service-item");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    serviceItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;

      if (itemTop < triggerBottom) {
        item.classList.add("animate");
      } else {
        item.classList.remove("animate"); // Remove this line if you only want the animation to happen once
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger on load
});

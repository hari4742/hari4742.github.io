var body = document.getElementsByTagName("body")[0];
body.style.display = "none";
window.onload = function () {
  body.style.display = "block";
};

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      var circles = document.getElementsByClassName("circle");
      // console.log(entry);
      for (let circle of circles) {
        if (entry.isIntersecting) {
          circle.style.animation = "fill 2s linear forwards";
        } else {
          circle.style.animation = "none";
        }
      }
    });
  },
  { threshold: 0.25 }
);

let skills = document.querySelector(".skills");
observer.observe(skills);

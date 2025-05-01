const circle = document.querySelector("circle");
const computedStyle = window.getComputedStyle(circle);

function getResponsiveStretch() {
  return window.innerWidth * 0.09;
}

var swiper = new Swiper(".mySwiper", {
  simulateTouch: false,
  on: {
    slideChange: function () {
      $(".swiper-slide").off("mousemove mouseenter mouseleave");
      $(".swiper-button-prev").css("opacity", "0");
      $(".swiper-button-next").css("opacity", "0");
      $(".swiper-slide-prev").removeClass("prevSlideMoveLeft");
      $(".swiper-slide-prev").removeClass("prevSlideMoveRight");
      $(".swiper-slide-next").removeClass("nextSlideMoveLeft");
      $(".swiper-slide-next").removeClass("nextSlideMoveRight");

      $(".swiper-slide").on("mousemove", function (event) {
        var mouseX = event.pageX;
        var mouseY = event.pageY;

        if ($(this).hasClass("swiper-slide-prev")) {
          $(".swiper-button-prev").css({
            opacity: "1",
            left: mouseX - 12 + "px",
            top: mouseY + 20 + "px",
          });
        } else if ($(this).hasClass("swiper-slide-next")) {
          $(".swiper-button-next").css({
            opacity: "1",
            left: mouseX + 12 + "px",
            top: mouseY + 20 + "px",
          });
        }
      });

      $(".swiper-slide").on("mouseenter", function () {
        if ($(this).hasClass("swiper-slide-prev")) {
          $(".swiper-button-prev").css("opacity", "1");
          $(".swiper-slide-prev").addClass("prevSlideMoveRight");
          $(".swiper-slide-prev").removeClass("prevSlideMoveLeft");
        } else if ($(this).hasClass("swiper-slide-active")) {
          $(".swiper-button-prev").css("opacity", "0");
          $(".swiper-button-next").css("opacity", "0");
        } else if ($(this).hasClass("swiper-slide-next")) {
          $(".swiper-button-next").css("opacity", "1");
          $(".swiper-slide-next").addClass("nextSlideMoveLeft");
          $(".swiper-slide-next").removeClass("nextSlideMoveRight");
        }
      });

      $(".swiper-slide").on("mouseleave", function () {
        if ($(this).hasClass("swiper-slide-prev")) {
          $(".swiper-button-prev").css("opacity", "0");
          $(".swiper-slide-prev").addClass("prevSlideMoveLeft");
          $(".swiper-slide-prev").removeClass("prevSlideMoveRight");
        } else if ($(this).hasClass("swiper-slide-next")) {
          $(".swiper-button-next").css("opacity", "0");
          $(".swiper-slide-next").removeClass("nextSlideMoveLeft");
          $(".swiper-slide-next").addClass("nextSlideMoveRight");
        }
      });

      $(".swiper-slide").on("click", function () {
        $(".swiper-button-prev").css("opacity", "0");
        $(".swiper-button-next").css("opacity", "0");
        $(".swiper-slide-prev").removeClass("prevSlideMoveLeft");
        $(".swiper-slide-prev").removeClass("prevSlideMoveRight");
        $(".swiper-slide-next").removeClass("nextSlideMoveLeft");
        $(".swiper-slide-next").removeClass("nextSlideMoveRight");

        if ($(this).hasClass("swiper-slide-prev")) {
          swiper.slidePrev();
          $(".swiper-button-prev").addClass("animate");

          setTimeout(() => {
            $(".swiper-button-prev").removeClass("animate");
          }, 800);

          const remainingDuration = parseFloat(
            computedStyle.getPropertyValue("animation-duration")
          );
          // Speed up the current animation to 2x faster
          circle.style.animation = `erase ${
            remainingDuration / 7
          }s linear infinite`;

          // After the speed-up finishes, reset to normal behavior
          setTimeout(() => {
            circle.style.animation = "drawAndErase 5s linear infinite"; // Reset to normal after speeding up
            isSpeedUpActive = false;
          }, (remainingDuration / 7) * 1000); // Use half of the remaining time
        } else if ($(this).hasClass("swiper-slide-next")) {
          swiper.slideNext();
          $(".swiper-button-next").addClass("animate");

          setTimeout(() => {
            $(".swiper-button-next").removeClass("animate");
          }, 800);

          const remainingDuration = parseFloat(
            computedStyle.getPropertyValue("animation-duration")
          );
          // Speed up the current animation to 2x faster
          circle.style.animation = `erase ${
            remainingDuration / 7
          }s linear infinite`;

          // After the speed-up finishes, reset to normal behavior
          setTimeout(() => {
            circle.style.animation = "drawAndErase 5s linear infinite"; // Reset to normal after speeding up
            isSpeedUpActive = false;
          }, (remainingDuration / 7) * 1000); // Use half of the remaining time
        }
      });
    },
    resize: function () {
      swiper.params.coverflowEffect.stretch = -getResponsiveStretch();
      swiper.update();
    },
  },
  effect: "coverflow",
  slidesPerView: 3,
  grabCursor: true,
  centeredSlides: true,
  coverflowEffect: {
    rotate: 90,
    stretch: -getResponsiveStretch(),
    depth: 0,
    modifier: 1,
    slideShadows: true,
  },
  autoplay: {
    delay: 4100,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  speed: 1000,
  loop: true,
  breakpoints: {
    320: {
      effect: "slide",
      slidesPerView: "1.1",
      spaceBetween: 30,
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    },
    640: {
      pagination: false,
    },
  },
});

const circleDiv = document.querySelector(".cursor");

let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;
let targetX = currentX;
let targetY = currentY;

// Function to smoothly follow the mouse
function followMouse() {
  const speed = 0.1;
  currentX += (targetX - currentX) * speed;
  currentY += (targetY - currentY) * speed;
  circleDiv.style.transform = `translate(${currentX}px, ${currentY}px)`;
  requestAnimationFrame(followMouse);
}

document.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

followMouse();

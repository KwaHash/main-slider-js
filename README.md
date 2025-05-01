## Swiper Carousel with Interactive Cursor and Animation Control
This project implements a feature-rich Swiper carousel with custom navigation behavior, a smooth-following cursor, and dynamic animation control using JavaScript and CSS.

### Swiper Carousel
* Effect: Coverflow with rotation and dynamic stretch.
* Autoplay: Enabled with a 4.1s delay.
* Slides per view: 3 (adjusts to 1.1 on smaller screens).
* Centered slides: Enabled.
* Looping: Enabled.
* Touch simulation: Disabled to allow only programmatic or UI navigation.
* Responsive: Dynamically updates the stretch value on window resize.

### Custom Cursor Animation
* A circular cursor element follows the mouse pointer smoothly.
* Uses requestAnimationFrame for high-performance animation.
* Cursor movement is based on easing between the current and target positions.

### Navigation Button Interactions
* Navigation buttons appear only when hovering over the previous or next slide.
* Buttons follow the mouse cursor with an offset and fade in/out.
* Additional CSS classes add direction-based slide animations.

### Circle Animation Speed Control
* A <circle> element’s animation is temporarily sped up when navigating slides.
* The speed returns to normal after a short duration.
* Controlled using CSS keyframe animations (drawAndErase, erase).
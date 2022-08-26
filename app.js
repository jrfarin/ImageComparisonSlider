
const initComparisons = () => {
    let imgOverlay;
    let i;

    // Find all elements with "img-slider-overlay" class
    imgOverlay = document.getElementsByClassName('img-slider-overlay');
    
    for (i = 0; i < imgOverlay.length; i++) {
        // To execute the compareImages function
        compareImages( imgOverlay[i] );
    }
}

function compareImages(img) {
    let slider;
    let clicked = 0;
    const imgContainer = document.querySelector('.img-slider-container')

    // Get the width & height of the img element
    const widthImg = img.offsetWidth;
    const heightImg = img.offsetHeight;
    
    // Set width & height in slider container.  it should be the same width & height as the image for center positions 
    imgContainer.style.width = `${widthImg}px`;
    imgContainer.style.height = `${heightImg}px`;

    // Reload when window resize. Reposition container & slider 
    window.onresize = () => location.reload();

    // Set the width of the img element to 50%
    img.style.width = (widthImg / 2) + 'px';

    // Create Slider
    slider = document.createElement('DIV');
    slider.setAttribute('class', 'img-compare-slider');

    // Add Slider
    img.parentElement.insertBefore(slider, img);

    // Positioning the slider in the center of image
    slider.style.top = (heightImg / 2) - (slider.offsetHeight / 2) + 'px';
    slider.style.left = (widthImg / 2) - (slider.offsetWidth / 2) + 'px';


    // Execute a function when the mouse button is pressed
    slider.addEventListener("mousedown", slideReady);

    // Execute a function when the mouse button is released
    window.addEventListener("mouseup", slideFinish);

    // Or touched (for touch screens)
    slider.addEventListener("touchstart", slideReady);

    // Or released (for touch screens)
    window.addEventListener("touchend", slideFinish);

    function slideReady(e) {
        // Prevent any  action when moving over the image
        e.preventDefault();

        // At this moment the slider is clicked and ready to move
        clicked = 1;

        // Execute a function when the slider is moved:*/
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
        // The slider is no longer clicked
        clicked = 0;
    }

    function slideMove(e) {
        let pos;
        // If the slider is no longer clicked, exit this function
        if (clicked == 0)
            return false;

        // Get the cursor's X position
        pos = getCursorPos(e);

        // Prevent the slider from being positioned outside the image
        if (pos < 0)
            pos = 0;
        if (pos > widthImg)
            pos = widthImg;

        // Execute a function that will resize the overlay image according to the cursor
        slide(pos);
    }

    function getCursorPos(e) {
        let coordX = 0;

        // TouchEvent.changedTouches TouchList
        e = (e.changedTouches) ? e.changedTouches[0] : e;

        // Return the size of an element and its position relative to the viewport
        const area = img.getBoundingClientRect();

        // Calculate the cursor's X coordinate, relative to the image
        coordX = e.pageX - area.left;

        // For consideration any page scrolling
        coordX = coordX - window.pageXOffset;
        return coordX;
    }

    function slide(xWidth) {
        // Resize the image
        img.style.width = xWidth + 'px';

        // Repositioning the slider
        slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + 'px';
    }
}

// Execute the function 
initComparisons();
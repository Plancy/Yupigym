document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById("slider");
    const overlay = document.getElementById("imgCompOverlay");
    const container = overlay.parentElement;

    let isDragging = false;
    let startX = 0;
    let startLeft = 0;

    slider.addEventListener("mousedown", startDrag);
    slider.addEventListener("touchstart", startDrag);

    function startDrag(event) {
        isDragging = true;
        startX = event.clientX || event.touches[0].clientX;
        startLeft = parseFloat(window.getComputedStyle(slider).left);
        document.body.style.cursor = "ew-resize";
    }

    window.addEventListener("mousemove", moveSlider);
    window.addEventListener("touchmove", moveSlider);

    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);

    function stopDrag() {
        isDragging = false;
        document.body.style.cursor = "default";
    }

    function moveSlider(event) {
        if (!isDragging) return;

        const clientX = event.clientX || event.touches[0].clientX;
        let offsetX = startLeft + (clientX - startX);

        const containerRect = container.getBoundingClientRect();
        const sliderRect = slider.getBoundingClientRect();

        if (offsetX < containerRect.left - sliderRect.width / 2) {
            offsetX = containerRect.left - sliderRect.width / 2;
        }

        if (offsetX > containerRect.right - sliderRect.width / 2) {
            offsetX = containerRect.right - sliderRect.width / 2;
        }

        slider.style.left = offsetX - containerRect.left + "px";
        overlay.style.width = offsetX - containerRect.left + "px";
    }

    // Prevent default drag behavior on images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', event => event.preventDefault());
    });
});

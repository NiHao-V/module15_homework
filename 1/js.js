document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector(".btn");
    const icon1 = document.getElementById("icon1");
    const icon2 = document.getElementById("icon2");
    let isIcon1Visible = true;

    button.addEventListener("click", function() {
        if (isIcon1Visible) {
            icon1.style.display = "none";
            icon2.style.display = "inline";
        } else {
            icon1.style.display = "inline";
            icon2.style.display = "none";
        }

        isIcon1Visible = !isIcon1Visible;
    });
});



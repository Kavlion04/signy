document.getElementById("show-content-btn").addEventListener("click", function () {
    const content = document.getElementById("dynamic-content");
    content.classList.remove("hidden");
});


document.getElementById("close-content-btn").addEventListener("click", function () {
    const content = document.getElementById("dynamic-content");
    content.classList.add("hidden");
});





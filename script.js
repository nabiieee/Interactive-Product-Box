// Initialize boxes functionality
document.addEventListener("DOMContentLoaded", function () {
  initializeBoxes();
});

function initializeBoxes() {
  const boxes = document.querySelectorAll(".product-box");

  boxes.forEach((box, index) => {
    const radio = box.querySelector('input[type="radio"]');
    const content = box.querySelector(".expandable-content");

    // Handle box click
    box.addEventListener("click", function (e) {
      // Don't trigger if clicking on select dropdown
      if (e.target.tagName !== "SELECT") {
        radio.checked = true;

        // Close all other boxes
        boxes.forEach((otherBox, otherIndex) => {
          if (otherIndex !== index) {
            const otherContent = otherBox.querySelector(".expandable-content");
            const otherRadio = otherBox.querySelector('input[type="radio"]');
            otherContent.style.maxHeight = "0";
            otherBox.classList.remove("expanded");
            otherRadio.checked = false;
          }
        });

        // Toggle current box
        if (content.style.maxHeight === "0px" || !content.style.maxHeight) {
          content.style.maxHeight = content.scrollHeight + "px";
          box.classList.add("expanded");
        } else {
          content.style.maxHeight = "0";
          box.classList.remove("expanded");
        }

        updateTotal();
      }
    });

    // Handle radio change
    radio.addEventListener("change", function () {
      updateTotal();
    });
  });

  // Handle dropdown changes
  const selects = document.querySelectorAll("select");
  selects.forEach(function (select) {
    select.addEventListener("change", updateTotal);
  });

  // Add to cart functionality
  const addToCartBtn = document.getElementById("addToCartBtn");
  addToCartBtn.addEventListener("click", function () {
    const selectedBox = document.querySelector(
      '.product-box input[type="radio"]:checked'
    );
    if (selectedBox) {
      const unitText = selectedBox
        .closest(".product-box")
        .querySelector(".unit-text").textContent;
      alert("Added " + unitText + " to cart!");
    } else {
      alert("Please select a product option first!");
    }
  });
}

function updateTotal() {
  const selectedRadio = document.querySelector('input[type="radio"]:checked');
  const totalElement = document.getElementById("total");

  if (selectedRadio && totalElement) {
    const price = selectedRadio.getAttribute("data-price");
    totalElement.textContent = "Total : $" + price + " USD";
  }
}

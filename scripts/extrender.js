let extensions = [];
const fetchExtensions = async () => {
  try {
    const dataResponse = await fetch("data.json");
    extensions = await dataResponse.json();
    renderExtensions(extensions);

    // Adjust filter buttons based on what is clicked
    const filterButtons = document.querySelectorAll(".filters .btn");
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove 'active' class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // Add 'active' class to clicked button
        button.classList.add("active");

        // Filter logic
        if (button.textContent === "All") {
          renderExtensions(extensions);
        } else if (button.textContent === "Active") {
          const activeExtensions = extensions.filter((ext) => ext.isActive);
          renderExtensions(activeExtensions);
        } else if (button.textContent === "Inactive") {
          const inactiveExtensions = extensions.filter((ext) => !ext.isActive);
          renderExtensions(inactiveExtensions);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

// Reusable function to render extensions
function renderExtensions(extensionsToRender) {
  const extSpace = document.querySelector(".ext-container");
  extSpace.innerHTML = ""; // Clear existing cards

  const cardFrag = document.createDocumentFragment();
  const extCard = document.createElement("div");
  extCard.classList.add("ext-card");

  extensionsToRender.forEach((element, index) => {
    extCard.innerHTML = `
      <div class="card-details">
          <img src="${element.logo}" alt="Extension Logo" />
          <div class="description">
              <h4>${element.name}</h4>
              <p>${element.description}</p>
          </div>
      </div>
      <div class="actions">
          <button class="btn remove">Remove</button>
          <label class="switch">
              <input type="checkbox" ${
                element.isActive ? "checked" : ""
              } data-index="${index}" />
              <span class="slider"></span>
          </label>
      </div>`;
    cardFrag.append(extCard.cloneNode(true));
  });
  extSpace.append(cardFrag);

  // Handle checkbox toggle (updates the original extensions array)
  extSpace.addEventListener("click", (event) => {
    const checkbox = event.target.closest('input[type="checkbox"]');
    if (checkbox) {
      const index = parseInt(checkbox.dataset.index);
      extensions[index].isActive = !extensions[index].isActive;

      // Re-apply the current filter after toggle
      const activeFilter = document.querySelector(
        ".filters .btn.active"
      ).textContent;
      if (activeFilter === "Active") {
        const activeExtensions = extensions.filter((ext) => ext.isActive);
        renderExtensions(activeExtensions);
      } else if (activeFilter === "Inactive") {
        const inactiveExtensions = extensions.filter((ext) => !ext.isActive);
        renderExtensions(inactiveExtensions);
      }
    }

    // Handle remove button (optional)
    if (event.target.classList.contains("remove")) {
      // Your remove logic here
    }
  });
}

fetchExtensions();

(() => {
  const quoteElement = document.querySelector(".quote");
  const tagsContainer = document.querySelector(".tags-container");
  const authorElement = document.querySelector(".author");
  const randomButton = document.getElementById("random-btn");
  const shareButton = document.getElementById("share-btn");

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  const createTags = (tags) => {
    tagsContainer.innerHTML = "";
    tags.forEach((tagText) => {
      const tag = document.createElement("span");
      tag.classList.add("tag");
      tag.textContent = capitalize(tagText);
      tagsContainer.appendChild(tag);
    });
  };

  fetch(
    "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch quotes");
      }
      return response.json();
    })
    .then((data) => {
      const quotes = data;

      const displayRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const { quote, author = "Unknown", tags = [] } = quotes[randomIndex];
        quoteElement.textContent = `"${quote}"`;
        authorElement.textContent = author;
        createTags(tags);
      };

      const copyText = () => {
        const quoteText = quoteElement.textContent;
        navigator.clipboard
          .writeText(quoteText)
          .then(() => alert("Quote copied to clipboard!"))
          .catch((error) =>
            console.error("Error copying quote to clipboard:", error)
          );
      };

      displayRandomQuote();
      randomButton.addEventListener("click", displayRandomQuote);
      shareButton.addEventListener("click", copyText);
    })
    .catch((error) => {
      console.error("Error fetching quotes:", error);
      quoteElement.textContent =
        "Failed to load quotes. Please try again later.";
    });
})();

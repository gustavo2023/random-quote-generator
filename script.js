const quoteElement = document.querySelector(".quote");
const tagsContainer = document.querySelector(".tags-container");

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

    const createTags = (numTags) => {
      for (let i = 0; i < numTags; i++) {
        const tag = document.createElement("span");
        tag.classList.add("tag");
        tagsContainer.appendChild(tag);
      }
    };

    const displayRandomQuote = () => {
      tagsContainer.innerHTML = "";
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex].quote;
      quoteElement.textContent = `"${randomQuote}"`;
      const quoteAuthor = quotes[randomIndex].author;
      document.querySelector(".author").textContent = quoteAuthor;
      const quoteTags = quotes[randomIndex].tags;
      createTags(quoteTags.length);
      const tags = document.querySelectorAll(".tag");
      tags.forEach((tag, index) => {
        tag.textContent =
          quoteTags[index].charAt(0).toUpperCase() + quoteTags[index].slice(1);
      });
    };

    const copyText = () => {
      const quoteText = quoteElement.textContent;
      navigator.clipboard
        .writeText(quoteText)
        .then(() => {
          alert("Quote copied to clipboard!");
        })
        .catch((error) => {
          console.error("Error copying quote to clipboard:", error);
        });
    };

    displayRandomQuote();

    document
      .getElementById("random-btn")
      .addEventListener("click", displayRandomQuote);

    document.getElementById("share-btn").addEventListener("click", copyText);
  })
  .catch((error) => {
    console.error("Error fetching quotes:", error);
  });

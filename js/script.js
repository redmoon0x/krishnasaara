const form = document.getElementById('post-generator-form');
  const generatedPostDiv = document.getElementById('generatedPost');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const topic = document.getElementById('topicInput').value;
    const postType = document.getElementById('postTypeSelect').value;

    generatePost(topic, postType);
  });

  function generatePost(topic, postType) {
    fetchImage(topic)
      .then(imageUrl => {
        return fetchQuote(topic, imageUrl);
      })
      .then(quote => {
        const postContent = {
          quote: quote,
          image: imageUrl
        };

        displayPost(postContent);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  function fetchImage(topic) {
    const apiKey = 'YOUR_UNSPLASH_API_KEY'; // Replace with your Unsplash API key
    const apiUrl = `https://api.unsplash.com/photos/random?query=${topic}&client_id=${apiKey}`;

    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => data.urls.regular)
      .catch(error => {
        console.error("Error fetching image:", error);
      });
  }

  function fetchQuote(topic, imageUrl) {
    // Use the Quotable API to fetch a quote related to the topic
    const apiUrl = `https://api.quotable.io/random?tags=${topic}`;

    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => data.content)
      .catch(error => {
        console.error("Error fetching quote:", error);
      });
  }

  function displayPost(postContent) {
    const postHTML = `
      <div class="card mb-4">
        <img src="${postContent.image}" class="card-img-top" alt="Post Image">
        <div class="card-body">
          <blockquote class="card-text">${postContent.quote}</blockquote>
        </div>
      </div>
    `;

    generatedPostDiv.innerHTML = postHTML;
  }
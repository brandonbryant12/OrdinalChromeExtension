const content = document.getElementById('content');
const urlParams = new URLSearchParams(window.location.search);
const origin = urlParams.get('origin');

if (!origin) {
  content.innerHTML = 'Missing origin parameter';
} else {
  const url = `https://ordinals.gorillapool.io/api/files/inscriptions/${origin}`;
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const src = URL.createObjectURL(blob);

      if (blob.type.startsWith('image/')) {
        content.innerHTML = `<img src="${src}" alt="" />`;
      } else if (blob.type.startsWith('audio/')) {
        content.innerHTML = `<audio controls src="${src}"></audio>`;
      } else if (blob.type.startsWith('video/')) {
        content.innerHTML = `<video controls src="${src}"></video>`;
      } else if (blob.type.startsWith('text/')) {
        content.innerHTML = `<iframe title="text-preview" src="${src}" style="width: 100%; height: 400px; border: none;"></iframe>`;
      } else {
        content.innerHTML = `
          <div>
            <p>Unsupported MIME type: ${blob.type}</p>
            <a href="${src}" download>Download File</a>
          </div>
        `;
      }
    })
    .catch((error) => {
      console.error('Error fetching file:', error);
      content.innerHTML = 'Error fetching file';
    });
}


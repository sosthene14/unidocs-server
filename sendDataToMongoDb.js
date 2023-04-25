
form.addEventListener('submit', function(e) {
    // Prevent default behavior:
    e.preventDefault();
    // Create new FormData object:
    const formData = new FormData(form);
    // Convert formData object to JSON:
    const payload = JSON.stringify(Object.fromEntries(formData.entries()));

    // Post the payload using Fetch:
    try {
      fetch('http://localhost:5002/addData', {
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(payload)
      .then(res => res.json())
      .then(data => console.log(data))
    } catch (error) {

    }
  })

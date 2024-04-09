const input = document.getElementById("prompt")
const comment = document.getElementsByClassName("comment-container")

input.addEventListener('keypress', function (event) {

  // Check if the Enter key was pressed (key code 13)
  if (event.key === 'Enter') {
    // event.preventDefault();
    const newDiv = document.createElement('div');

    // Set attributes or properties for the new element (optional)
    newDiv.textContent = input.value;

    // Append the new element to an existing element in the DOM
    document.body.innerHTML += `${input.value}`
    // Call your function here or perform any desired action
    console.log('Enter key pressed');

  }
});
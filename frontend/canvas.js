
  // Drawing on canvas
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 1.7;
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "1";  // Make sure it stays behind everything else
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let drawing = false;

  // Function to get the mouse coordinates adjusted for scrolling
  function getAdjustedCoordinates(e) {
    return {
      x: e.clientX + window.scrollX,
      y: e.clientY + window.scrollY
    };
  }

  // Start drawing when mouse is pressed
  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    const { x, y } = getAdjustedCoordinates(e);
    ctx.moveTo(x, y);  // Adjust for scrolling
  });

  // Draw as the mouse moves
  canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    const { x, y } = getAdjustedCoordinates(e);
    ctx.lineTo(x, y);  // Adjust for scrolling
    ctx.strokeStyle = "white";         // Set the color to white
    ctx.lineWidth = 2;                 // Set the line thickness
    ctx.stroke();                      // Draw the line
  });

  // Stop drawing when mouse is released
  canvas.addEventListener("mouseup", () => {
    drawing = false;
  });

  // Double-click functionality to create a new text box
  let lastClickTime = 0;
  const doubleClickThreshold = 300;  // 300ms for double-click detection
  canvas.addEventListener("dblclick", (e) => {
    const currentTime = new Date().getTime();

    const { x, y } = getAdjustedCoordinates(e);
    createTextBox(x, y);  // Adjust for scrolling

  });

  // Create a text box at the mouse release position
  function createTextBox(x, y) {
    const textBox = document.createElement("textarea");
    textBox.classList.add("text-box");  // Apply the predefined CSS for the text box
    textBox.style.left = `${x}px`;
    textBox.style.top = `${y}px`;
    textBox.style.position = "absolute";
    document.body.appendChild(textBox); // Add the text box to the body
    textBox.focus();                    // Focus on the text box so the user can start typing immediately

    // Make it resizable
    textBox.style.resize = "both";
    textBox.style.overflow = "auto";
  }
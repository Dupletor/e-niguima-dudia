class Shimeji {
  constructor(imageSrc, name) {
    // Create mascot wrapper div
    this.el = document.createElement('div');
    this.el.style.position = 'fixed';
    this.el.style.left = '50px';
    this.el.style.top = '50px';
    this.el.style.width = '64px';
    this.el.style.height = '64px';
    this.el.style.zIndex = 1000;
    this.el.style.userSelect = 'none';
    this.el.style.cursor = 'pointer';

    // Name label above
    this.label = document.createElement('div');
    this.label.innerText = name;
    this.label.style.position = 'absolute';
    this.label.style.top = '-20px';
    this.label.style.width = '100%';
    this.label.style.textAlign = 'center';
    this.label.style.color = 'white';
    this.label.style.textShadow = '0 0 5px black';
    this.label.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
    this.label.style.fontSize = '14px';
    this.el.appendChild(this.label);

    // Image
    this.img = document.createElement('img');
    this.img.src = imageSrc;
    this.img.style.width = '100%';
    this.img.style.height = '100%';
    this.img.style.display = 'block';
    this.img.style.background = 'transparent';
    this.img.style.border = 'none';
    this.img.style.margin = '0';
    this.img.style.padding = '0';
    this.el.appendChild(this.img);

    // Append directly to the body
    document.body.appendChild(this.el);

    // Physics
    this.x = 50;
    this.y = 50;
    this.vx = 1 + Math.random() * 1;
    this.vy = 0;
    this.gravity = 0.5;
    this.groundY = window.innerHeight - 64;

    this.update = this.update.bind(this);
    requestAnimationFrame(this.update);

    // For dragging
    this.isDragging = false;
    this.offsetX = 0;
    this.offsetY = 0;

    this.el.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.offsetX = e.clientX - this.x;
      this.offsetY = e.clientY - this.y;
      this.gravity = 0;
    });

    document.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        this.x = e.clientX - this.offsetX;
        this.y = e.clientY - this.offsetY;
        this.vx = 0; // stop physics during drag
        this.vy = 0;
      }
    });

    document.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.vx = 1 + Math.random() * 1;
      this.vy = 0;
      this.gravity = 0.5;
    });

  }

update() {
  if (!this.isDragging) {
    // Only apply physics when NOT dragging
    this.vy += this.gravity;
    this.y += this.vy;
    this.x += this.vx;

    // Bounce on floor
    if (this.y > this.groundY) {
      this.y = this.groundY;
      this.vy *= -0.6;
    }

    // Bounce on left/right and flip
    if (this.x <= 0) {
      this.x = 0;
      this.vx *= -1;
    }

    if (this.x >= window.innerWidth - 64) {
      this.x = window.innerWidth - 64;
      this.vx *= -1;
    }

    this.flipImage(this.vx > 0);
  } else {
    // While dragging, no physics, no flip change
    // But keep position updated by mousemove handler
  }

  // Always update element position from current x, y
  this.el.style.left = this.x + 'px';
  this.el.style.top = this.y + 'px';

  requestAnimationFrame(this.update);
}

  flipImage(flip) {
    this.img.style.transform = flip ? 'scaleX(-1)' : 'scaleX(1)';
  }
}


// Create the shimeji mascot on DOM ready
function spawnRobson(){
  new Shimeji('frontend/robson.png', 'Robson');
};
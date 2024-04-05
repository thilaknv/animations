createFace(1);

function createFace(number) {
  const container = document.querySelector(".container");

  const face = document.createElement("div");
  face.id = "F" + number;
  face.classList.add("face");
  face.innerHTML = `
        <div class='eye-set'>
            <div class='eye' id='lE${number}'><div class='eye-ball'></div></div>
            <div class='eye' id='rE${number}'><div class='eye-ball'></div></div>
        </div>
        <div class='mouth'>
        </div>
        `;
  // <p class='up'></p><p class='up'></p><p class='up'></p><p class='up'></p><p class='up'></p><p class='up'></p><p class='up'></p>
  // <p class='lw'></p><p class='lw'></p><p class='lw'></p><p class='lw'></p><p class='lw'></p><p class='lw'></p><p class='lw'></p>
  container.appendChild(face);
  moveFace("F1");
  closeEye("lE" + number);
  closeEye("rE" + number);
  addMouseEvents();
}

function moveFace(id) {
  const face = document.querySelector("#" + id);
  face.style.transition = "2s ease-in-out";
  let term = true;
  const interval = setInterval(() => {
    if (term) face.style.translate = "0px 20px";
    else face.style.translate = "0px -20px";
    term = !term;
  }, 2000);

  return interval;
}

function closeEye(id) {
  const eye = document.querySelector("#" + id);
  let open = true;

  const interval = setInterval(() => {
    eye.style.height = "5px";
    setTimeout(() => {
      eye.style.height = "calc(var(--face-height) / 4)";
    }, 150);
  }, 3500);
  return interval;
}

function addMouseEvents() {
  var release = null;
  let radius = 15;
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("eye")) return;
    clearTimeout(release);

    const eyes = document.querySelectorAll(".eye-ball");
    eyes.forEach((eyeBall, index) => {
      let eyeB = eyeBall.getBoundingClientRect();
      //   console.log(eyeB);
      let slope = (eyeB.y - e.clientY) / (e.clientX - eyeB.x);

      let y = (radius * slope) / Math.sqrt(1 + slope * slope);
      let x = -y / slope;
      if (e.clientX > eyeB.x) {
        x = -x;
        y = -y;
      }

      eyeBall.style.translate = `${x}px ${y}px`;
    });
    release = setTimeout(() => {
      eyes.forEach((eyeBall) => {
        eyeBall.style.translate = `0px 0px`;
      });
    }, 1000);
  });
}

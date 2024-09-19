const walkWomanDispText = document.getElementById("walkman-disp");
const contentDiv = document.querySelector('#content');
const firstH2 = contentDiv.querySelector('h2');
let currentHeader = firstH2;
let currentHeaderInd = 0;

window.onload = function() {
    if (firstH2.innerHTML.length > 7) {
        walkWomanDispText.innerHTML = "1 " + firstH2.innerHTML.substring(0, 7) + "…";    
    } else {
        walkWomanDispText.innerHTML = "1 " + firstH2.innerHTML.substring(0, 7);    
    }
};

function getScrollPercent() {
    // Get the current scroll position
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    // Get the total scrollable height (total document height minus the visible window height)
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    // Calculate the scroll percentage
    const scrollPercent = (scrollTop / docHeight)*100;    
    return scrollPercent;
}


window.addEventListener('scroll', function() {
    const rollers = document.querySelectorAll('.roller');
    rollers.forEach(roller => {
        const rotation = window.scrollY/6 % 360;
        roller.style.transform = `rotate(${rotation}deg)`;
    });

    const tapes = document.querySelectorAll('.tape');
    const scrollPercent = getScrollPercent(); // Assume this is 0-100

    // Normalize the scroll percent to a smaller range, like 0.5 to 2
    const scale = 1 + (scrollPercent / 100); // Scale will range from 1 to 2

    tapes.forEach(tape => {
        if (tape.id == "tape-bottom") {
            // Prevent division by very small values by clamping the scale
            const invertedScale = Math.max(0.5, 1 / scale); // Ensures it doesn't shrink too much
            tape.style.transform = `scale(${invertedScale})`;
        } else {
            tape.style.transform = `scale(${scale})`; // Normal scaling
        }
    });


    const headers = document.querySelectorAll('.section-title');
    let minSpaceHeader = headers[0]; 
    let minSpaceHeaderOff = minSpaceHeader.offsetTop - window.scrollY;
    let minSpaceHeaderInd = 0;
    let i = 0;
    // Loop through each header and calculate the distance to the current scroll position
    headers.forEach(header => {
        const currentDistance = header.offsetTop-window.scrollY;
        // Check if the header is closer to the current scroll position (including negative values)
        if (Math.abs(currentDistance) < Math.abs(minSpaceHeaderOff)) {
            minSpaceHeader = header;
            minSpaceHeaderOff = currentDistance;
            minSpaceHeaderInd = i;
        }
        i++;
    });

    // Check if the closest header is different from the current header
    if (minSpaceHeader !== currentHeader) {
        walkWomanDispText.innerHTML = (minSpaceHeaderInd + 1) + " " + minSpaceHeader.innerHTML.substring(0, 7) + "…";
        currentHeader = minSpaceHeader;
        currentHeaderInd = minSpaceHeaderInd;
    }
});

document.getElementById("right-skip-svg").onclick = function() {
    document.querySelectorAll('.section-title')[currentHeaderInd+1].scrollIntoView({
        behavior: 'smooth'
    });
}
document.getElementById("left-skip-svg").onclick = function() {
    if (currentHeaderInd!=1) {
        document.querySelectorAll('.section-title')[currentHeaderInd-1].scrollIntoView({
            behavior: 'smooth'
        });
    } else {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
    }
}

const calcZone = document.querySelector('.calcZone');
const resultZone = document.querySelector('.resultZone');
const touches = [...document.querySelectorAll('.bouton')];
const keys = touches.map(x => x.dataset.key);
let isCalcRunning = false;

window.onload = init();

document.addEventListener('click', e => {
    if (resultZone.innerHTML.includes("Erreur")) {
        init();
    } else {
        const keyClick = e.target.dataset.key;
        console.log(keyClick);
        calc(keyClick);
    }
}
)

document.addEventListener('keydown', e => {
    if (resultZone.innerHTML.includes("Erreur")) {
        init();
    } else {
        const keyKeydown = e.key.toString();
        console.log(keyKeydown);
        calc(keyKeydown);
    }
})

window.addEventListener('error', e => {
    resultZone.innerHTML = "Erreur de syntaxe";
    isCalcRunning = false;
})

function init() {
    isCalcRunning = false;
    resultZone.innerHTML = "";
    calcZone.innerHTML = "_";
}

function calc(key) {
    if (keys.includes(key)) {
        switch (key) {
            case 'Backspace':
                init();
                break;
            case 'Enter':
                if (isCalcRunning) {
                    calcZone.innerHTML = calcZone.innerHTML.slice(0, -1);
                } else if (calcZone.innerHTML === "_") {
                    init();
                    break;
                }
                resultZone.innerHTML = eval(calcZone.innerHTML);
                isCalcRunning = false;
                break;
            default:
                if (isCalcRunning) {
                    calcZone.innerHTML = calcZone.innerHTML.slice(0, -1);
                    calcZone.innerHTML += key + "_";
                    resultZone.innerHTML = "";
                } else {
                    if (key >= 0 && key < 10) {
                        calcZone.innerHTML = calcZone.innerHTML.slice(0, -1);
                        calcZone.innerHTML = key + "_";
                        resultZone.innerHTML = "";
                        isCalcRunning = true;
                    } else {
                        calcZone.innerHTML = calcZone.innerHTML.slice(0, -1);
                        calcZone.innerHTML = resultZone.innerHTML + key + "_";
                        resultZone.innerHTML = "";
                        isCalcRunning = true;
                    }
                }
        }
    }
}

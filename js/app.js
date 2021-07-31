let sequence = [];
let level = -1;
let sublevel = 0;
const latest = 30;
const wait = 750;
const waitHalf = 1500;
const deleteColor = 350;
const numColors = 5;
const button = document.getElementById('btnEmpezar');
const verde = document.getElementById('verde');
const amarillo = document.getElementById('amarillo');
const azul = document.getElementById('azul');
const rojo = document.getElementById('rojo');
const blanco = document.getElementById('blanco');
const colors = {
    verde,
    amarillo,
    azul,
    rojo,
    blanco
}
function startGame() {    
    sequence = new Array(latest);
    sequence = sequence.fill(0);
    sequence = sequence.map(n => Math.floor(Math.random() * numColors));
    level = 0;
    sublevel = 0;
    button.classList.add('hide');
    illuminateSequence();
};
function gameOver() 
{
	button.classList.remove('hide');
	level = -1;
}
function illuminateSequence() {
    for (let i = 0; i <= level; i++) 
    {
        const color = transformNumberToColor(sequence[i]);
        setTimeout(() => illuminateColor(color), wait * i);
    }
}

function illuminateColor(color) 
{
    colors[color].classList.add('light');
    setTimeout(() => offColor(color), deleteColor);
}

function offColor(color) 
{
    colors[color].classList.remove('light');
}
function transformNumberToColor(number) 
{
    switch (number) 
    {
        case 0:    return 'rojo';
        case 1:    return 'verde';
        case 2:    return 'amarillo';
        case 3:    return 'azul';
        case 4:    return 'blanco';
    }
}
colors.verde.addEventListener('click', chooseColor);
colors.amarillo.addEventListener('click', chooseColor);
colors.rojo.addEventListener('click', chooseColor);
colors.azul.addEventListener('click', chooseColor);
colors.blanco.addEventListener('click', chooseColor);
function chooseColor(ev) 
{
    if (level === -1) return;
    
    const nameColor = ev.target.dataset.color;
    const numberColor = transformColorToNumber(nameColor);
    illuminateColor(nameColor);
    if (numberColor === sequence[sublevel]) 
    {
        sublevel++;
        if (sublevel > level) 
        {
            level++;
            if (level === latest) 
            {
                alert("Ganaste :D");
                gameOver();
            }
            else
            {
                sublevel = 0;
                setTimeout(illuminateSequence, waitHalf);
            }
        }
    }
    else 
    {
        alert("Perdiste :'( llegaste al nivel:  " + (level + 1));
        gameOver();
    }
}

function transformColorToNumber(color) 
{
    switch (color) 
    {
        case 'rojo':        return 0;
        case 'verde':        return 1;
        case 'amarillo':    return 2;
        case 'azul':        return 3;
        case 'blanco':        return 4;
    }
}
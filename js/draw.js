canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
draw(3)


function drawPoint() {
    let x = Number(document.getElementById("select_x").value);
    var y = Number(document.getElementById("value_y").value);
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(150, 70);
        ctx.arc(150 + 50 * x / 3, 70 - 50 * y / 3, 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
}

function draw(r) {
    ctx.clearRect(0, 0, 1000, 1000);

    ctx.fillStyle = "rgb(0,89,206)";
    ctx.beginPath();
    ctx.moveTo(150, 70);

    //сектор круга
    ctx.arc(150, 70, 50, -4.7, 4 * Math.PI / 2, true);

    //прямоугольник
    ctx.fillRect(100, 20, 50, 50);

    //треугольник
    ctx.moveTo(150, 70);
    ctx.lineTo(200, 70);
    ctx.lineTo(150, 20);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.beginPath();

    //линяя x
    ctx.moveTo(150, 70);
    ctx.lineTo(220, 70);

    //стрелка
    ctx.lineTo(215, 75);
    ctx.moveTo(220, 70);
    ctx.lineTo(215, 65);

    ctx.fillText('X', 220, 65);
    ctx.moveTo(150, 70);
    ctx.lineTo(80, 70);

    //значения X
    ctx.moveTo(175, 75);
    ctx.lineTo(175, 65);
    ctx.fillText(r / 2, 170, 63);
    ctx.moveTo(200, 75);
    ctx.lineTo(200, 65);
    ctx.fillText(r, 197, 63);

    ctx.moveTo(125, 75);
    ctx.lineTo(125, 65);
    ctx.fillText(-1 * r / 2, 114, 63);
    ctx.moveTo(100, 75);
    ctx.lineTo(100, 65);
    ctx.fillText(-1 * r, 96, 63);

    //линия Y
    ctx.moveTo(150, 70);
    ctx.lineTo(150, 140);
    ctx.moveTo(150, 70);
    ctx.lineTo(150, 5);
    //стрелка
    ctx.lineTo(155, 10);
    ctx.moveTo(150, 5);
    ctx.lineTo(145, 10);
    ctx.fillText('Y', 155, 15);

    //значения Y
    ctx.moveTo(145, 95);
    ctx.lineTo(155, 95);
    ctx.fillText(-1 * r / 2, 160, 100);
    ctx.moveTo(145, 120);
    ctx.lineTo(155, 120);
    ctx.fillText(-1 * r, 160, 123);

    ctx.moveTo(145, 45);
    ctx.lineTo(155, 45);
    ctx.fillText(r / 2, 160, 48);
    ctx.moveTo(145, 20);
    ctx.lineTo(155, 20);
    ctx.fillText(r, 160, 25);
    ctx.closePath();
    ctx.stroke();
}
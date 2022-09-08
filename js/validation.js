const xObject = $("#select_x")
const yObject = $("#value_y")

function set_X_value(id) {
    let value_x= " ";
    let error_x = document.getElementById("text_error_x")
    if (document.getElementById(id).checked === true) {
        value_x = document.getElementById(id).value;
        document.getElementById("select_x").value = value_x;
        xObject.removeClass("error_value")
        xObject.addClass("acceptable_value")
        error_x.textContent = ""
    }
}
function validateX() {
    return xObject!==null
}

function validateY() {
    let error_y = document.getElementById("text_error_y")
    error_y.textContent = "Ошибка ввода значения координаты Y: "
    if (yObject.val()) {
        let new_x = Number.parseInt(yObject.val());
        if (!isNaN(new_x)) {
            if (new_x > -3 && new_x < 5) {
                error_y.textContent = "";
                return true;
            } else {
                error_y.textContent += "число не входит в диапазон данных"
            }
        } else {
            error_y.textContent += "введено не число"
        }
    } else {
        error_y.textContent += "данные не введены"
    }
    error_y.innerHTML += "<br>"

    return false;
}
function validateR() {
    let error_r = document.getElementById("text_error_r")
    let checkboxes = $("input[type='checkbox']:checked")
    if (checkboxes.length === 0) {
        error_r.innerHTML = "Ошибка выбора значения координаты R: никакое из значений не выбрано <br>"
        return false
    } else {
        error_r.textContent = ""
        return true
    }
}

//add change listener to Y
yObject.change(() => {
    if(validateY()){
        yObject.removeClass("error_value")
        yObject.addClass("acceptable_value")
    } else {
        yObject.removeClass("acceptable_value")
        yObject.addClass("error_value")
    }
})

//add change listener to R
$("input[type='checkbox']").change(() => {
    validateR()
})

//add change listener to X
xObject.change(() => {
    if(validateX()){
        xObject.removeClass("error_value")
        xObject.addClass("acceptable_value")
    } else {
        xObject.removeClass("acceptable_value")
        xObject.addClass("error_value")
    }
})

function clearTable() {
    $("#add_table").empty()
}

function sendRequest(r) {
    $.ajax({
        url: "php/index.php",
        type: "get",
        data: {
            xVar:   xObject.val().substring(0, 10),
            yVar: yObject.val().substring(0, 10),
            rVar: r,
            time: new Date().getTimezoneOffset(),
        },
        success: function (data) {
            clearTable()
            $("#add_table").html(data)
            $("#request_text").text("Данные обработаны!")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#request_text").text("Произошла ошибка " + " " + jqXHR.status + " " + errorThrown)
        }
    })
}

function clearData() {
    $.ajax({
        url: "php/clear.php",
        type: "get",
        success: function (data) {
            if (data === "true") {
                clearTable()
                getAllData()
                $("#request_text").text("Данные очищены")
            } else {
                $("#request_text").text("Не удалось очистить данные")
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#request_text").text("Произошла ошибка " + " " + jqXHR.status + " " + errorThrown)
        }
    })
}


function getAllData(){
    $.ajax({
        url: "php/rows.php",
        type: "get",
        success: function (data) {
            clearTable()
            $("#add_table").html(data)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#request_text").text("Произошла ошибка " + " " + jqXHR.status + " " + errorThrown)
        }
    })
}

function clearForm(){
    yObject.val(null)
    xObject.val(null)
    $(':checkbox').each(function() {
        this.checked = false;
    })
    $(':radio').each(function() {
        this.checked = false;
    })
    validateR()
    xObject.removeClass("acceptable_value")
    xObject.addClass("error_value")
    let error_x = document.getElementById("text_error_x")
    error_x.innerHTML = "Ошибка выбора значения координаты X: никакое из значений не выбрано<br>"
    yObject.change()
}

$("#send_button").click(() => {
    if (validateX() && validateY() && validateR()) {
        let checkboxes = document.querySelectorAll("input[type='checkbox']")
        checkboxes.forEach((element) => {
            if (element.checked) {
                sendRequest(element.value);
                drawPoint()
            }
        })
    } else {
        $("#request_text").text("Проверьте ошибки ввода данных")
    }
})

$("#clear_button").click(() => {
    clearData()
    clearForm()
})

getAllData()
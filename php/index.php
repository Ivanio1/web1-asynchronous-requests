<?php

session_start();

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(400);
    exit;
}
header("Content-Type: text/html");
$x = $_GET["xVar"];
$y = $_GET["yVar"];
$r = $_GET["rVar"];
date_default_timezone_set("UTC");
$timezoneOffset = $_GET['time'];
$start_time = microtime(true);
$is_hit = "";
$array = [];

if (!isset($_SESSION["request"])) {
    $_SESSION["request"] = [];
}

if (!(is_numeric($x) && $x >= -5 && $x <= 3)
    || !(is_numeric($y) && $y >= -3 && $y <= 5)
    || !(is_numeric($r) && $r <= 3 && $r >= 1)) {
    http_response_code(400);
    exit;
} else {
    $x = substr($x, 0, 10);
}

if (($y >= 0 && $x <= 0 && abs($x) <= $r && abs($y) <= $r) ||
    ($y <= 0 && $x >= 0 && $r >= sqrt(pow($x, 2) - pow($y, 2))) ||
    ($x >= 0 && $y >= 0 && $r >=  $x + $y) || ($x == 0 && $y == 0)) {
    $is_hit = "true";
} else {
    $is_hit = "false";
}

$currentTime = date('H:i:s', time()-$timezoneOffset*60);

$array = array($x, $y, $r, $is_hit, $currentTime, number_format(microtime(true) - $start_time, 6, ",", ""));
array_push($_SESSION["request"], $array);
$table = "";

foreach ($_SESSION['request'] as $resp) {
    $table .= "<tr class = 'response_table_values'>";
    $table .= "<td>" . $resp[0] . "</td>";
    $table .= "<td>" . $resp[1] . "</td>";
    $table .= "<td>" . $resp[2] . "</td>";
    if ($resp[3] === "true") {
        $table .= "<td class = 'response_table_value_hit_true'>" . "Попало" . "</td>";
    } else {
        $table .= "<td class = 'response_table_value_hit_false'>" . "Не попало" . "</td>";
    }
    $table .= "<td>" . $resp[4] . "</td>";
    $table .= "<td>" . $resp[5] . "</td>";
    $table .= "</tr>";
}

?>
<html>
<head>

</head>
<body>
<table id="response_table">
    <tr>
        <th>Значение X</th>
        <th>Значение Y</th>
        <th>Значение R</th>
        <th>Факт попадания</th>
        <th>Текущее время</th>
        <th>Время выполнения (в мс)</th>
    </tr>
    <?php echo $table ?>
</table>
</body>
</html>




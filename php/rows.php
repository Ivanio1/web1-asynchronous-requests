<?php
session_start();
if (isset($_SESSION["request"])) {
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


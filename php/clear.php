<?php
session_start();
if (isset($_SESSION["request"])){
    $_SESSION["request"] = [];
}
echo "true";
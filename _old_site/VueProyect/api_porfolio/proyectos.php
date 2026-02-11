<?php
header('Access-Control-Allow-Origin: *'); // Permitir llamadas desde Vue
header('Content-Type: application/json');

include 'conexion.php';

$sql = "SELECT * FROM proyectos";
$resultado = $conexion->query($sql);

$proyectos = [];

while ($fila = $resultado->fetch_assoc()) {
    $proyectos[] = $fila;
}

echo json_encode($proyectos);

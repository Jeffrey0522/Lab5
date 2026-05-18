<?php
// Configuración de cabeceras para REST
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'libs/configuration.php';
require_once 'model/PokemonModel.php';

$model = new PokemonModel();
$metodo = $_SERVER['REQUEST_METHOD'];

// Obtener parámetros
$id = isset($_GET['id']) ? $_GET['id'] : null;
$busqueda = isset($_GET['buscar']) ? $_GET['buscar'] : null;

switch ($metodo) {
    case 'GET':
        if ($id) {
            // Obtener un pokémon específico
            $resultado = $model->obtenerPorId($id);
            if ($resultado) {
                echo json_encode(["success" => true, "data" => $resultado]);
            } else {
                http_response_code(404);
                echo json_encode(["success" => false, "message" => "Pokémon no encontrado"]);
            }
        } elseif ($busqueda) {
            // Buscar por nombre
            $resultado = $model->buscarPorNombre($busqueda);
            echo json_encode(["success" => true, "data" => $resultado]);
        } else {
            // Listar todos
            $resultado = $model->listar();
            echo json_encode(["success" => true, "data" => $resultado]);
        }
        break;

    case 'POST':
        // Crear nuevo pokémon
        $datos = json_decode(file_get_contents("php://input"), true);

        if (!empty($datos['nombre']) && !empty($datos['tipo']) && !empty($datos['peso']) && !empty($datos['altura'])) {
            $resultado = $model->crear($datos['nombre'], $datos['tipo'], $datos['peso'], $datos['altura']);
            if ($resultado) {
                http_response_code(201);
                echo json_encode(["success" => true, "message" => "Pokémon creado con éxito"]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Error al crear pokémon"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Datos incompletos. Se requieren: nombre, tipo, peso, altura"]);
        }
        break;

    case 'PUT':
        // Actualizar pokémon
        $datos = json_decode(file_get_contents("php://input"), true);

        if (!empty($datos['id']) && !empty($datos['nombre']) && !empty($datos['tipo']) && !empty($datos['peso']) && !empty($datos['altura'])) {
            $resultado = $model->actualizar($datos['id'], $datos['nombre'], $datos['tipo'], $datos['peso'], $datos['altura']);
            if ($resultado) {
                echo json_encode(["success" => true, "message" => "Pokémon actualizado con éxito"]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Error al actualizar pokémon"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Datos incompletos. Se requieren: id, nombre, tipo, peso, altura"]);
        }
        break;

    case 'DELETE':
        // Eliminar pokémon
        $datos = json_decode(file_get_contents("php://input"), true);

        if (!empty($datos['id'])) {
            $resultado = $model->eliminar($datos['id']);
            if ($resultado) {
                echo json_encode(["success" => true, "message" => "Pokémon eliminado con éxito"]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Error al eliminar pokémon"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "ID requerido"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["success" => false, "message" => "Método no permitido"]);
        break;
}

?>
}
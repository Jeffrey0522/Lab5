<?php

class PokemonModel
{
    protected $db;

    public function __construct()
    {
        require 'libs/SPDO.php';
        $this->db = SPDO::singleton();
    }

    /**
     * Obtener todos los pokémon
     */
    public function listar()
    {
        try {
            $consulta = $this->db->prepare('CALL sp_listar_pokemon()');
            $consulta->execute();
            $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        } catch (PDOException $e) {
            return [];
        }
    }

    public function obtenerPorId($id)
    {
        try {
            $consulta = $this->db->prepare('CALL sp_obtener_pokemon_id(?)');
            $consulta->execute([$id]);
            $resultado = $consulta->fetch(PDO::FETCH_ASSOC);
            return $resultado;
        } catch (PDOException $e) {
            return false;
        }
    }

    
    public function buscarPorNombre($nombre)
    {
        try {
            $consulta = $this->db->prepare('CALL sp_buscar_pokemon_nombre(?)');
            $consulta->execute(['%' . $nombre . '%']);
            $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        } catch (PDOException $e) {
            return [];
        }
    }


    public function crear($nombre,$tipo, $peso, $altura)
    {
        try {
            if (empty($nombre) || empty($tipo) || empty($peso) || empty($altura)) {
                return false;
            }

            $consulta = $this->db->prepare('CALL sp_crear_pokemon(?, ?, ?, ?)');
            $result = $consulta->execute([$nombre, $tipo, $peso, $altura]);
            return $result;
        } catch (PDOException $e) {
            return false;
        }
    }

    /**
     * Actualizar un pokémon
     */
    public function actualizar($id, $nombre, $tipo, $peso, $altura)
    {
        try {
            if (empty($id) || empty($nombre) || empty($tipo) || empty($peso) || empty($altura)) {
                return false;
            }

            $consulta = $this->db->prepare('CALL sp_actualizar_pokemon(?, ?, ?, ?, ?)');
            $result = $consulta->execute([$id, $nombre, $tipo, $peso, $altura]);
            return $result;
        } catch (PDOException $e) {
            return false;
        }
    }

    /**
     * Eliminar un pokémon
     */
    public function eliminar($id)
    {
        try {
            $consulta = $this->db->prepare('CALL sp_eliminar_pokemon(?)');
            $result = $consulta->execute([$id]);
            return $result;
        } catch (PDOException $e) {
            return false;
        }
    }
}

?>

<?php

class ProyectoModel
{

    protected $db;

    public function __construct()
    {
        require 'libs/SPDO.php';
        $this->db = SPDO::singleton();
    } // constructor

    public function listar()
    {
        $consulta = $this->db->prepare('call sp_listar_proyectos()');
        $consulta->execute();
        $resultado = $consulta->fetchAll();
        $consulta->closeCursor();
        return $resultado;
    } // listar

    public function registrarProyecto($nombre, $fecha, $estado)
    {
        $consulta = $this->db->prepare("call sp_registrar_proyecto('" . $nombre . "', '" . $fecha . "', '" . $estado . "')");
        $consulta->execute();
        $consulta->closeCursor();
    }

    public function eliminarProyecto($nombre)
    {

        $consulta = $this->db->prepare('call sp_eliminar_proyecto(?)');
        $consulta->execute([$nombre]);
        $filasAfectadas = $consulta->rowCount() > 0;
        $consulta->closeCursor();
        return $filasAfectadas;
    } //eliminarProyecto


    public function buscarProyecto($nombre)
    {
        try {
            $consulta = $this->db->prepare('call sp_buscar_proyecto_nombre(?)');
            
            $consulta->execute([$nombre]);

            $resultado = $consulta->fetch(PDO::FETCH_ASSOC);
            //$resultado = 
            //    ["id" => 1, "nombre" => "Laptop", "precio" => 800]
            //;

            //$consulta->closeCursor();

            return $resultado;
            
        } catch (PDOException $e) {
            return false;
        }
    } // buscarProyecto

function actualizarProyecto($nombreOriginal, $nombre, $fecha, $estado){
    try {
        $consulta = $this->db->prepare("call sp_actualizar_proyecto(?, ?, ?, ?)");
        $consulta->execute([$nombreOriginal, $nombre, $fecha, $estado]);
        $filasAfectadas = $consulta->rowCount() > 0;
        $consulta->closeCursor();
        return $filasAfectadas;
    } catch (PDOException $e) {
        return false;
    }
}

} // fin clase

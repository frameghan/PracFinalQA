# PracFinalQA: Sistema de Autenticacion

Este proyecto contiene una aplicacion web completa con modulos de Registro y Login conectados a MySQL.

La evaluacion practica se realiza en dos etapas:
* **Laboratorio 1:** Auditoria, deteccion de defectos y correccion sobre el **Modulo de Registro**.
* **Laboratorio 2:** Auditoria de seguridad y persistencia sobre el **Modulo de Login**.

---

## 1. Requisitos del Entorno
* XAMPP (modulo MySQL activo en puerto 3306).
* Node.js v18.x o superior.
* Git y Visual Studio Code.

## 2. Preparacion de la Base de Datos
1. Iniciar **MySQL** en el panel de control de XAMPP.
2. Abrir phpMyAdmin: `http://localhost/phpmyadmin`.
3. Importar el archivo `sql/schema.sql` (creara la BD `qa_lab_db` y la tabla `users`).

## 3. Puesta en Marcha
1. Clonar el repositorio y entrar a la carpeta:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd PracFinalQA 

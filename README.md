#  Chat en Tiempo Real con Sockets y Manejo de Errores

**Estudiante:** _Ordoñez Cabrera Kevin Lenin_   

**Fecha de entrega:** _28/06/2025_ 

**Carrera/Curso:**  _Ingeniería en Tecnologías de la Información / Aplicaciones Distribuidas_

**Título del informe:**  _Módulo Docente - Sistema de Gestión de Laboratorios_


---

##  Introducción
El presente informe tiene como objetivo documentar el desarrollo e implementación del módulo destinado al rol Docente dentro del sistema web de gestión de laboratorios académicos. Este módulo fue diseñado como parte de una aplicación distribuida, con un enfoque en la organización, monitoreo y evaluación de prácticas académicas. La aplicación está desarrollada bajo una arquitectura moderna que utiliza AWS Lambda con Serverless Framework para las APIs y Angular para el frontend.




**Palabras Claves:** APis, AWS y Serverless.


##  Resumen
Durante el desarrollo del módulo docente se implementaron funcionalidades clave que permiten a los profesores gestionar las asignaturas que tienen a cargo, visualizar los parciales relacionados y crear prácticas asociadas a estos. También se integró la gestión del laboratorio asignado y la recolección automática de calificaciones por estudiante. Se aseguraron buenas prácticas en la arquitectura de carpetas, la comunicación con la base de datos DynamoDB y el consumo de APIs mediante Angular.


## Objetivo General
* Diseñar e implementar el módulo del Docente en una plataforma web para la gestión de prácticas académicas, integrando funcionalidades clave como visualización de parciales, creación de prácticas y vinculación con laboratorios y estudiantes.
## Objetivos Específicos
* Desarrollar servicios RESTful con Serverless Framework para gestionar prácticas asociadas a los docentes.

* Construir interfaces en Angular para permitir la creación y visualización de prácticas por parte de los docentes.

* Asegurar el correcto almacenamiento de datos en DynamoDB, incluyendo atributos como fecha límite, descripción y relaciones.

##  Desarrollo 

### Módulo
Realicé una separación del proyecto en dos partes: una para el backend y otra para el frontend.
En la carpeta principal llamada srs, se encuentra la carpeta Back, que contiene toda la lógica del backend. Además, dentro del mismo directorio, creé una carpeta llamada frontend-laboratorio, donde se ubica el código correspondiente a la interfaz de usuario.

![grafico1](https://i.imgur.com/lsuvhLQ.png)

_Descripción: Se creó una carpeta practicas/ donde se alojan todas las funciones Lambda correspondientes a la creación, obtención, eliminación y actualización de prácticas._

### LoginComponent 

En este componente se implementó el sistema de inicio de sesión para la aplicación. El usuario debe ingresar su ID, el cual se envía a través del servicio UsuariosService para verificar su existencia en la base de datos. Si el usuario es válido y tiene un rol asignado (ya sea "docente" o "estudiante"), se guarda la información utilizando el AuthService y se redirige automáticamente a la vista correspondiente usando Router. En caso de que el ID no exista o el rol no esté definido, se muestra un mensaje de alerta. Este componente es independiente (standalone) y utiliza módulos comunes de Angular como CommonModule, FormsModule y RouterModule para gestionar formularios y navegación. Además, se estructura siguiendo buenas prácticas de Angular, facilitando su integración con el resto del sistema.


![grafico2](https://i.imgur.com/3ihvIU1.png)

![grafico3](https://i.imgur.com/neZprsb.png)

### RegistroComponent 

Este componente gestiona el proceso de registro de nuevos usuarios en la aplicación. Se creó un formulario que permite ingresar el nombre, correo y seleccionar el rol (por defecto “estudiante”). Al enviar el formulario, la información es enviada al backend utilizando el servicio UsuariosService, que maneja la lógica para almacenar al nuevo usuario en la base de datos. Si el registro se realiza correctamente, se muestra un mensaje de éxito y se redirige automáticamente al componente de inicio de sesión (/login). Este componente es independiente (standalone) y utiliza FormsModule para enlazar los datos del formulario, RouterModule para navegar entre rutas y CommonModule para funcionalidades comunes de Angular. Su implementación es simple y funcional, pensada para facilitar el acceso a la plataforma tanto a docentes como estudiantes.

![grafico4](https://i.imgur.com/l9eohdE.png)

![grafico5](https://i.imgur.com/yuRWp5l.png)

### ✅ Verificación de Creación de Usuario – Rol Docente 
![grafico1](https://i.imgur.com/pVhF2bH.png)
Se realizó la verificación de ingreso para el usuario Kevin Ordoñez con el rol asignado de Docente.


### Asociación de Materia con Docente – Vinculación por ID

Se agregó una materia desde Postman asociándola al ID del docente, permitiendo establecer una relación directa entre el usuario y sus materias asignadas. Esta configuración garantiza que al consultar las materias, se muestren únicamente aquellas vinculadas específicamente al docente correspondiente.

Evidencia:
![grafico1](https://i.imgur.com/ODQvePm.png)

![grafico1](https://i.imgur.com/6s4S1A6.png)



### Verificación de Visualización de Notas por Materia y Docente

Se confirmó que es posible visualizar las notas de los estudiantes registrados en las materias asociadas al docente correspondiente.
Por ejemplo, el estudiante Valñe Verfa tiene notas asignadas en una materia vinculada al docente, y estas pueden consultarse correctamente mediante la API.

Evidencia:
![grafico1](https://i.imgur.com/JRWZO8K.png)
![grafico1](https://i.imgur.com/ZK8kHLP.png)

### Creación de Prácticas para el Docente – Registro Exitoso
Se realizó la creación de una nueva práctica para el docente, completando todos los campos requeridos mediante una solicitud en Postman. Esta funcionalidad permite al docente registrar prácticas asociadas a sus materias, las cuales quedan correctamente vinculadas a su ID en el sistema.
![grafico1](https://i.imgur.com/IquvFcH.png)

### Visualización de Prácticas Registradas
En la parte inferior se muestran las prácticas registradas, donde se pueden observar claramente todos los datos ingresados para cada práctica asociada al docente.
![grafico1](https://i.imgur.com/Mc5NFxC.png)
## Conclusiones
* Se logró integrar correctamente una aplicación frontend Angular con funciones backend desplegadas en AWS Lambda mediante Serverless Framework, permitiendo una comunicación fluida entre cliente y servidor.

* El uso de componentes standalone, ReactiveForms, y servicios permitió mantener una estructura organizada, lo que facilita el mantenimiento y escalabilidad del sistema.

* El módulo permite al docente gestionar prácticas y parciales de forma centralizada, asociándolos correctamente a usuarios y materias, garantizando una trazabilidad clara de la información.

* La base de datos NoSQL DynamoDB se utilizó correctamente para almacenar y recuperar datos estructurados por tablas, adaptándose bien a las necesidades del sistema sin necesidad de relaciones complejas.

* La diferenciación entre roles de usuario (docente y estudiante) fue implementada exitosamente, permitiendo que cada tipo de usuario acceda únicamente a las funcionalidades permitidas según su perfil.

## Recomendaciones

* Es recomendable implementar validaciones tanto en el frontend como en el backend para evitar el guardado de datos incompletos o inválidos.

* Se sugiere mejorar el formato de fechas y permitir ordenamiento y búsqueda en tablas para una mejor experiencia de usuario.

* Incluir mensajes de error detallados tanto en consola como en interfaz para facilitar la depuración y mejorar la comunicación con el usuario en caso de fallos.
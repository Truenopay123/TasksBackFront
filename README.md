# API REST - CRUD de Microservicios de Gestión de Tareas

Una aplicación basada en microservicios para la gestión de tareas, la autenticación de usuarios y el manejo de datos de usuarios, desarrollada con Flask y SQLite. El sistema consta de cuatro servicios: API Gateway, Servicio de Autenticación, Servicio de Usuario y Servicio de Tareas, orquestados mediante un script Bash.

## Desarrollador
- CORTES CORTES BRYAN AXEL

## Descripción general de los servicios

- API Gateway (Puerto 5000): Transfiere solicitudes a los servicios de autenticación, usuario y tareas.

- Servicio de autenticación (Puerto 5001): Gestiona el registro e inicio de sesión de usuarios con autenticación JWT.

- Servicio de usuario (Puerto 5002): Gestiona los datos de usuario (operaciones CRUD) almacenados en memoria.

- Servicio de tareas (Puerto 5003): Gestiona tareas (operaciones CRUD) con base de datos SQLite y control de acceso basado en JWT.

## API Endpoints

### API Gateway (http://localhost:5000)
- `/auth/<path>` → Al servicio de Auth Service.
- `/user/<path>` → Al servicio de User Service.
- `/task/<path>` → Al servicio de Task Service.

### Authentication Service (http://localhost:5001)
- `POST /auth/register` → Registrar nuevo usario (username, password).
- `GET /auth/login/` → Inicie sesión y reciba el token JWT (username, password).

### User Service (http://localhost:5002)
- `GET /users/1` → Lista de usuarios específicos por nombre de usuario.
- `GET /users_id/<id>` → Obtener el usuario por ID.
- `POST /create_user` → Crear un usuario (username, password).
- `PUT /update_user/<id>` → Actualizar un usuario (username, password).
- `DELETE /users_id/<id>` →  Eliminar un usuario por ID.

### Task Service (http://localhost:5003) (JWT Required)
- `GET /tasks` → Listar todas las tareas.
- `GET /tasks/<id>` → Obtener la tarea por ID
- `POST /register_task` → Crear una tarea (name, description, created_at, dead_line, status, is_alive, created_by).
- `PUT /update_task/<id>` → Actualizar una tarea by ID.
- `PUT /disable_task/<id>` →  Desabilitar a task (is_alive = 0).
- `PUT /enable_task/<id>` →   Habilitar a task (is_alive = 1).
- Nota: El status de la tarea debe ser: En curso, Revisión, Completada, En pausa o Incompleta. Las fechas deben estar en formato AAAA-MM-DD.


## Seguridad
- JWT requerido para todas las rutas protegidas
- Token con expiración de 5 minutos
- Middleware `@token_required` 
- Roles definidos manualmente (admin.) en el mismo token

## Version
Python 3.12.6

## Crear entorno virtual
python3 -m venv venv
En Windows con WSL: source venv/Scripts/activate  o /bin/ depende tu configuracion de tu .sh           

## Instala dependencias
pip install -r requirements.txt

## Start services
El script start_services.sh inicializa el entorno virtual, busca puertos libres (5000–5003) e inicia todos los servicios en segundo plano.
Usando WSL para Windows
1. ./start_services.sh

## Stop services
Usando WSL para Windows
1. ./stop_services.sh


## Instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/nombre_proyecto.git
   cd nombre_proyecto
   
# FRONTEND - De autenticacion de Usuarios (Login-Register)

# Gui

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) 
v20.19.3

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.



# Create project
ng new <project-name>

# Install components UI
npm install primeng @primeng/themes

npm install primeicons

npm install primeflex. (para utilidades css)

## Desarrollador
- CORTES CORTES BRYAN AXEL

# Install components in the WSL
ng generate component shared/components/header

frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── auth/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.guard.ts
│   │   │   │   ├── auth.interceptor.ts
│   │   │   ├── models/
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── task.model.ts
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   ├── login.component.ts
│   │   │   │   │   ├── login.component.html
│   │   │   │   │   ├── login.component.css
│   │   │   │   ├── register/
│   │   │   │   │   ├── register.component.ts
│   │   │   │   │   ├── register.component.html
│   │   │   │   │   ├── register.component.css
│   │   │   │   ├── auth.routes.ts
│   │   │   ├── tasks/
│   │   │   │   ├── task-list/
│   │   │   │   │   ├── task-list.component.ts
│   │   │   │   │   ├── task-list.component.html
│   │   │   │   │   ├── task-list.component.css
│   │   │   │   ├── task-create/
│   │   │   │   │   ├── task-create.component.ts
│   │   │   │   │   ├── task-create.component.html
│   │   │   │   │   ├── task-create.component.css
│   │   │   │   ├── tasks.service.ts
│   │   │   │   ├── tasks.routes.ts
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   │   ├── header.component.ts
│   │   │   │   │   ├── header.component.html
│   │   │   │   │   ├── header.component.css
│   │   │   ├── shared.module.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.routes.ts
│   ├── assets/
│   ├── styles.css
│   ├── main.ts
│   ├── index.html
├── angular.json
├── package.json
├── tsconfig.json

## Instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/nombre_proyecto.git
   cd nombre_proyecto

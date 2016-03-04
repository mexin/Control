//Roles y permisos para Base de Datos
Briefs.permit(['insert', 'update', 'remove']).ifHasRole('admin').apply();
Briefs.permit(['update']).ifHasRole('empleado').apply();
Proyectos.permit(['insert', 'update', 'remove']).ifHasRole('admin').apply();
Proyectos.permit(['update']).ifHasRole('empleado').apply();
Clientes.permit(['insert', 'update', 'remove']).ifHasRole('admin').apply();
Tareas.permit(['insert', 'update', 'remove']).ifHasRole('admin').apply();
Tareas.permit(['insert', 'update', 'remove']).ifHasRole('empleado').apply();
Notifications.permit(['insert', 'update', 'remove']).ifHasRole('admin').apply();
Notifications.permit(['insert', 'update', 'remove']).ifHasRole('empleado').apply();
Comentarios.permit(['insert', 'update', 'remove']).ifHasRole('admin').apply();
Comentarios.permit(['insert', 'update', 'remove']).ifHasRole('empleado').apply();
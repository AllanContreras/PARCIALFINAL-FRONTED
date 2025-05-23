# Frontend - ECI Salud Vital

**Nombre:** [Tu Nombre Aquí]  
**Grupo:** [CVDS - Grupo X]  
**Tecnologías:** Next.js 14, Tailwind CSS, Axios

## Descripción

Aplicación web para agendar y consultar citas médicas en la clínica ECI Salud Vital.

## Páginas

- `/`: Página principal con especialidades (2x2).
- `/especialidad/[id]`: Detalle de especialidad + botón de agendar.
- `/cita`: Formulario para agendar cita.
- `/historial?correo=usuario@ejemplo.com`: Historial de citas del usuario.

## Capturas de Pantalla

### Inicio
![inicio](./screenshots/inicio.png)

### Detalle
![detalle](./screenshots/detalle.png)

### Formulario
![formulario](./screenshots/formulario.png)

### Historial
![historial](./screenshots/historial.png)

## Cómo Ejecutar

```bash
npm install
npm run dev
```

Modificar `.env.local` con la URL del backend:

```
NEXT_PUBLIC_BACKEND_URL=https://TU_BACKEND.azurewebsites.net
```

---
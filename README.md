# 🧠 SQLMIND CLI

**Tu agente de IA para SQL**

Convierte fácilmente lenguaje natural en consultas SQL precisas con un solo prompt. SQLMIND CLI utiliza inteligencia artificial para transformar tus descripciones en español en consultas SQL optimizadas y listas para usar.

![SQLMIND CLI Banner](https://img.shields.io/badge/SQLMIND-CLI-cyan?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)
![Node.js](https://img.shields.io/badge/node.js-%3E%3D16.0.0-green?style=flat-square)

## ✨ Características

- 🤖 **IA Avanzada**: Convierte lenguaje natural a SQL con precisión
- 🚀 **Fácil de usar**: Interface de línea de comandos intuitiva
- 🎨 **Salida colorizada**: Resultados visualmente atractivos
- ⚡ **Rápido**: Genera consultas SQL en segundos
- 🔍 **Validación inteligente**: Verifica la entrada del usuario
- 💡 **Ejemplos incluidos**: Aprende con casos de uso reales

## 🛠️ Instalación

### Requisitos previos
- Node.js >= 16.0.0
- npm o yarn

### Instalación global
```bash
npm install -g sqlmind-cli
```

### Instalación local
```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/sqlmind-cli.git
cd sqlmind-cli

# Instala las dependencias
npm install

# Hace el CLI ejecutable globalmente
npm link
```

## ⚙️ Configuración

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`:

```bash
cp .env.example .env
```

Configura tu clave de API de IA en el archivo `.env`:

```env
# Configuración de la API de IA
API_KEY=tu_clave_de_api_aqui
```

> **⚠️ Importante**: Nunca subas tu archivo `.env` al repositorio. Mantén tus claves de API seguras.

## 🚀 Uso

### Comando principal
```bash
sqlmind init
```

### Ver ejemplos
```bash
sqlmind examples
# o usando el alias
sqlmind ex
```

### Ayuda
```bash
sqlmind --help
```

## 📋 Ejemplos de uso

### Ejemplo básico
```bash
$ sqlmind init
🧠 SQLMIND CLI
Tu agente de AI para SQL
Convierte fácilmente lenguaje natural en consultas SQL precisas con un solo prompt

? ¿Qué consulta SQL necesitas? Descríbelo en lenguaje natural: Dame todos los usuarios mayores a 18 años

🤖 Procesando consulta con IA...
✅ SQL generado exitosamente!

📋 Tu consulta SQL:
──────────────────────────────────────────────────
SELECT * FROM usuarios WHERE edad > 18;
──────────────────────────────────────────────────

💡 Tip: Puedes copiar y pegar esta consulta en tu base de datos
```

### Consultas que puedes hacer

#### 📊 **Consultas de datos básicas**
```
Entrada: "Muestra todos los productos con precio mayor a 100"
Salida: SELECT * FROM productos WHERE precio > 100;

Entrada: "Dame los 10 clientes con más compras"
Salida: SELECT * FROM clientes ORDER BY total_compras DESC LIMIT 10;
```

#### 🔍 **Consultas con filtros complejos**
```
Entrada: "Usuarios registrados en los últimos 30 días que sean de México"
Salida: SELECT * FROM usuarios WHERE fecha_registro >= DATE_SUB(NOW(), INTERVAL 30 DAY) AND pais = 'México';

Entrada: "Productos agotados o con menos de 5 unidades en stock"
Salida: SELECT * FROM productos WHERE stock = 0 OR stock < 5;
```

#### 📈 **Consultas con agregaciones**
```
Entrada: "Promedio de ventas por mes del último año"
Salida: SELECT MONTH(fecha_venta) as mes, AVG(total) as promedio_ventas 
        FROM ventas 
        WHERE fecha_venta >= DATE_SUB(NOW(), INTERVAL 1 YEAR) 
        GROUP BY MONTH(fecha_venta);

Entrada: "Cuenta cuántos pedidos hay por estado"
Salida: SELECT estado, COUNT(*) as total_pedidos FROM pedidos GROUP BY estado;
```

#### 🔗 **Consultas con JOINs**
```
Entrada: "Muestra el nombre del cliente y el total de sus pedidos"
Salida: SELECT c.nombre, SUM(p.total) as total_pedidos 
        FROM clientes c 
        JOIN pedidos p ON c.id = p.cliente_id 
        GROUP BY c.id, c.nombre;

Entrada: "Productos vendidos con el nombre de la categoría"
Salida: SELECT p.nombre, c.categoria, v.cantidad 
        FROM productos p 
        JOIN categorias c ON p.categoria_id = c.id 
        JOIN ventas v ON p.id = v.producto_id;
```

#### 📅 **Consultas temporales**
```
Entrada: "Ventas de hoy"
Salida: SELECT * FROM ventas WHERE DATE(fecha_venta) = CURDATE();

Entrada: "Top 5 productos más vendidos esta semana"
Salida: SELECT p.nombre, SUM(v.cantidad) as total_vendido 
        FROM productos p 
        JOIN ventas v ON p.id = v.producto_id 
        WHERE v.fecha_venta >= DATE_SUB(NOW(), INTERVAL 1 WEEK) 
        GROUP BY p.id, p.nombre 
        ORDER BY total_vendido DESC 
        LIMIT 5;
```

## 🎯 Casos de uso avanzados

### E-commerce
- "Productos más vistos pero menos comprados"
- "Clientes que abandonaron el carrito en los últimos 7 días"
- "Ingresos por categoría de producto este trimestre"
- "Descuentos aplicados por rango de edad de clientes"

### Análisis de usuarios
- "Usuarios activos que no han hecho compras en 3 meses"
- "Distribución de usuarios por ciudad y género"
- "Tiempo promedio entre registro y primera compra"
- "Usuarios que se registraron pero nunca iniciaron sesión"

### Reportes financieros
- "Comparar ventas del mes actual vs el anterior"
- "Productos con mayor margen de ganancia"
- "Clientes con facturas pendientes de pago"
- "Análisis de retorno de inversión por campaña"

## 🛠️ Desarrollo

### Scripts disponibles
```bash

# Compilar TypeScript e inicializar ekl proyecto
npm run build
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si encuentras algún problema o tienes preguntas:

- 🐛 [Reportar un bug](https://github.com/tu-usuario/sqlmind-cli/issues)
- 💡 [Solicitar una feature](https://github.com/tu-usuario/sqlmind-cli/issues)  
- 📧 Email: fainnerramirez@gmail.com

---

**¿Te gusta SQLMIND CLI?** ⭐ ¡Dale una estrella al repositorio!

```bash
# ¡Prueba SQLMIND CLI ahora!
npm install -g sqlmind-cli
sqlmind init
```
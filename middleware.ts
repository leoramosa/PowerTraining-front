// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken"; // Para decodificar el token JWT

// export function middleware(req: NextRequest) {
//   // Obtener el token JWT de la cookie
//   const token = req.cookies.get("authToken")?.value;

//   // Si no hay token, redirigir al login
//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     // Decodificar el token JWT para extraer el rol del usuario
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const userRole = decoded.role; // Suponiendo que el rol está incluido en el token
//     const currentPath = req.nextUrl.pathname;

//     // Proteger la ruta '/dashboard/chat' solo para admins
//     if (currentPath.startsWith("/dashboard/chat")) {
//       if (userRole !== "admin") {
//         // Si no es admin, redirigir a la página de 'No autorizado'
//         return NextResponse.redirect(new URL("/unauthorized", req.url));
//       }
//     }
//   } catch (error) {
//     // Si el token es inválido o ha expirado, redirigir al login
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   // Continuar con la solicitud si el usuario tiene acceso
//   return NextResponse.next();
// }

// // Configurar el matcher para aplicar el middleware solo a rutas protegidas
// export const config = {
//   matcher: ["/dashboard/chat"],
// };

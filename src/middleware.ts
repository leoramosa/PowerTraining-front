// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken"); // Obtenemos el token de la cookie

  const publicRoutes = ["/login", "/signup", "/"]; // Rutas públicas, incluyendo el Home

  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next(); // Permitir acceso a rutas públicas
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=auth", req.url)); // Redirigir a login con un mensaje de error
  }

  return NextResponse.next(); // Permitir acceso a rutas protegidas
}

// Definir qué rutas aplicar middleware
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/pricing/:path*"], // Rutas protegidas
};

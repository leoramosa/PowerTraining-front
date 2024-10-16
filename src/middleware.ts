import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode"; // Asegúrate de tener esta librería instalada

interface TokenPayload {
  role: string; // Asumimos que el token contiene el rol del usuario
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken"); // Obtenemos el token de la cookie

  const publicRoutes = [
    "/login",
    "/signup",
    "/",
    "/reset-password",
    "/reset-password-confirm",
  ]; // Rutas públicas

  // Si hay un token, decodificamos para obtener el rol
  let decodedToken: TokenPayload | null = null;
  if (token) {
    try {
      decodedToken = jwtDecode(token.value);
    } catch (error) {
      return NextResponse.redirect(new URL("/", req.url)); // Si el token es inválido
    }
  }

  // Redirigir a /dashboard si el usuario está logueado y accede a rutas públicas
  if (decodedToken && publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirigir a dashboard si está logueado
  }

  // Si el token no está presente, redirigir a login
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Validar acceso a rutas restringidas según el rol
  if (decodedToken) {
    // Rutas solo para el Admin
    const adminRoutes = [
      "/dashboard/exercise",
      "/dashboard/reports",
      "/dashboard/routine",
      "/dashboard/trash",
    ];

    // Rutas solo para el User
    const userRoutes = ["/dashboard/client/routine"];

    if (
      adminRoutes.includes(req.nextUrl.pathname) &&
      decodedToken.role !== "Admin"
    ) {
      return NextResponse.redirect(
        new URL("/dashboard?error=not-authorized", req.url)
      ); // Redirigir si no es Admin
    }

    if (
      userRoutes.includes(req.nextUrl.pathname) &&
      decodedToken.role !== "User"
    ) {
      return NextResponse.redirect(
        new URL("/dashboard?error=not-authorized", req.url)
      ); // Redirigir si no es User
    }
  }

  return NextResponse.next(); // Permitir acceso a rutas protegidas
}

// Definir qué rutas aplicar middleware
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/pricing/:path*",
    "/dashboard/client/routine",
    "/dashboard/exercise",
    "/dashboard/reports",
    "/dashboard/routine",
    "/dashboard/trash",
  ], // Rutas protegidas
};

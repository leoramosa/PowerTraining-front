import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  role: string;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value; // Obtenemos el token de la cookie
  const publicRoutes = [
    "/login",
    "/register",
    "/",
    "/reset-password",
    "/reset-password-confirm",
    "/register/trainer",
  ]; // Rutas públicas

  // Verificamos si estamos en una ruta pública
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);

  // Si hay token y el usuario intenta acceder a rutas públicas, redirigimos a /dashboard
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Si no hay token y el usuario intenta acceder a rutas protegidas, lo redirigimos a /login
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Si hay token, decodificamos para obtener el rol
  let decodedToken: TokenPayload | null = null;
  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      // Si el token es inválido, redirigir a la página de login
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Validar acceso a rutas restringidas según el rol
  if (decodedToken) {
    const adminRoutes = [
      "/dashboard/exercise",
      "/dashboard/reports",
      "/dashboard/routine",
      "/dashboard/trash",
      "/dashboard/chats",
      "/register/trainer",
      "/pricing",
    ];
    const userRoutes = ["/dashboard/client/routine"];

    // Si el usuario intenta acceder a rutas de Admin sin ser Admin
    if (
      adminRoutes.includes(req.nextUrl.pathname) &&
      decodedToken.role !== "Admin"
    ) {
      return NextResponse.redirect(
        new URL("/dashboard?error=not-authorized", req.url)
      );
    }

    // Si el usuario intenta acceder a rutas de User sin ser User
    if (
      userRoutes.includes(req.nextUrl.pathname) &&
      decodedToken.role !== "User"
    ) {
      return NextResponse.redirect(
        new URL("/dashboard?error=not-authorized", req.url)
      );
    }
  }

  return NextResponse.next(); // Permitir acceso a rutas protegidas
}

// Definir en qué rutas se aplica el middleware
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
    "/register/trainer",
    "/login",
    "/register",
    "/superadmin/:path*",
  ], // Rutas protegidas y públicas que queremos manejar
};

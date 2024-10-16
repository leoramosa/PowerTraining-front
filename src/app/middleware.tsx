// // middleware.ts
// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server'; // Importar NextRequest

// export function middleware(request: NextRequest) { // Especificar el tipo
//   const token = request.cookies.get('authToken');

//   if (!token) {
//     return NextResponse.redirect(new URL('/', request.url)); // Redirigir si no hay token
//   }

//   // Aquí podrías validar el token, por ejemplo, usando una función que verifique su firma
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard','/dashboard/admin/exercise',
//     '/dashboard/admin/trash'
//   ], // Rutas donde deseas aplicar el middleware
// };

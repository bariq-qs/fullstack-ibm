import { H3Event } from 'h3';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event: H3Event) => {
  const isProtect = await protectAuthRoute(event)
  if (isProtect) {
    const authHeader = event.node.req.headers['authorization'];
    if (!authHeader) {
      throw createError({statusCode: 401, message: 'Authorization header missing'});
    }

    const token = authHeader.split(' ')[1]; // Assuming the token comes as "Bearer token"

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      event.context.user = decoded; // You can attach the user data to the event context
    } catch (error) {
      throw createError({statusCode: 403, message: 'Invalid token'});
    }
  }
});


function protectAuthRoute(event: H3Event) {
  const protectedRoutes = [
    '/api/products',
  ]
  const originalPath = event.path.split('?')[0]
  const findPath = protectedRoutes.find((v) => originalPath.startsWith(v))
  return Boolean(findPath)
}
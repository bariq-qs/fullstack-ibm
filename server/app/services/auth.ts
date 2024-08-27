import { getUserByUsername } from "~/server/app/repositories";
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { type user as TUser } from '@prisma/client'
import { H3Event } from "h3";
import { compare } from "bcrypt";
import type { TLoginSchema } from "~/utils/schema/user";

dotenv.config()

class AuthService {
  async getDetailUserByUsername(username: string) {
    return await getUserByUsername(username)
  }

  generateToken(user: TUser) {
    return jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET);
  }

  authMiddleware(event: H3Event) {
    const token = getCookie(event, 'auth_token')
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          throw createError({
            statusCode: 401,
            message: 'Token is not valid'
          })
        }
        return decoded;
      });
    } else {
      throw createError({
        statusCode: 401,
        message: 'No token provided'
      })
    }
  }

  async login(event: H3Event, user: TLoginSchema) {
    try {
      const findUser = await getUserByUsername(user.username)
      if (findUser) {
        const isPasswordValid = await compare(
            user.password,
            findUser.password_hash
        )
        if (!isPasswordValid) {
          throw createError({
            statusCode: 403,
            message: 'Password not valid.'
          })
        }
        const token = await this.generateToken(findUser)
        setCookie(event, 'auth_token', token)
        const profile = {
          username: findUser.username,
          id: findUser.id,
        }
        setCookie(event, 'profile', JSON.stringify(profile))
        return {
          ...profile,
          token
        }
      }
      throw createError({
        statusCode: 403,
        message: 'User not found.'
      })
    } catch (err) {

    }
  }
}

const authService = new AuthService();

export {
  authService
}
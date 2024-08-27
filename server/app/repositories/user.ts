import prisma from "~/lib/prisma";

export async function getUserByUsername (username: string) {
  return await prisma.user.findFirst({
    where: { username },
    select: {
      username: true,
      id: true,
      password_hash: true
    }
  })
}
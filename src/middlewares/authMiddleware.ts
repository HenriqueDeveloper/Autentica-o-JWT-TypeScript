import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../helpers/api-erros'
import { userRepository } from '../repositories/userRepository'
import jwt from 'jsonwebtoken'
import { Roles } from '../enums/roles.enum'
import { User } from '../entities/User'

type JwtPayload = {
	id: number
}

export const authMiddleware = (roles: string[]) => {
  return  async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {

	const { authorization } = req.headers

  	  if (!authorization) {
		  throw new UnauthorizedError('Não autorizado')
	   }

	  const token = authorization.split(' ')[1]

	  const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

	  const user = await userRepository.findOneBy({ id })

	  if (!user) {
		  throw new UnauthorizedError('Não autorizado')
	   }

	  if(!roles.includes(user.role)) {
          throw new UnauthorizedError("Usuário não tem permissão")
	  }

	  const {...valores} = user

	  req.user = valores

	  next()
}
}


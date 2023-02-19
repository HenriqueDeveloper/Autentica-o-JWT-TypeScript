import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { Roles } from './enums/roles.enum'
import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()

routes.post('/user', new UserController().create)
routes.post('/login', new UserController().login)

routes.use(authMiddleware([Roles.ADMIN]))

routes.get('/profile', new UserController().getMe)

export default routes

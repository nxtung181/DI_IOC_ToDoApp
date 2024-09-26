import { TaskController } from "./controllers/task.controller";
import { UserController } from "./controllers/user.controller";
import { TaskRepository } from "./repositories/task.repo";
import { TokenRepository } from "./repositories/token.repo";
import { UserRepository } from "./repositories/user.repo";
import { TaskRoute } from "./routes/taskRoute";
import { UserRoute } from "./routes/userRoute";
import { TaskService } from "./services/task.service";
import { UserService } from "./services/user.service";

export class TodoFactory {
    static createUserRoute(): UserRoute {
        const userRepository = new UserRepository()
        const tokenRepository = new TokenRepository()
        const userService = new UserService(userRepository, tokenRepository);
        const userController = new UserController(userService)
        return new UserRoute(userController);
    }

    static createTaskRoute(): TaskRoute {
        const taskRepository = new TaskRepository()
        const taskService = new TaskService(taskRepository)
        const taskController = new TaskController(taskService)
        return new TaskRoute(taskController)
    }
}
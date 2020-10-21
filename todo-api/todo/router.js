import TodoController from './controller';

const router = require('express').Router();

router.get('/', TodoController.ToDoList)
router.post('/', TodoController.AddToDo)
router.put('/', TodoController.AddToDo)
router.put('/status', TodoController.SetStatus)
router.delete('/:id', TodoController.DeleteToDo)

export default router;
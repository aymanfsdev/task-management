import { client } from '../../prisma/client.js';
export class TaskController {
    async getTasks(req, res) {
        const tasks = await client.task.findMany({ orderBy: { createdAt: 'asc' } });
        res.json(tasks);
    }
    async addTask(req, res) {
        const task = await client.task.create({ data: req.body });
        res.json(task);
    }
    async deleteTask(req, res) {
        const tasks = await client.task.delete({ where: { id: req.params.id } });
        res.json(tasks);
    }
    async updateTask(req, res) {
        const task = await client.task.update({
            where: { id: req.params.id },
            data: { ...req.body },
        });
        res.json(task);
    }
}
//# sourceMappingURL=task.js.map
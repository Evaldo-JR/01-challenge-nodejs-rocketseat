import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';
import { importCSV } from './utils/import-csv.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query;

      let tasks = database.select('tasks');

      if (search) {
        /**
         * Para evitar queda de desempenho na busca quando
         * o banco de dados houver muitas tasks, não buscamos
         * valores em todas as propriedades.
         */
        tasks = tasks.filter(
          (task) =>
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title?.trim() || !description?.trim()) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Título e descrição são obrigatórios.' }));
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      database.insert('tasks', task);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      // Retorna a task atualizada para o frontend caso seja útil.
      return res.end(JSON.stringify(task));
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      // Valida se os dados são válidos.
      if (!title?.trim() && !description?.trim()) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Pelo menos um campo deve ser atualizado.' }));
      }

      const updatedTask = database.update('tasks', id, { title, description });

      if (!updatedTask) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Tarefa não encontrada.' }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      // Retorna a task atualizada para o frontend caso seja útil.
      return res.end(JSON.stringify(updatedTask));
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete('tasks', id);

      return res.writeHead(204).end();
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;

      const updatedTask = database.update('tasks', id, { completed_at: true });

      if (!updatedTask) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Tarefa não encontrada.' }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      // Retorna a tarefa atualizada com todos os campos
      return res.end(JSON.stringify(updatedTask));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks/import'),
    handler: async (req, res) => {
      try {
        const filePath = new URL('./assets/csv/tasks.csv', import.meta.url);
        const tasks = await importCSV(filePath);

        for (const task of tasks) {
          database.insert('tasks', {
            id: randomUUID(),
            title: task.title,
            description: task.description,
            completed_at: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }

        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Importação concluída com sucesso!' }));
      } catch (error) {
        console.log(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Erro ao importar CSV.' }));
      }
    },
  },
];

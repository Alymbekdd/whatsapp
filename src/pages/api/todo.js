let todos = []

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(todos);
    }else if(req.method === 'POST') {
        const {task} = req.body;
        const newTodo = {id: Math.round(Math.random()*1000), task, completed: false};
        todos.push(newTodo);
        res.status(201).json(newTodo);
    }else if(req.method === 'PUT') {
        const {id} = req.query;
        const {task, completed} =req.body;
        const index = todos.findIndex(todo => todo.id === parseInt(id));
        todos[index] = {id: parseInt(id), task, completed};
        res.status(200).json(todos[index]);
    }else if(req.method === 'DELETE') {
      const {id} = req.query;
      todos = todos.filter(todo => todo.id !== parseInt(is));
      res.status(200).json({message: 'Todo deleted successfully'});
    }else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
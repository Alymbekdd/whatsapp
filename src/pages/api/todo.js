let todos = []

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(todos);
    }else if(req.method === 'POST') {
        const {task} = req.body;
        const newTodo = {id: Math.round(Math.random()*1000), task, completed: false};
        todos.push(newTodo);
        res.status(201).json(newTodo);
    }else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

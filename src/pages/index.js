import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";



export default function Home() {
    const [todoArry, setTodoArry] = useState([]);
    const [task, setTask] = useState('');
    const autoScrol = useRef(null)

    useEffect(()=> {
        autoScrol.current?.scrollTo({
            top:autoScrol.current.scrollHeight,
            behavior:'smooth'
        })
    })

    useEffect(() => {
        fetchTodos();
    }, [])

    useEffect(() => {
        const storeTodo = localStorage.getItem('todoArry')
        if (storeTodo) {
            setTodoArry(JSON.parse(storeTodo))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('todoArry', JSON.stringify(todoArry))
    }, [todoArry])

    const fetchTodos = async () => {
        const response = await axios.get('/api/todo');
        setTodoArry(response.data)
    }

    const addTodo = async () => {
        try {
            if (!task) return;
            const response = await axios.post('/api/todo', { task })
            setTodoArry([...todoArry, response.data])
            setTask('')
        } catch (error) {
            console.log(error.response)
        }

    }


    return (


        <div className={styles.container}>
            <h2 className={styles.title}>Alymbek WhatsApp</h2>
            <ul className={styles.ul} ref={autoScrol}>
                    {todoArry.map(todo => (
                        <li className={styles.li} key={todo}><span>{todo.task}</span></li>
                    ))}
                </ul>

                <div className={styles.inputContainer}>
                    <input className={styles.input} type="text" value={task} onChange={(e) => setTask(e.target.value)} />
                    <button className={styles.btn} onClick={addTodo}>Add</button>
                </div>
        </div>


    )

}

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [tarefasConcluidas, setTarefasConcluidas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    const tarefasConcluidasSalvas = localStorage.getItem("tarefasConcluidas");

    if (tarefasSalvas) setTarefas(JSON.parse(tarefasSalvas));
    if (tarefasConcluidasSalvas) setTarefasConcluidas(JSON.parse(tarefasConcluidasSalvas));
    
  }, []);

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  useEffect(() => {
    localStorage.setItem("tarefasConcluidas", JSON.stringify(tarefasConcluidas));
  }, [tarefasConcluidas]);

  const adicionarTarefa = (tarefa) => {
    const texto = tarefa.trim();
    if (!texto) return;
    if (tarefas.includes(texto) || tarefasConcluidas.includes(texto)) return;

    setTarefas((prev) => [...prev, texto]);
    setNovaTarefa("");
  };

  const concluirTarefa = (tarefa) => {
    setTarefas((prev) => prev.filter((t) => t !== tarefa));
    setTarefasConcluidas((prev) => [...prev, tarefa]);
  };
  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>
      <div className="container1">
        <h1>TAREFAS A FAZER ALTERADA</h1>
        <div className="container3">
          <input
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="Digite o nome de uma tarefa"
          />
          <button onClick={() => adicionarTarefa(novaTarefa)}>Adicionar...</button>
        </div>
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa}>
              {tarefa} <button onClick={() => concluirTarefa(tarefa)}>Concluir</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="container2">
        <h1>Tarefas Completas</h1>
        <ul>
          {tarefasConcluidas.map((tarefa) => (
            <li key={tarefa}>{tarefa}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App
import React ,{useState, useEffect}from "react";

import "./styles.css";
import api from "./services/api"

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get("/repositories")
    .then(response => {
      setRepositories(response.data)
    })
  })

  async function handleAddRepository() {
    await api.post("/repositories", {
      url: Date.now(),
      title: "Repo "+Date.now(),
      techs: ["eetet", "qeqtte"]
    })
  }

  async function handleRemoveRepository(id) {
    await api.delete("/repositories/"+id)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repository => (

          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

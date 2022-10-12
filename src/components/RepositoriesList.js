import { useEffect, useState } from 'react';
import axios from 'axios';

const RepositoriesList = (props) => {
    const { repositoriesUrl } = props;
    const [repositoriesList, setRepositoriesList] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await axios.get(repositoriesUrl);
            setRepositoriesList(result.data);
        })();
    }, [repositoriesUrl]);

    return <div>
        {!repositoriesList.length && <p>No repositories found.</p>}
        {repositoriesList.length && 
            <ul>
                {repositoriesList.map(repository => <li key={repository.id}>
                    console.log(repository);
                    <a href={repository.html_url} target="_blank" rel="noreferrer">{repository.name}</a>
                    <p>Created at: {Date(repository.created_at)}</p>
                    <div>
                        <p>Forks count: {repository.forks_count}</p>
                        <p>Forks: <a href={repository.forks_url} alt="Forks link" target="_blank">{repository.forks_url}</a></p>
                    </div>
                    
                </li>)}
            </ul>
        }
    </div>
}

export default RepositoriesList;
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import RepositoriesList from './components/RepositoriesList';

function App() {
  const [userSearch, setUserSearch] = useState();
  const [foundUser, setFoundUser] = useState();

  // search request
  const getFormRequest = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${userSearch}`);
      setFoundUser(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const searchForUser = (e) => {
    e.preventDefault();
    getFormRequest();
  }

  return (
    <div className="App">
      <header className="App-header">
          <h1>GitHub Gist Users</h1>
          <h3>Search for a User:</h3>
          <form onSubmit={searchForUser}>
            <input 
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)} 
              placeholder="Enter a username..." 
            />
            <button>Search</button> 
          </form>

          {foundUser && 
            <div>
              <h3>{foundUser.name}</h3>
              <img src={foundUser.avatar_url} alt={foundUser.name} width="80" height="80" />
              <div>
                <div><p><strong>Name: </strong>{foundUser.name}</p></div>
                <div><p><strong>Company: </strong>{foundUser.company}</p></div>
                <div><p><strong>Followers: </strong>{foundUser.followers}</p></div>
                <div><p><strong>Public Gists: </strong>{foundUser.public_gists}</p></div>
              </div>
              <div>
                <h4>Repositories:</h4>
                <RepositoriesList repositoriesUrl={foundUser.repos_url}>

                </RepositoriesList>
              </div>
            </div>
          }
      </header>
    </div>
  );
}

export default App;

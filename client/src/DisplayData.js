import React, {useState} from 'react'; 
import { useQuery, gql, useLazyQuery } from '@apollo/client';

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
    }
  }
`
const GET_USER_BY_NAME = gql`
  query User($username: String!) {
    user(username: $username){
      name
      age
      username
    }
  }
`

function DisplayData() {
  const [userSearch, setUserSearch] = useState("");
  const {data, loading, error} = useQuery(QUERY_ALL_USERS);
  const [
    fetchUser,
    {data: userSearchedData, error: userError}
  ] = useLazyQuery(GET_USER_BY_NAME);

  if(loading){
    return <div>Loading...</div>
  }


  if (error) {
    console.log(error);
  }

  return (
    <div>
      {data && data.users.map((user) => {
        return (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <h2>{user.age}</h2>
            <h2>{user.username}</h2>
          </div>
        )
      })}
      <div>
        <input
          type="text"
          placeholder="Interstellar..."
          onChange={(event) => {
            setUserSearch(event.target.value);
          }} 
        />
        <button
          onClick={() => {
            fetchUser({
              variables: {
                username: userSearch,
              },
            });
          }}
        >
          Fetch Data
        </button>
      </div>
      
      <div>
        {
          userSearchedData &&
          <div>
            <h2>{userSearchedData.user.name}</h2>
            <h2>{userSearchedData.user.age}</h2>
            <h2>{userSearchedData.user.username}</h2>
          </div>
        }
      </div>
    </div>
  )
}

export default DisplayData
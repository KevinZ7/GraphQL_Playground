const {UserList, MovieList} = require('../fakeData');

const resolvers = {
  Query: {
    //user resolvers
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const {id,username} = args;
      return UserList.find(user => user.id === Number(id) || user.username === username);
    },


    //movie resolvers
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const {name} = args;
      const movie = MovieList.find(movie => movie.name === name);
      return movie;
    }

  },
  User: {
    favoriteMovies: (parent) => {
      return MovieList.filter(movie => movie.yearOfPublication>= 2000 && movie.yearOfPublication <= 2010);
    }
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },
    updateUsername: (parent, args) => {
      const {id, newUserName} = args.input;
      let userUpdate;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUserName;
          userUpdate = user;
        }
      })
      return userUpdate;
    },
    deleteUser: (parent, args) => {
      const {id} = args;
      const removeIndex = UserList.findIndex((user) => user.id === Number(id));

      UserList.splice(removeIndex,removeIndex)

      return null;
    }
  }
}

module.exports = {resolvers};
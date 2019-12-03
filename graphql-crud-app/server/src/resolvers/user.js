import { fileUpload, url } from '../utils'

// dummy data
let users = [
  { id: '1', username: 'Future Namalumbe', email: 'Future@gmail.com', avatarUrl:`${url}future.jpg`, createdAt: new Date() },
  { id: '2', username: 'Anna kay', email: 'Anna@gmail.com', avatarUrl:`${url}anna.jpg`, createdAt: new Date() },
  { id: '3', username: 'John Smith', email: 'John@gmail.com', avatarUrl:`${url}john.jpg`, createdAt: new Date() },
  { id: '4', username: 'Sophie Bel', email: 'sophie@gmail.com', avatarUrl:`${url}sophie.png`, createdAt: new Date() }
]

export default {
  Query: {
    users: async () => users,
    
    user: async (_, { id }) => users.find(user => user.id === id)
  },

  Mutation: {
    createUser: async (_, args) => {
      const { filepath } = args.file ? await fileUpload(args.file) : {}

      if (filepath) args.avatarUrl = filepath

      args.id = users.length + 1

      args.createdAt = new Date()

      users = [args, ...users]

      return args
    },

    updateUser: async (_, args) => {
      const user = users.find(user => user.id == args.id)

      users = users.filter(user => user.id != args.id)

      const { filepath } = args.file ? await fileUpload(args.file) : {}

      if (filepath) user.avatarUrl = filepath

      if (args.username) user.username = args.username

      if (args.email) user.email = args.email

      users = [user, ...users]

      return user
    },

    deleteUser: async (_, { id }) => {
      users = users.filter(user => user.id != id)

      return !!users
    }
  }

}

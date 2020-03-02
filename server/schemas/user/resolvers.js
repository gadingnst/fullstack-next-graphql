// hardcode for user data. just for fake database.
const users = [
    { id: 1, name: 'Sutan Gading Fadhillah Nasution', email: 'sutan.gnst@gmail.com' },
    { id: 2, name: 'Rina Mardiana', email: 'rinamardiana099@gmail.com' }
]

export const Mutation = {
    addUser(_, { name, email }) {
        const user = {
            id: users.length + 1,
            name,
            email
        }
        users.push(user)
        return user
    },

    editUser(_, params) {
        const user = users.find(user => user.id == params.id)
        delete params.id

        if (user) {
            for (const key in params) {
                users[users.indexOf(user)][key] = params[key]
            }
            return user
        }

        return {}
    },

    deleteUser(_, { id }) {
        const user = users.find(user => user.id == id)
        if (user) {
            users.splice(users.indexOf(user), 1)
            return user
        }

        return {}
    }
}

export const Query = {
    users(_, { name }) {
        return name
            ? users.filter(user => user.name.includes(name))
            : users
    },
    
    user(_, { id }) {
        return users.find(user => user.id == id)
    }
}

export default { Mutation, Query }

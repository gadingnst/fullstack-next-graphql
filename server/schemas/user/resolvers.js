// hardcode for user data. just for test 
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
    }
}

export const Query = {
    users() {
        return users
    },
    
    user(_, { id }) {
        return users.find(user => user.id == id)
    }
}

export default { Mutation, Query }

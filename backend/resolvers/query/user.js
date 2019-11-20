const resolver = {}

// hardcode for user data. just for test 
users = [
    { id: 1, name: 'Sutan Gading Fadhillah Nasution', email: 'sutan.gnst@gmail.com' },
    { id: 2, name: 'Rina Mardiana', email: 'rinamardiana099@gmail.com' }
]

resolver.users = () => users

resolver.user = (_, { id }) => {
    console.log(_)
    return users.find(user => user.id == id)
}

module.exports = resolver
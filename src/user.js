import { v4, validate as uuidVAlidate } from 'uuid'
export class User {
    constructor(name, userName, age, hobbies) {
        this.id = v4()
        this.age = age;
        this.name = name
        this.userName = userName
        this.hobbies = hobbies
    }
    static users = []
    static addUser(user) {
        if (user.name && user.userName && user.age && Array.isArray(user.hobbies)) {
            User.users.push(new User(user.name, user.userName, user.age, user.hobbies))
            return 201
        }
        return 400
    }
    static getUser(userId) {
        return User.users.filter(user => user.id === userId)[0]
    }
    static removeUser(userId) {
        if (!uuidVAlidate(userId)) return { status: 400, message: 'Id is not valid' }
        let user = User.users.filter(item => item.id === userId)
        if (!user[0]) return { status: 404, message: 'User not found' }
        let index = User.users.findIndex(user => User.id === userId)
        this.users.splice(index, 1)
        return { status: 204, message: 'Ok' }


    }
}
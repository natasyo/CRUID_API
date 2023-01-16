import { v4 } from 'uuid'
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
            this.users.push(new User(user.name, user.userName, user.age, user.hobbies))
            return 201
        }
        return 400
    }
    static getUser(userId) {
        return this.users.filter(user => user.id === userId)[0]
    }
}
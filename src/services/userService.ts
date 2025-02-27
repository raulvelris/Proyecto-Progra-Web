// import { User } from "../types/User"

// let usersData: User[] = [
//     { id: 1, name: "Jessica", email: "jess@taxes.com", password: "12345", role: "Admin" },
//     { id: 2, name: "Jhon", email: "jon@taxes.com", password: "6789", role: "User" },
//     { id: 3, name: "Diego", email: "dieg@taxes.com", password: "1011", role: "User" },
//     { id: 4, name: "Juan", email: "juan@taxes.com", password: "1213", role: "User" },
//     { id: 5, name: "Luis", email: "luis@taxes.com", password: "1415", role: "User" },
// ]

// export function getUsers(): User[] {
//     return usersData
// }

// export function updateUser(updated: User): void {
//     usersData = usersData.map(u => u.id === updated.id ? updated : u)
// }

// export function createUser(newUser: User): void {
//     const newId = usersData.length > 0 ? Math.max(...usersData.map(u => u.id)) + 1 : 1
//     newUser.id = newId
//     usersData.push(newUser)
// }

// export function deleteUser(id: number): void {
//     usersData = usersData.filter(user => user.id !== id)
// }
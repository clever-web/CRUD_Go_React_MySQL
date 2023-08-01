import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/users";

function getUsers() {
    return axios.get(USER_API_BASE_URL);
}

function createUser(user) {
    return axios.post(USER_API_BASE_URL, user);
}

function getUserById(userId) {
    return axios.get(USER_API_BASE_URL + '/' + userId);
}

function updateUser(user, userId) {
    console.log(222)
    return axios.put(USER_API_BASE_URL + '/' + userId, user)
}

function deleteUser(userId) {
    return axios.delete(USER_API_BASE_URL + '/' + userId)
}

export { getUsers, createUser, getUserById, updateUser, deleteUser }

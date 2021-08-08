
const users = { "1": [],"2": [],"3": [] };
const privateRooms = {};

const auth = ({newUser, id, room, socketId}) => {
    let user = null;
    if (newUser) {
        if (newUser.name.length > 10) {
            return {error: "максимальная длинна имени 10 символов"}
        }
        if (users[room].find(user => user.name === newUser.name)) {
            return {error: `имя "${newUser.name}" уже занято`}
        }
        user = {online: true, id, ...newUser};
        users[room].push(user);

    } else {
        if (room > 3) {
            user = privateRooms[room] && 
            privateRooms[room].length && 
            privateRooms[room].find(user => user.id === id)
        } else {
            user = users[room].length && users[room].find(user => user.id === id);
        }
            
        if (!user) {
            return {error: `вы не авторизованы`}
        }
        user.online = true;
        user.id = socketId;
    }

    if (!user) {
        return {error: "ошибка авторизации"};
    }
    const usersAmount = userCounting()
    const privateUsers = room > 3 ? privateRooms[room] : null;

    return {user, users, privateUsers, usersAmount}  
}

const roomChange = ({room, currentRoom, id}) => {
 
    const fromPrivat = currentRoom > 3;
    const toPrivat = room > 3;
    let user;

    if (fromPrivat) {
        user = privateRooms[currentRoom].find(user => user.id === id);
        privateRooms[currentRoom] = privateRooms[currentRoom].filter(us => us !== user);
    } else {
        user = users[currentRoom].find(user => user.id === id);
        users[currentRoom] = users[currentRoom].filter(us => us !== user);
    }

    if (!user) return {error: "вы не авторизованы"}

    if (toPrivat) {
        privateRooms[room].push(user);
    } else {
        users[room].push(user);
    }

    
    const usersAmount = userCounting();
    const privateUsers = (toPrivat && privateRooms[room]) 
        || (fromPrivat && privateRooms[currentRoom]) 
        || null; 

    return {users, usersAmount, privateUsers};
}

const createRoom = ({room, currentRoom, id}) => {
    if (room < 4) {
        return {error: "комнаты 1, 2, 3 публичные"}
    }

    const user = users[currentRoom].find(user => user.id === id);
    users[currentRoom] = users[currentRoom].filter(us => us !== user);

    if (privateRooms.hasOwnProperty(room)) {
        privateRooms[room].push(user);
    } else {
        privateRooms[room] = [user];
    }

    const usersAmount = userCounting();

    return {users, privateUsers: privateRooms[room], usersAmount}
}

const disconnect = id => {
    let user;
    Object.values(users).forEach(room => {
        const us = room.find(user => user.id === id);
        if (us) user = us;
    })
    if (!user) {
        Object.values(privateRooms).forEach(room => {
            const us = room.find(user => user.id === id);
            if (us) user = us;
        })
    }
    if (!user) return {error: "пользователь не найден"};

    user.online = false;

    return {users}
}


module.exports = {auth, roomChange, createRoom, disconnect};


function userCounting() {
    const usersAmount = {};
    Object.keys(users).forEach(key => usersAmount[key] = users[key].length);
    return usersAmount;
}
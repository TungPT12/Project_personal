exports.findUserByToken = (token, users) => {
    if (users.length > 0) {
        return users.find((user) => {
            return user.token === token;
        });
    }
    return null
}


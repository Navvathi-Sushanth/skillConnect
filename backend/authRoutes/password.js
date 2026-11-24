const bcrypt = require("bcrypt");

const SALT_ROUNDS = 12;

async function hashPassword(password){

    const hashPassword = await bcrypt.hash(
        password,
        SALT_ROUNDS
    );

    console.log(hashPassword);

    return hashPassword;
}


async function verifyPassword(password,hashedPassword){

    hashPassword = hashPassword.toString();

    return await bcrypt.compare(
        password,
        hashedPassword
    )
}

module.exports = {
    hashPassword,
    verifyPassword
}
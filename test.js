const bcrypt = require('bcrypt')

// const encryptedPassowrd = bcrypt.hashSync("1234", 10) // sync
// console.log(encryptedPassowrd)


const same = bcrypt.compareSync("1234", "$2b$10$c2V1yE26uZRtL8OW.DKvf.s4VxLrGsU95d6CD5Du0yiGQw5/GREdO") // sync
console.log(same)
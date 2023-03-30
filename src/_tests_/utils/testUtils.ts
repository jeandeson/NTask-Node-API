import { User } from "../../models/user";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import passportCfg from "../../config/passport";
import { Sequelize } from "sequelize";

export async function getTestResetToken(sequelize: Sequelize) {
    const user = await getTestUser(sequelize);
    const token = jwt.sign({ sub: user.id }, passportCfg.jwtSecret, { expiresIn: "5m" });
    user.passwordResetTokenHash = await bcrypt.hash(token, 10);
    user.passwordResetExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();
    return token;
}

export async function getTestJwtToken(sequelize: Sequelize) {
    const user = await getTestUser(sequelize);
    const payload = { sub: user.id };
    const token = jwt.sign(payload, passportCfg.jwtSecret, { expiresIn: "5m" });
    return token;
}

export async function getTestUser(sequelize: Sequelize) {
    const uuid = uuidv4();
    const email = `${uuid}@gmail.com`;
    const createUserDTO = { name: "John Doe", email, password: uuid };
    User.initModel(sequelize);
    await User.sync();
    const user = await User.create(createUserDTO);
    const savedUser = await user.save();
    return savedUser;
}

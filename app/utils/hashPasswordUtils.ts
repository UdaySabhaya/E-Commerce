import bcrypt from 'bcrypt';

const hashPassword = async (password: string) => {
    const hashString = await bcrypt.hash(password, 10)
    return hashString
}

const comparePassword = async (hashString: string, password: string) => {
    const compare = await bcrypt.compare(password, hashString);
    return compare;
}

export const hashPasswordUtils = {
    hashPassword,comparePassword
}
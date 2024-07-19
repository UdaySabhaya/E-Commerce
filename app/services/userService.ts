import { prisma } from "../config/db";
import { CustomError } from "../interface/errorInterface";
import { userInterface } from "../interface/userInterface"
import { hashPasswordUtils } from "../utils/hashPasswordUtils";
import { sendEmail } from "../utils/nodeSender";


const signupUser = async (data1: userInterface) => {
    const password = await hashPasswordUtils.hashPassword(data1.password);

    const EmailExists = await prisma.user.findFirst({
        where: {
            email: data1.email
        }
    })
    if (EmailExists) {

        throw new CustomError(400, "User Already Exist");
    }
    const UserData = await prisma.user.create({
        data: {
            name: data1.name,
            password: password,
            email: data1.email,
            age: data1.age,
            role: data1.role
        }
    })
    // await sendEmail({
    //     from:`${process.env.SMTP_EMAIL}`,
    //     to:data1?.email,
    //     subject:"Welcome to E-commerce App",
    //     html:`<h1>Hello ${data1.name} </h1><br/><p>Welcome to Our E-commerce App.</p>`
    // })
    return UserData;
}
const login = async (data: userInterface) => {

    if (!data.password) {
        throw new CustomError(400, "Password Field Cannot Be Empty")
    }
    const findUser = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    })

    if (!findUser) {
        throw new CustomError(400, "User Not Found")
    }
    const { name, id } = findUser;
    const loggedUser = {
        name: name,
        id: id,
        email: data.email
    }

    if (!await hashPasswordUtils.comparePassword(findUser.password, data.password)) {
        throw new CustomError(400, "Password Not Matched")
    }

    return loggedUser;

}

const deleteUser = async (userId: number) => {
    const userExist = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    if (!userExist) {
        throw new CustomError(400, "User Not Exist")
    }
    const deletedData = await prisma.user.delete({
        where: {
            id: userId
        }
    })

    return deletedData;
}

const getUser = async () => {
    const allUser = await prisma.user.findMany({});
    return allUser;
}
const updateUser = async (data: userInterface, userId: number) => {

    const findUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            name: data.name,
            age: data.age
        }

    })
    if (!findUser) {
        throw new CustomError(400, "User Not Found")
    }
    return findUser;
}

const findUserById = async (userId: number) => {
    console.log(`userid:${userId}`);

    const data = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    return data

}
export const userService = {
    signupUser, login, deleteUser, getUser, updateUser, findUserById
}
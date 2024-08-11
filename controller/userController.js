import prisma from "../DB/db.config.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (user) {
            return res.json({ status: 400, message: "Email already taken" })
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
        return res.json({ status: 201, message: "User created successfully", data: newUser })
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Internal server error" })
    }
}


export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, password } = req.body;

        const user = await prisma.user.update({
            where: {
                id: Number(userId)
            },
            data: {
                name,
                email,
                password
            }
        })
        if (!user) {
            return res.json({ status: 400, message: "User not found" })
        }

        return res.json({ status: 200, message: "Update successful", data: user })

    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Internal server error" })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({

            select: {
                post: {
                    where: {
                        OR: [
                            {
                                title: {
                                    startsWith: "Second"
                                }
                            }, {
                                title: {
                                    endsWith: "post"
                                }
                            }
                        ]

                    }
                },
                _count: {
                    select: {
                        post: true
                    }
                }
            }

        });
        if (!users) {
            return res.json({ status: 400, message: "Users not found" })
        }
        return res.json({ status: 200, message: "Users", data: users })
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Internal server error" })
    }
}

export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await prisma.user.findFirst({
            where: {
                id: Number(userId)
            }
        })
        if (!user) {
            return res.json({ status: 400, message: "User not found" })
        }
        return res.json({ status: 200, message: "User", data: user })
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Internal server error" })

    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await prisma.user.delete({
            where: {
                id: Number(userId)
            }
        })
        if (!user) {

            return res.json({ status: 400, message: "User not found" })
        }
        return res.json({ status: 200, message: "User deleted successfully" })
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Internal server error" })
    }
}
import prisma from "../DB/db.config.js";

export const createPost = async (req, res) => {
    try {
        const { userId, title, description } = req.body;

        const post = await prisma.post.create({
            data: {
                userId: Number(userId),
                title,
                description
            }
        })

        if (!post) {
            return res.json({ status: 400, message: "Post not created" })
        }
        return res.json({ status: 201, message: "Post created successfully", data: post })
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Internal server error" })
    }
}


// export const updateUser = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const { name, email, password } = req.body;

//         const user = await prisma.user.update({
//             where: {
//                 id: Number(userId)
//             },
//             data: {
//                 name,
//                 email,
//                 password
//             }
//         })
//         if (!user) {
//             return res.json({ status: 400, message: "User not found" })
//         }

//         return res.json({ status: 200, message: "Update successful", data: user })

//     } catch (error) {
//         console.error(error);
//         return res.json({ status: 500, message: "Internal server error" })
//     }
// }

export const getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({});
        if (!posts) {
            return res.json({ status: 400, message: "posts not found" })
        }
        return res.json({ status: 200, message: "Posts", data: posts })
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Internal server error" })
    }
}

export const getPost = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await prisma.post.findFirst({
            where: {
                id: Number(postId)
            }
        })
        if (!post) {
            return res.json({ status: 400, message: "Post not found" })
        }
        return res.json({ status: 200, message: "Post", data: post })
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Internal server error" })

    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await prisma.post.delete({
            where: {
                id: Number(postId)
            }
        })
        if (!post) {

            return res.json({ status: 400, message: "Post not found" })
        }
        return res.json({ status: 200, message: "Post deleted successfully" })
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Internal server error" })
    }
}
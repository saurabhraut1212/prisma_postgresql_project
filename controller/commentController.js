import prisma from "../DB/db.config.js";

export const createComment = async (req, res) => {
    try {
        const { userId, commentId, comment } = req.body;

        const commentN = await prisma.comment.create({
            data: {
                userId: Number(userId),
                commentId: Number(commentId),

                comment
            }
        })

        if (!commentN) {
            return res.json({ status: 400, message: "Comment not created" })
        }
        return res.json({ status: 201, message: "Comment created successfully", data: commentN })
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

export const getAllComments = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({});
        if (!comments) {
            return res.json({ status: 400, message: "comments not found" })
        }
        return res.json({ status: 200, message: "Comments", data: posts })
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Internal server error" })
    }
}

export const getComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        const comment = await prisma.comment.findFirst({
            where: {
                id: Number(commentId)
            }
        })
        if (!comment) {
            return res.json({ status: 400, message: "Comment not found" })
        }
        return res.json({ status: 200, message: "Comment", data: post })
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Internal server error" })

    }
}

// export const deletePost = async (req, res) => {
//     try {
//         const postId = req.params.id;
//         const post = await prisma.post.delete({
//             where: {
//                 id: Number(postId)
//             }
//         })
//         if (!post) {

//             return res.json({ status: 400, message: "Post not found" })
//         }
//         return res.json({ status: 200, message: "Post deleted successfully" })
//     } catch (error) {
//         console.error(error);
//         return res.json({ status: 500, message: "Internal server error" })
//     }
// }
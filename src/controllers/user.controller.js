
const User = require("../schema/user.schema");
const Post = require("../schema/post.schema");

module.exports.getUsersWithPostCount = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10; // number of records per page
    const page = Number(req.query.page) || 1; // page number
    const skip = (page - 1) * limit; // skip 

    const usersWithPostCount = await User.aggregate([
      {
        $lookup: {
          from: Post.collection.name,
          localField: '_id',
          foreignField: 'userId',
          as: 'userPosts'
        }
      },
      {
        $project: {
          name: 1,
          posts: { $size: "$userPosts" }
        }
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      }
    ]);

    const totalDocs = await User.countDocuments();

    const pagination = {
      totalDocs: totalDocs,
      limit: limit,
      page: page,
      totalPages: Math.ceil(totalDocs / limit),
      pagingCounter: skip + 1,
      hasPrevPage: page > 1,
      hasNextPage: totalDocs - skip - limit > 0,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: totalDocs - skip - limit > 0 ? page + 1 : null
    }
    console.log("Users count from database:", usersWithPostCount.length);


    res.status(200).json({ data: { users: usersWithPostCount, pagination: pagination } });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


const CustomError = require('../../utils/CustomError');
const Group = require('../../models/Group');
const User = require('../../models/User');

const createGroup = async (req, res, next) => {
  try {
    const user = req.user;
    const { groupName, description, users } = req.body;

    const updatedUser = await User.findOne({ username: user.username });
    const updatedUsers = await Promise.all(users.map(async (username) => {
      return await User.findOne({ username });
    }));

    // Create the group
    const newGroup = new Group({
      name: groupName,
      description,
      members: [...updatedUsers.map(user => user.username), updatedUser.username],
      owner: updatedUser.username
    });

    const savedGroup = await newGroup.save();

    // console.log(updatedUser)
    updatedUser.groupsOwned.push({
      groupId: savedGroup._id,
      groupName: groupName
    });

    updatedUser.groupsJoined.push({
      groupId: savedGroup._id,
      groupName: groupName
    });
    
    await updatedUser.save()

    await Promise.all(updatedUsers.map(async (user) => {
      user.groupsJoined.push({
        groupId: savedGroup._id,
        groupName: groupName
      });
      await user.save()
      // return await User.findOne({ username }).select('username');
    }));
    // Update the owner (user who created the group)
    // user.groupsOwned.push({
    //   groupId: savedGroup._id,
    //   groupName: groupName
    // });

    // Update members
    // console.log('username')

    // users.map(async (username) => {
    //   console.log(username)
    //   const member = await User.findOne({ username });
    //   if (member) {
    //     member.groupsJoined.push({
    //       groupId: savedGroup._id,
    //       groupName: groupName
    //     });
    //     await member.save();
    //   }
    // });

    // await Promise.all(membersUpdatePromises);
    // await user.save();

    res.status(201).json({ message: 'Group created successfully', group: savedGroup });
  } catch (error) {
    console.log('eeeeeeeee', error)
    return next(new CustomError('Creating group failed', 500, error.message));
  }
};

module.exports = createGroup;

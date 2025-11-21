export const getMyProfile = (req, res) => {
  // protect middleware je već stavio usera u req.user
  res.json(req.user);
};

export const updateMyProfile = async (req, res) => {
  try {
    const { fullname, bio, gender, avatar } = req.body;

    if (fullname !== undefined) req.user.fullname = fullname;
    if (bio !== undefined) req.user.bio = bio;
    if (gender !== undefined) req.user.gender = gender;
    if (avatar !== undefined) req.user.avatar = avatar;

    const saved = await req.user.save();

    // ponovo bez passworda (za svaki slučaj)
    const userResponse = saved.toObject();
    delete userResponse.password;

    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
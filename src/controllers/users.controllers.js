const AuthService = require('../services/auth.service');
const UsersService = require('../services/users.service');
const { HttpCode } = require('../helpers/constants');

const serviceUser = new UsersService();
const serviceAuth = new AuthService();

const reg = async (req, res, next) => {
  const { username, email, password, subscription } = req.body;
  const user = await serviceUser.findByEmail(email);
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      data: 'Conflict',
      message: 'This email is already use',
    });
  }
  try {
    const newUser = await serviceUser.create({
      username,
      email,
      password,
      subscription,
    });
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
        avatar: newUser.avatar,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await serviceAuth.login({ email, password });
    if (token) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          token,
        },
      });
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      message: 'Invalid creadentials',
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await serviceAuth.logout(id);
  return res.status(HttpCode.NO_CONTENT).json({
    status: 'success',
    code: HttpCode.NO_CONTENT,
  });
};

const avatars = async (req, res, next) => {
  const id = req.user.id;
  const pathFile = req.file.path;
  const url = await serviceUser.updateAvatar(id, pathFile);
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    avatarUrl: url,
  });
};

const verify = async (req, res, next) => {
  try {
    const result = await serviceUser.verify(req.params);
    if (result) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          message: 'Verification success',
        },
      });
    } else {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: 'Your verification token is not valid',
      });
    }
  } catch (e) {
    next(e);
  }
};

const current = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await serviceUser.getCurrentUser(userId);
    if (user) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          user,
        },
      });
    } else {
      return next({
        status: HttpCode.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  reg,
  login,
  logout,
  avatars,
  verify,
  current,
};

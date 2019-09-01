class AuthorizationMiddleware {
  static middleware(socket, next) {
    // @todo implement authorization
    const isUserAuthorized = true;

    if (!isUserAuthorized) {
      return next(new Error('User is not authorized'));
    }

    return next();
  }
}

module.exports = AuthorizationMiddleware;
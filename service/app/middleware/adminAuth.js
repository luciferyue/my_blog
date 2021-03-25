'use strict';
module.exports = () => {
  return async function adminAuth(ctx, next) {
    // await next();
    const token = ctx.cookies.get('moon_token', {
      encrypt: true,
    });
    const now = new Date().getTime() - 2 * 60 * 60 * 1000;
    if (token && now < token) {
      await next();
    } else {
      ctx.status = 401;
    }
  };
};

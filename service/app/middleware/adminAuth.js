'use strict';
module.exports = () => {
  return async function adminAuth(ctx, next) {
    // await next();
    const token = ctx.cookies.get('moon_token', {
      encrypt: true,
    });
    if (token) {
      await next();
    } else {
      ctx.status = 401;
    }
  };
};

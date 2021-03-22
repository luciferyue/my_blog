'use strict';
module.exports = () => {
  return async function adminAuth(ctx, next) {
    console.log(ctx.session.openId);
    const token = ctx.cookies.get('moon_token', {
      encrypt: true,
    });
    if (token) {
      await next();
    } else {
      ctx.body = { data: '没有登录' };
    }
  };
};

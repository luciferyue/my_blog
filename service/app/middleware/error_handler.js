'use strict';

module.exports = (options, app) => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 跑错错误日志
      app.emit('error', err, this);
      console.log(err);
      if (!err.code) {
        const status = err.status || 500;
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息

        const error = status === 500 && app.config.env === 'prod' ? '内部服务错误' : err.message;

        ctx.body = {
          code: status,
          msg: error,
        };

        // 用户定义错误
        if (status === 422) {
          ctx.body.msg = err.errors;
        }
      } else {
        ctx.body = err;
      }
      console.log(ctx.body);
      ctx.status = 200;
    }
  };
};

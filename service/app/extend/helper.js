'use strict';
exports.success = ({ ctx, data, msg = 'ok' }) => {
  ctx.body = {
    code: 0,
    data,
    msg,
  };
};

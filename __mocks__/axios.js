/* eslint-disable functional/no-let */
let app;
/* eslint-enable functional/no-let */

const makeMock = (method) => (url, { data, params }) => {
  const payload = {
    data,
    params,
  };

  return app.inject({
    method,
    url,
    payload,
  });
};

export default {
  setApp: (app_) => {
    app = app_;
  },
  post: makeMock('POST'),
  get: makeMock('GET'),
  patch: makeMock('PATCH'),
  delete: makeMock('DELETE'),
};

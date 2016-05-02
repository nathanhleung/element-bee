const auth = require('basic-auth');

exports.game = (req, res) => {
  res.render('game', {
    title: 'Game',
  });
}

exports.admin = (req, res) => {
  const credentials = auth(req);
  if (
    !credentials ||
    credentials.name !== process.env.ADMIN_NAME ||
    credentials.pass !== process.env.ADMIN_PASS
  ) {
    res.status(401);
    res.setHeader('WWW-Authenticate', 'Basic realm="element-bee"')
    res.render('401', {
      title: '401 - Unauthorized',
    });
  } else {
    res.render('admin', {
      title: 'Admin',
    });
  }
};

exports.notFound = (req, res) => {
  res.status(404);
  res.render('404', {
    title: '404 - Not Found',
  });
};

module.exports = exports;
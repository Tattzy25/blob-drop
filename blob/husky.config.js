module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'commit-msg': 'node_modules/.bin/commitlint -E HUSKY_GIT_PARAMS',
  },
};

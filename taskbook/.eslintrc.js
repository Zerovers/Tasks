module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
      "browser": true,
      "node": true,
      "jest": true
    },
    "rules": {
      "consistent-return": "off",
      "no-console": "off",
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/prop-types": [
        "enabled",
        { "ignore": "ignore", "customValidators": "customValidator" }
      ],
      "react/destructuring-assignment": ["enabled", 'never'],
      "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
    },
  };
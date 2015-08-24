{
    "parser": "babel-eslint",
    "useEslintrc": false,
    "rules": {
        "strict": 0,
        "quotes": [2, "single"],
        "no-underscore-dangle": 0,
        "no-new": 0,
        "eol-last": 0,
        "new-cap": [2, {
            "capIsNewExceptions": ["Deferred"]
        }]
    },
    "env": {
        "browser": true,
        "jasmine": true,
        "jquery": true
    },
    "globals": {
        "module": true,
        "define": true,
        "requirejs": true,
        "require": true
    }
}

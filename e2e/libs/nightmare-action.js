const FQ = require('fuzzy-query');

var evaluate = function (FQStr, selectorsStr, fnStr, fnArgsStr) {
  try {
    console.debug(selectorsStr, fnArgsStr);
    var replaceToRegExp = function (selector) {
      if (/^\/.+\/$/.test(selector)) {
        return new RegExp(selector.slice(1, -1));
      }
      if (typeof selector === 'object') {
        return Object.keys(selector).reduce(function (result, key) {
          result[key] = replaceToRegExp(selector[key])
          return result;
        }, {});
      }
      return selector;
    }
    var selectors = JSON.parse(selectorsStr).map(replaceToRegExp);
    var fnArgs = (fnArgsStr.length > 0) ? JSON.parse(fnArgsStr) : undefined;
    var FQ = eval('(' + FQStr + ');');
    var fqElem = FQ(selectors);
    if (!fqElem) { return false; }
    return eval('(' + fnStr + ')(fqElem, fnArgs);');
  } catch (err) {
    err.message += ', ' + JSON.stringify(args);
    console.error(err);
    throw err;
  }
};

const selectorsToString = function (selectors) {
  // JSON string to Object
  const selectorsObj = selectors.map((selector) => {
    try {
      return JSON.parse(selector);
    } catch (err) {
      if (err instanceof SyntaxError) {
        return selector;
      }
      throw err;
    }
  });
  return JSON.stringify(selectorsObj);
}

const Action = {
  eval: function ({ method, selectors, fn, fnArgs }) {
    const selectorsStr = selectorsToString(selectors);
    // strigify function or regExp for Electron
    const fnArgsStr = (fnArgs && fnArgs.length > 0) ? JSON.stringify(fnArgs) : '';
    return function (nightmare) {
      return nightmare[method](
        evaluate,
        FQ.toString(),
        selectorsStr,
        fn.toString(),
        fnArgsStr
      );
    };
  },

  execAfterFound: function ({ selectors, onFound, onFoundArgs }) {
    onFound = onFound || function () { return true; };
    return this.eval({ method: 'wait', selectors, fn: onFound, fnArgs: onFoundArgs });
  },

  getValue: function ({ selectors, fnGetValue, fnArgs }) {
    return (nightmare) => {
      this.execAfterFound({
        selectors, onFound: function () { return true; }
      })(nightmare);
      return this.eval({
        method: 'evaluate', selectors, fn: fnGetValue, fnArgs
      })(nightmare);
    };
  },

  click: function (selectors) {
    return this.execAfterFound({
      selectors,
      onFound: function (fqElem) {
        try {
          return fqElem.click();
        } catch (err) {
          console.warn(err);
          return false;
        }
      },
    });
  },

  select: function (selectors, value) {
    return this.execAfterFound({
      selectors,
      onFound: function (fqElem, args) {
        try {
          return fqElem.select(args[0]);
        } catch (err) {
          console.warn(err);
          return false;
        }
      },
      onFoundArgs: [value],
    });
  },

  input: function (selectors, value) {
    return this.execAfterFound({
      selectors,
      onFound: function (fqElem, args) {
        try {
          return fqElem.type(args[0]);
        } catch (err) {
          console.warn(err);
          return false;
        }
      },
      onFoundArgs: [value],
    });
  },

  getText: function (selectors) {
    return this.getValue({
      selectors,
      fnGetValue: function (fqElem) {
        try {
          return fqElem.text();
        } catch (err) {
          console.warn(err);
          return null;
        }
      },
    });
  },

  getHtml: function (selectors) {
    return this.getValue({
      selectors,
      fnGetValue: function (fqElem) {
        try {
          return fqElem.element.innerHTML.trim();
        } catch (err) {
          console.warn(err);
          return null;
        }
      },
    });
  },
};

module.exports = Action;
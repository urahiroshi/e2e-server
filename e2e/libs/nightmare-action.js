const Query = require('fuzzy-query');

var evaluate = function (QueryStr, selectorsStr, fnStr, fnArgsStr) {
  try {
    console.debug(selectorsStr, fnArgsStr)
    var selectors = JSON.parse(selectorsStr).map(function (selectorStr) {
      return (
        (/^\/.+\/$/.test(selectorStr)) ?
          new RegExp(selectorStr.slice(1, -1)) :
          selectorStr
      );
    });
    var fnArgs = (fnArgsStr.length > 0) ? JSON.parse(fnArgsStr) : undefined;
    var Query = eval('(' + QueryStr + ');');
    var qElem = Query(selectors);
    if (!qElem) { return false; }
    return eval('(' + fnStr + ')(qElem, fnArgs);');
  } catch (err) {
    err.message += ', ' + JSON.stringify(args);
    console.error(err)
    throw err
  }
};

const Action = {
  eval: function ({ method, selectors, fn, fnArgs }) {
    const selectorsStr = JSON.stringify(selectors);
    // strigify function or regExp for Electron
    const fnArgsStr = (fnArgs && fnArgs.length > 0) ? JSON.stringify(fnArgs) : '';
    return function (nightmare) {
      return nightmare[method](
        evaluate,
        Query.toString(),
        selectorsStr,
        fn.toString(),
        fnArgsStr
      );
    };
  },

  getValue: function ({ selectors, fnGetValue, fnArgs }) {
    const selectorsStr = JSON.stringify(selectors);
    const fnArgsStr = (fnArgs && fnArgs.length > 0) ? JSON.stringify(fnArgs) : '';
    const dummyFnStr = (function () { return true; }).toString();
    return function (nightmare) {
      return nightmare.wait(
        evaluate, Query.toString(), selectorsStr, dummyFnStr, ''
      )
      .evaluate(
        evaluate, Query.toString(), selectorsStr, fnGetValue.toString(), fnArgsStr
      );
    }
  },

  execAfterFound: function ({ selectors, onFound, onFoundArgs }) {
    onFound = onFound || function () { return true; };
    return this.eval({ method: 'wait', selectors, fn: onFound, fnArgs: onFoundArgs });
  },

  click: function (selectors) {
    return this.execAfterFound({
      selectors,
      onFound: function (qElem) {
        try {
          return qElem.click();
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
      onFound: function (qElem, args) {
        try {
          return qElem.select(args[0]);
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
      onFound: function (qElem, args) {
        try {
          return qElem.type(args[0]);
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
      fnGetValue: function (qElem) {
        try {
          return qElem.text();
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
      fnGetValue: function (qElem) {
        try {
          return qElem.element.innerHTML.trim();
        } catch (err) {
          console.warn(err);
          return null;
        }
      },
    });
  },
};

module.exports = Action;
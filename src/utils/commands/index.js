/* globals Cypress, before, after, cy */
/* eslint-env browser */
var canonizingSerializer = new (require('dom-compare').XMLSerializer)();
function getTest() {
  return Cypress.mocha.getRunner().test;
}

function getTestForTask(test) {
  if (!test) {
    test = getTest();
  }
  return {
    id: test.id,
    title: test.title,
    parent: test.parent && test.parent.title ? getTestForTask(test.parent) : null,
  };
}

function isElement(obj) {
  return obj && (obj instanceof Element || (obj.nodeType && obj.nodeType === 1));
}

function isCollection(obj) {
  return obj && (
    obj instanceof NodeList ||
    obj instanceof HTMLCollection
  );
}

function getSubject(testSubject) {
  if (!testSubject) {
    return testSubject;
  }

  if (isElement(testSubject)) {
     return canonizingSerializer.serializeToString(testSubject);
  }

  if (isJQuery(testSubject)) {
    if (testSubject.length === 1) {
      return getSubject(testSubject.get(0));
    }
    return Array.from(testSubject).map(getSubject);
  }

  if (isCollection(testSubject)) {
    return Array.from(testSubject).map(getSubject);
  }

  if (Array.isArray(testSubject)) {
    return testSubject.map(getSubject);
  }

}

function isJQuery(subject) {
  return subject && (
    subject.constructor.name === 'jQuery' ||
    subject.constructor.prototype.jquery
  );
}

function isHtml(subject) {
  return isJQuery(subject) ||
          (Array.isArray(subject) && subject.length && isElement(subject[0])) ||
          isCollection(subject) ||
          isElement(subject);
}

module.exports = {
  getSubject,
  getTest,
  getTestForTask,
  isHtml
}

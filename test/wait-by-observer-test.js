// LICENSE : MIT
"use strict";
require('es6-promise').polyfill();
var assert = require("power-assert");
var waitByObserver = require("../lib/wait-by-observer");
var shouldFulfilled = require("promise-test-helper").shouldFulfilled;
var shouldRejected = require("promise-test-helper").shouldRejected;
describe("wait-by-observer.js", function () {
    context("when found the element", function () {
        it("should return promise which filled with the element", function () {
            return shouldFulfilled(waitByObserver("#mocha")).then(function (element) {
                assert(element === document.querySelector("#mocha"));
            });
        });
    });
    context("when the element is appended in async", function () {
        it("should return promise which filled with the element", function () {
            var fixtureElement = document.getElementById("mocha");
            var appendedElement = document.createElement("div");
            appendedElement.setAttribute("id", "js-element");
            setTimeout(function () {
                fixtureElement.appendChild(appendedElement);
            }, 100);
            return shouldFulfilled(waitByObserver("#js-element")).then(function (element) {
                assert(element.id === appendedElement.id);
            });
        });
    });
    context("when not found the element", function () {
        it("should return promise which rejected with Error", function () {
            return shouldRejected(waitByObserver("#notFoundID", 100)).catch(function (error) {
                assert(error instanceof Error);
            });
        });
    });
});
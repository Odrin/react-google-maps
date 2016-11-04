"use strict";

var _InfoBox = require("../InfoBox");

var _InfoBox2 = _interopRequireDefault(_InfoBox);

var _MarkerClusterer = require("../MarkerClusterer");

var _MarkerClusterer2 = _interopRequireDefault(_MarkerClusterer);

var _CanvasLayer = require("../CanvasLayer");

var _CanvasLayer2 = _interopRequireDefault(_CanvasLayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("addons", function () {
  describe("InfoBox", function () {
    it("should be exported", function () {
      expect(_InfoBox2.default).toBeDefined();
    });
  });

  describe("MarkerClusterer", function () {
    it("should be exported", function () {
      expect(_MarkerClusterer2.default).toBeDefined();
    });
  });

  describe("CanvasLayer", function () {
    it("should be exported", function () {
      expect(_CanvasLayer2.default).toBeDefined();
    });
  });
});
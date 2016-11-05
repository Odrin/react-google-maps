"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _flowRight2 = require("lodash/flowRight");

var _flowRight3 = _interopRequireDefault(_flowRight2);

var _contextTypes;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _constants = require("../constants");

var _enhanceElement = require("../enhanceElement");

var _enhanceElement2 = _interopRequireDefault(_enhanceElement);

var _pixijsMapLayer = require("pixijs-map-layer");

var _pixijsMapLayer2 = _interopRequireDefault(_pixijsMapLayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controlledPropTypes = {
    options: _react.PropTypes.object
};

var defaultUncontrolledPropTypes = (0, _enhanceElement.addDefaultPrefixToPropTypes)(controlledPropTypes);

var eventMap = {};

var publicMethodMap = {
    getLayer: function getLayer(pixiLayer) {
        return pixiLayer;
    },
    addLayer: function addLayer(pixiLayer) {
        return pixiLayer.addLayer();
    },
    getContainer: function getContainer(pixiLayer) {
        return pixiLayer.getContainer();
    },
    getRenderer: function getRenderer(pixiLayer) {
        return pixiLayer.getRenderer();
    },
    clear: function clear(pixiLayer) {
        return pixiLayer.clear();
    }
};

var controlledPropUpdaterMap = {
    options: function options(pixiLayer, _options) {
        pixiLayer.setOptions(_options);
    }
};

function getInstanceFromComponent(component) {
    return component.state[_constants.PIXI_LAYER];
}

exports.default = (0, _flowRight3.default)(_react2.default.createClass, (0, _enhanceElement2.default)(getInstanceFromComponent, publicMethodMap, eventMap, controlledPropUpdaterMap))({
    displayName: "PixiLayer",
    propTypes: (0, _extends3.default)({}, controlledPropTypes, defaultUncontrolledPropTypes),

    contextTypes: (_contextTypes = {}, (0, _defineProperty3.default)(_contextTypes, _constants.MAP, _react.PropTypes.object), (0, _defineProperty3.default)(_contextTypes, _constants.PIXI_LAYER, _react.PropTypes.object), _contextTypes),

    getInitialState: function getInitialState() {
        var opts = (0, _enhanceElement.collectUncontrolledAndControlledProps)(defaultUncontrolledPropTypes, controlledPropTypes, this.props);

        var pixiLayer = new _pixijsMapLayer2.default(this.context[_constants.MAP], opts.options);

        return (0, _defineProperty3.default)({}, _constants.PIXI_LAYER, pixiLayer);
    },
    componentWillUnmount: function componentWillUnmount() {
        var pixiLayer = getInstanceFromComponent(this);
        if (pixiLayer) {
            pixiLayer.setMap(null);
        }
    },
    render: function render() {
        return false;
    }
});
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

var _canvaslayer = require("canvaslayer");

var _canvaslayer2 = _interopRequireDefault(_canvaslayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controlledPropTypes = {
    paneName: _react.PropTypes.string,
    topLeft: _react.PropTypes.object,
    animated: _react.PropTypes.bool,
    options: _react.PropTypes.object,
    resizeHandler: _react.PropTypes.func,
    updateHandler: _react.PropTypes.func
};

var defaultUncontrolledPropTypes = (0, _enhanceElement.addDefaultPrefixToPropTypes)(controlledPropTypes);

var eventMap = {};

var publicMethodMap = {
    getPaneName: function getPaneName(canvasLayer) {
        return canvasLayer.getPaneName();
    },
    getTopLeft: function getTopLeft(canvasLayer) {
        return canvasLayer.getTopLeft();
    },
    isAnimated: function isAnimated(canvasLayer) {
        return canvasLayer.isAnimated();
    }
};

var controlledPropUpdaterMap = {
    options: function options(canvasLayer, _options) {
        canvasLayer.setOptions(_options);
    },
    paneName: function paneName(canvasLayer, _paneName) {
        canvasLayer.setPaneName(_paneName);
    }
};

function getInstanceFromComponent(component) {
    return component.state[_constants.CANVAS_LAYER];
}

exports.default = (0, _flowRight3.default)(_react2.default.createClass, (0, _enhanceElement2.default)(getInstanceFromComponent, publicMethodMap, eventMap, controlledPropUpdaterMap))({
    displayName: "CanvasLayer",
    propTypes: (0, _extends3.default)({}, controlledPropTypes, defaultUncontrolledPropTypes),

    contextTypes: (_contextTypes = {}, (0, _defineProperty3.default)(_contextTypes, _constants.MAP, _react.PropTypes.object), (0, _defineProperty3.default)(_contextTypes, _constants.CANVAS_LAYER, _react.PropTypes.object), _contextTypes),

    getCanvas: function getCanvas() {
        return getInstanceFromComponent(this).canvas;
    },
    getTopLeft: function getTopLeft() {
        return getInstanceFromComponent(this).getTopLeft();
    },
    getInitialState: function getInitialState() {
        var opts = (0, _enhanceElement.collectUncontrolledAndControlledProps)(defaultUncontrolledPropTypes, controlledPropTypes, this.props);

        var canvasLayer = new _canvaslayer2.default(opts);

        if (this.props.updateHandler) {
            canvasLayer.setUpdateHandler(this.props.updateHandler);
        }

        if (this.props.resizeHandler) {
            canvasLayer.setResizeHandler(this.props.resizeHandler);
        }

        canvasLayer.setMap(this.context[_constants.MAP]);
        return (0, _defineProperty3.default)({}, _constants.CANVAS_LAYER, canvasLayer);
    },
    componentWillUnmount: function componentWillUnmount() {
        var canvasLayer = getInstanceFromComponent(this);
        if (canvasLayer) {
            canvasLayer.setMap(null);
            canvasLayer.setResizeHandler(null);
            canvasLayer.setUpdateHandler(null);
        }
    },
    render: function render() {
        return false;
    }
});
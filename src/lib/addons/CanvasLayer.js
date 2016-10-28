import _ from 'lodash';

import {
    default as React,
    PropTypes,
} from "react";

import {
    MAP,
    CANVAS_LAYER
} from "../constants";

import {
    addDefaultPrefixToPropTypes,
    collectUncontrolledAndControlledProps,
    default as enhanceElement,
} from "../enhanceElement";

import CanvasLayer from 'canvaslayer';

const controlledPropTypes = {
    paneName: PropTypes.string,
    topLeft: PropTypes.object,
    animated: PropTypes.bool,
    options: PropTypes.object,
    resizeHandler: PropTypes.func,
    updateHandler: PropTypes.func,
};

const defaultUncontrolledPropTypes = addDefaultPrefixToPropTypes(controlledPropTypes);

const eventMap = {
    
}

const publicMethodMap = {
    getPaneName(canvasLayer) { return canvasLayer.getPaneName(); },
    getTopLeft(canvasLayer) { return canvasLayer.getTopLeft(); },
    isAnimated(canvasLayer) { return canvasLayer.isAnimated(); },
}

const controlledPropUpdaterMap = {
    options(canvasLayer, options) { canvasLayer.setOptions(options); },
    paneName(canvasLayer, paneName) { canvasLayer.setPaneName(paneName); },
}

function getInstanceFromComponent(component) {
    return component.state[CANVAS_LAYER];
}

export default _.flowRight(
    React.createClass,
    enhanceElement(getInstanceFromComponent, publicMethodMap, eventMap, controlledPropUpdaterMap),
)({
    displayName: `CanvasLayer`,
    propTypes: {
        ...controlledPropTypes,
        ...defaultUncontrolledPropTypes,
    },

    contextTypes: {
        [MAP]: PropTypes.object,
        [CANVAS_LAYER]: PropTypes.object,
    },

    getCanvas() {
        return getInstanceFromComponent(this).canvas;
    },

    getTopLeft() {
        return getInstanceFromComponent(this).getTopLeft();
    },

    getInitialState() {
        const opts = collectUncontrolledAndControlledProps(
            defaultUncontrolledPropTypes,
            controlledPropTypes,
            this.props
        );

        let canvasLayer = new CanvasLayer(opts);

        if (this.props.updateHandler) {
            canvasLayer.setUpdateHandler(this.props.updateHandler);
        }

        if (this.props.resizeHandler) {
            canvasLayer.setResizeHandler(this.props.resizeHandler);
        }

        canvasLayer.setMap(this.context[MAP]);
        return {
            [CANVAS_LAYER]: canvasLayer,
        };
    },

    componentWillUnmount() {
        const canvasLayer = getInstanceFromComponent(this);
        if (canvasLayer) {
            canvasLayer.setMap(null);
            canvasLayer.setResizeHandler(null);
            canvasLayer.setUpdateHandler(null);
        }
    },

    render() {
        return false;
    },
});

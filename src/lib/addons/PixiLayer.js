import _ from 'lodash';

import {
    default as React,
    PropTypes,
} from "react";

import {
    MAP,
    PIXI_LAYER,
} from "../constants";

import {
    addDefaultPrefixToPropTypes,
    collectUncontrolledAndControlledProps,
    default as enhanceElement,
} from "../enhanceElement";

import PixiLayer from 'pixijs-map-layer';

const controlledPropTypes = {
    options: PropTypes.object,
};

const defaultUncontrolledPropTypes = addDefaultPrefixToPropTypes(controlledPropTypes);

const eventMap = {

}

const publicMethodMap = {
    getLayer(pixiLayer) { return pixiLayer; },
    addLayer(pixiLayer) { return pixiLayer.addLayer(); },
    getContainer(pixiLayer) { return pixiLayer.getContainer(); },
    getRenderer(pixiLayer) { return pixiLayer.getRenderer(); },
    clear(pixiLayer) { return pixiLayer.clear(); },
}

const controlledPropUpdaterMap = {
    options(pixiLayer, options) { pixiLayer.setOptions(options); },
}

function getInstanceFromComponent(component) {
    return component.state[PIXI_LAYER];
}

export default _.flowRight(
    React.createClass,
    enhanceElement(getInstanceFromComponent, publicMethodMap, eventMap, controlledPropUpdaterMap),
)({
    displayName: `PixiLayer`,
    propTypes: {
        ...controlledPropTypes,
        ...defaultUncontrolledPropTypes,
    },

    contextTypes: {
        [MAP]: PropTypes.object,
        [PIXI_LAYER]: PropTypes.object,
    },

    getInitialState() {
        const opts = collectUncontrolledAndControlledProps(
            defaultUncontrolledPropTypes,
            controlledPropTypes,
            this.props
        );

        let pixiLayer = new PixiLayer(
            this.context[MAP],
            opts.options,
        );

        return {
            [PIXI_LAYER]: pixiLayer,
        };
    },

    componentWillUnmount() {
        const pixiLayer = getInstanceFromComponent(this);
        if (pixiLayer) {
            pixiLayer.setMap(null);
        }
    },

    render() {
        return false;
    },
})
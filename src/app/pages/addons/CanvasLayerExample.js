/* global google */

// Original Example: https://raw.githubusercontent.com/brendankenny/CanvasLayer/gh-pages/examples/hello2d.html

import _ from 'lodash';

import {
    default as React,
    Component,
    PropTypes,
} from 'react';

import {
    withGoogleMap,
    GoogleMap,
} from '../../../lib';

import {
    MAP,
} from '../../../lib/constants';

import {
    default as CanvasLayer,
} from '../../../lib/addons/CanvasLayer';



class CanvasLayerExampleGoogleMap extends Component {
    static contextTypes = {
        [MAP]: PropTypes.object,
    }

    setCanvasLayer = (canvasLayer) => {
        this.canvasLayer = canvasLayer;
    }

    updateHandler = () => {
        let canvas = this.canvasLayer.getCanvas();
        var context = canvas.getContext('2d');
        var rectLatLng = new google.maps.LatLng(41.850033, -87.6500523);
        var rectWidth = 6.5;
        var map = this.context[MAP];

        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        // we like our rectangles hideous
        context.fillStyle = 'rgba(230, 77, 26, 1)';

        /* We need to scale and translate the map for current view.
         * see https://developers.google.com/maps/documentation/javascript/maptypes#MapCoordinates
         */
        var mapProjection = map.getProjection();
        /**
         * Clear transformation from last update by setting to identity matrix.
         * Could use context.resetTransform(), but most browsers don't support
         * it yet.
         */
        context.setTransform(1, 0, 0, 1, 0, 0);

        // scale is just 2^zoom
        // If canvasLayer is scaled (with resolutionScale), we need to scale by
        // the same amount to account for the larger canvas.
        var scale = Math.pow(2, map.getZoom()) * this.canvasLayer.props.options.resolutionScale;
        context.scale(scale, scale);
        /* If the map was not translated, the topLeft corner would be 0,0 in
         * world coordinates. Our translation is just the vector from the
         * world coordinate of the topLeft corder to 0,0.
         */
        var offset = mapProjection.fromLatLngToPoint(this.canvasLayer.getTopLeft());
        context.translate(-offset.x, -offset.y);
        // project rectLatLng to world coordinates and draw
        var worldPoint = mapProjection.fromLatLngToPoint(rectLatLng);
        context.fillRect(worldPoint.x, worldPoint.y, rectWidth, rectWidth);
    }

    render() {
        return (
            <GoogleMap
                defaultZoom = {5}
                defaultCenter = {{lat: 41.850033, lng: -87.6500523 }}
            >
                <CanvasLayer
                    ref = {this.setCanvasLayer}
                    options = {{
                        animate: false,
                        resolutionScale: window.devicePixelRation || 1,
                        resizeHandler: _.noop,
                    }}
                    updateHandler = {this.updateHandler}
                />
            </GoogleMap>
        );
    }
}

export default class CanvasLayerExample extends Component {
    render() {
        const Container = withGoogleMap(CanvasLayerExampleGoogleMap);
        return (
            <Container 
                containerElement = {
                    <div style = {{height: `100%`}} />
                }
                mapElement = {
                    <div style = {{height: `100%`}} />
                }
            />
        );
    }
}
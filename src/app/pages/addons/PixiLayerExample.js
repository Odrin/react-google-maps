/* global google */

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
    default as PixiLayer,
} from '../../../lib/addons/PixiLayer';

var PIXI = require('pixi.js');

class PixiLayerExampleGoogleMap extends Component {
    static contextTypes = {
        [MAP]: PropTypes.object,
    }

    setPixiLayer = (pixiLayer) => {
        this.pixiLayer = pixiLayer.getLayer();
        setTimeout(() => {
            this.pixiLayer.addLayer((layer, mapProjection) => {
                let point = { lat: 34.0522, lng: -118.2437 };
                let convertedPoint = mapProjection.fromLatLngToPoint(new google.maps.LatLng(point));

                var graphics = new PIXI.Graphics();
                graphics.beginFill(0xFF0000);
                graphics.lineStyle(1, 0xFFFF00);
                graphics.drawRect(convertedPoint.x, convertedPoint.y, 3, 3);
                layer.addChild(graphics);
            });
        }, 1000);

    }

    render() {
        return (
            <GoogleMap
                defaultZoom={5}
                defaultCenter={{lat: 34.0522, lng: -118.2437}}
            >
                <PixiLayer
                    ref = {this.setPixiLayer}
                    options = {{
                        interactive: true,
                        transparent: true,
                    }}
                />
            </GoogleMap>
        );
    }
}

export default class PixiLayerExample extends Component {
    render() {
        const Container = withGoogleMap(PixiLayerExampleGoogleMap);
        return (
            <Container 
                containerElement = {
                    <div style={{height: `100%`}} />
                }
                mapElement = {
                    <div style = {{height: `100%`}} />
                }
            />
        );
    }
}
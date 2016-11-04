import _ from 'lodash';

import { 
    default as React,
    Component,
} from 'react';

import {
    withGoogleMap,
    GoogleMap,
    TrafficLayer,
} from '../../../lib';

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
const TrafficLayerExampleGoogleMap = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: 41.850033, lng: -87.6500523 }}
    >
        <TrafficLayer />
    </GoogleMap>
));

export default class TrafficLayerExample extends Component {
    render() {
        return (
            <TrafficLayerExampleGoogleMap
                containerElement={
                    <div style={{ height: `100%` }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
            />
        )
    }
}
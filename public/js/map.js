/*
 * Copyright 2003-2006, 2009, 2017, United States Government, as represented by the Administrator of the
 * National Aeronautics and Space Administration. All rights reserved.
 *
 * The NASAWorldWind/WebWorldWind platform is licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Illustrates how to set up deep picking.
 */
requirejs(
    [
        "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/examples/WorldWindShim.js",
        "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/examples/LayerManager.js"
    ],
    function(WorldWind, LayerManager) {
        "use strict";

        // Tell WorldWind to log only warnings and errors.
        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        // Create the WorldWindow.
        var wwd = new WorldWind.WorldWindow("canvasOne");

        // Create and add layers to the WorldWindow.
        var layers = [
            // Imagery layers.
            { layer: new WorldWind.BMNGLayer(), enabled: true },
            { layer: new WorldWind.BMNGLandsatLayer(), enabled: false },
            {
                layer: new WorldWind.BingAerialWithLabelsLayer(null),
                enabled: true
            },
            // WorldWindow UI layers.
            { layer: new WorldWind.CompassLayer(), enabled: true },
            {
                layer: new WorldWind.CoordinatesDisplayLayer(wwd),
                enabled: true
            },
            { layer: new WorldWind.ViewControlsLayer(wwd), enabled: true }
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }

        // Tell the WorldWindow that we want deep picking.
        wwd.deepPicking = true;

        // Now set up to handle picking.
        var highlightedItems = [];

        // The common pick-handling function.
        var handlePick = function(o) {
            // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
            // the mouse or tap location.
            var x = o.clientX,
                y = o.clientY;

            var redrawRequired = highlightedItems.length > 0; // must redraw if we de-highlight previously picked items

            // De-highlight any previously highlighted placemarks.
            for (var h = 0; h < highlightedItems.length; h++) {
                highlightedItems[h].highlighted = false;
            }
            highlightedItems = [];

            // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
            // relative to the upper left corner of the canvas rather than the upper left corner of the page.
            var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
            if (pickList.objects.length > 0) {
                redrawRequired = true;
            }

            // Highlight the items picked by simply setting their highlight flag to true.
            if (pickList.objects.length > 0) {
                var numShapesPicked = 0;
                for (var p = 0; p < pickList.objects.length; p++) {
                    pickList.objects[p].userObject.highlighted = true;

                    // Keep track of highlighted items in order to de-highlight them later.
                    highlightedItems.push(pickList.objects[p].userObject);

                    // Detect whether the placemark's label was picked. If so, the "labelPicked" property is true.
                    // If instead the user picked the placemark's image, the "labelPicked" property is false.
                    // Applications might use this information to determine whether the user wants to edit the label
                    // or is merely picking the placemark as a whole.
                    if (pickList.objects[p].labelPicked) {
                        console.log("Label picked");
                    }

                    // Increment the number of items picked if a shape is picked.
                    if (!pickList.objects[p].isTerrain) {
                        ++numShapesPicked;
                    }
                }

                if (numShapesPicked > 0) {
                    console.log(numShapesPicked + " shapes picked");
                }
            }

            // Update the window if we changed anything.
            if (redrawRequired) {
                wwd.redraw(); // redraw to make the highlighting changes take effect on the screen
            }
        };

        // Listen for mouse moves and highlight the placemarks that the cursor rolls over.
        wwd.addEventListener("mousemove", handlePick);

        // Listen for taps on mobile devices and highlight the placemarks that the user taps.
        var tapRecognizer = new WorldWind.TapRecognizer(wwd, handlePick);

        // Define the images we'll use for the placemarks.
        var images = [
            "plain-black.png",
            "plain-blue.png",
            "plain-brown.png",
            "plain-gray.png",
            "plain-green.png",
            "plain-orange.png",
            "plain-purple.png",
            "plain-red.png",
            "plain-teal.png",
            "plain-white.png",
            "plain-yellow.png",
            "castshadow-black.png",
            "castshadow-blue.png",
            "castshadow-brown.png",
            "castshadow-gray.png",
            "castshadow-green.png",
            "castshadow-orange.png",
            "castshadow-purple.png",
            "castshadow-red.png",
            "castshadow-teal.png",
            "castshadow-white.png"
        ];
        // http://localhost:8081/image/MOP_CO_M_2017-02-01_rgb_1440x720.TIFF
        var pinLibrary =
                "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/", // location of the image files
            placemark,
            placemarkAttributes = new WorldWind.PlacemarkAttributes(null),
            highlightAttributes,
            placemarkLayer = new WorldWind.RenderableLayer("Green Ant");

        // Set up the common placemark attributes.
        placemarkAttributes.imageScale = 0.3;
        placemarkAttributes.imageOffset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION,
            0.3,
            WorldWind.OFFSET_FRACTION,
            0.0
        );
        placemarkAttributes.imageColor = WorldWind.Color.WHITE;
        placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION,
            0.5,
            WorldWind.OFFSET_FRACTION,
            1.0
        );
        placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
        placemarkAttributes.drawLeaderLine = true;
        placemarkAttributes.leaderLineAttributes.outlineColor =
            WorldWind.Color.RED;

        // http://localhost:8081/ants

        $.get("http://localhost:8081/ants")
            .done(function(data) {
                data.ants.forEach(function criarPontos(element, index) {
                    placemark = new WorldWind.Placemark(
                        new WorldWind.Position(element.latitude, element.longitude, 1e2),
                        false,
                        null
                    );
                    placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
                    placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
                    placemarkAttributes.imageSource = pinLibrary + 'plain-green.png';
                    placemark.attributes = placemarkAttributes;
                    highlightAttributes = new WorldWind.PlacemarkAttributes(
                        placemarkAttributes
                    );

                    highlightAttributes.imageScale = 0.5;
                    placemark.highlightAttributes = highlightAttributes;

                    // Add the placemark to the layer.
                    placemarkLayer.addRenderable(placemark);

                });
                wwd.addLayer(placemarkLayer);
            })
            .fail(function(error){
                console.log(error);
            });



        // // For each placemark image, create a placemark with a label.
        // for (var i = 0, len = images.length; i < len; i++) {
        //     // Create the placemark and its label.
        //     placemark = new WorldWind.Placemark(
        //         new WorldWind.Position(latitude, longitude + i, 1e2),
        //         false,
        //         null
        //     );
        //     placemark.label =
        //         "Placemark " +
        //         i.toString() +
        //         "\n" +
        //         "Lat " +
        //         latitude.toPrecision(4).toString() +
        //         "\n" +
        //         "Lon " +
        //         longitude.toPrecision(5).toString();

        //     placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

        //     // Create the placemark attributes for this placemark. Note that the attributes differ only by their
        //     // image URL.
        //     placemarkAttributes = new WorldWind.PlacemarkAttributes(
        //         placemarkAttributes
        //     );
        //     placemarkAttributes.imageSource = pinLibrary + images[i];
        //     placemark.attributes = placemarkAttributes;

        //     // Create the highlight attributes for this placemark. Note that the normal attributes are specified as
        //     // the default highlight attributes so that all properties are identical except the image scale. You could
        //     // instead vary the color, image, or other property to control the highlight representation.
        //     highlightAttributes = new WorldWind.PlacemarkAttributes(
        //         placemarkAttributes
        //     );
        //     highlightAttributes.imageScale = 1.2;
        //     placemark.highlightAttributes = highlightAttributes;

        //     // Add the placemark to the layer.
        //     placemarkLayer.addRenderable(placemark);
        // }

        // Add the placemarks layer to the WorldWindow's layer list.

        // https://neo.sci.gsfc.nasa.gov/wms/wms?version=1.3.0&service=WMS&request=GetCapabilities

        var serviceAddress =
            "https://neo.sci.gsfc.nasa.gov/wms/wms?version=1.3.0&service=WMS&request=GetCapabilities";
        var layerName = "MOP_CO_M";
        // var layerName = "MOD_NDVI_M" densidad ede arvores;

        // Called asynchronously to parse and create the WMS layer
        var createLayer = function(xmlDom) {
            // Create a WmsCapabilities object from the XML DOM
            var wms = new WorldWind.WmsCapabilities(xmlDom);
            // Retrieve a WmsLayerCapabilities object by the desired layer name
            var wmsLayerCapabilities = wms.getNamedLayer(layerName);
            console.log("---------------------------");
            console.log(wmsLayerCapabilities);
            console.log("---------------------------");
            // Form a configuration object from the WmsLayerCapability object
            var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(
                wmsLayerCapabilities
            );
            // Modify the configuration objects title property to a more user friendly title
            wmsConfig.title = "Média de carbono emitido";
            // Create the WMS Layer from the configuration object
            var wmsLayer = new WorldWind.WmsLayer(wmsConfig);
            wmsLayer.opacity = 0.5;

            // Add the layers to WorldWind and update the layer manager
            wwd.addLayer(wmsLayer);
            layerManager.synchronizeLayerList();
        };

        // Called if an error occurs during WMS Capabilities document retrieval
        var logError = function(jqXhr, text, exception) {
            console.log(
                "There was a failure retrieving the capabilities document: " +
                    text +
                    " exception: " +
                    exception
            );
        };

        $.get(serviceAddress)
            .done(createLayer)
            .fail(logError);

        var layerManager = new LayerManager(wwd);

        // Create a layer manager for controlling layer visibility.
    }
);

MapService = {
    /**
     * Initialize a map at the passed id div
     * @param idMap
     * @returns {*}
     */
    setMap: function (idMap, onLoad) {
        L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
        var map = L.map(idMap, {
            attributionControl: false
        });

        if (onLoad) {
            map.on('load', function (e) {
                onLoad(e);
            });
        }

        map.setView([appConfig.defaultMapCoordinates.lat, appConfig.defaultMapCoordinates.lng], 12);
        L.tileLayer.provider("OpenStreetMap.Mapnik").addTo(map);
        return map;
    },
    /**
     * Return a marker at passed coordinates
     * @param coordinates ([lat, lng] Strings)
     * @param category ({color: ***, icon: ***})
     * @param options
     * @returns {*}
     */
    marker: function (coordinates, category, options) {
        var defaultCategory = {
            color: '#222222',
            icon: 'circle'
        };

        // get data from category for styling
        if (category) {
            category = _.isString(category) ? PlacesCategories.findOne(category) : category;
        }

        if (!category) {
            category = defaultCategory;
        }

        // style the marker
        var markerOptions = {
            riseOnHover: true,
            icon: L.divIcon({
                iconSize: [48, 48],
                iconAnchor: [24, 55],
                popupAnchor: [0, -51],
                html: '<div class="leaflet-icon leaflet-icon-marker" style="background-color:' + category.color + ';"><i class="fa fa-' + category.icon + '"></i></div>'
            })
        };
        // merge the marker style with passed marker options
        options = options ? options : {};
        markerOptions = _.merge(options, markerOptions);
        var marker = L.marker(coordinates, markerOptions);

        // check for an onDrag listener in options
        if (markerOptions.draggable && markerOptions.onDrag) {
            marker.on('drag', markerOptions.onDrag)
        }

        return marker;
    },
    /**
     * Place a marker on the map and move the view to it
     * @param lat
     * @param lng
     * @param map
     * @param options
     */
    markAndShow: function (lat, lng, map, options) {
        // clear map
        _.forEach(MapService.getMarkersOnMap(map), function (marker) {
            map.removeLayer(marker);
        });

        // add new marker
        MapService.marker([lat, lng], null, options).addTo(map);

        // set view
        map.setView([
                parseFloat(lat),
                parseFloat(lng)
            ],
            15,
            {
                animate: true
            }
        );
    },
    getMarkersOnMap: function (map) {
        return _.omit(map._layers, function (layer) {
            return !layer._icon;
        });
    }
};
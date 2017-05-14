var canvas = document.getElementById('mapCanvas'),
    context = canvas.getContext('2d'),
    totalTiles = 0,
    count = 0;

$.getJSON('./resources/data/assets-01.json', function(assetsData) {
    $.getJSON('./resources/data/map-01.json', function(mapData) {

        var map = new GamePoc.Map(mapData, assetsData, context),
            asset = new GamePoc.Asset(assetsData);

        asset.loadImages(function() {
            map.render();
        });

    });
});

var canvas = document.getElementById('mapCanvas'),
    totalTiles = 0,
    count = 0,
    map,
    asset,
    intervalId;

function setupControls() {
    var btn = document.querySelectorAll('.btn-play-pause')[0];
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (btn.innerHTML === 'play') {
            btn.innerHTML = 'pause';
            play();
        } else {
            btn.innerHTML = 'play';
            pause();
        }
    });
}

var rad = 0;
function play() {
    if (!intervalId) {
        intervalId = setInterval(function() {
            map.clear();
            map.render(rad);
            // map.calcX = function(x, y) {
            //     return x - (Math.sin((y + rad)/2) * 7);
            // };
            map.calcY = function(x, y) {
                return y + (Math.cos((x + rad)/2) * 7);
            };
            rad += 1.5;
        }, 70);
    }
}

function pause() {
    clearInterval(intervalId);
    intervalId = null;
}

$.getJSON('./resources/data/assets-01.json', function(assetsData) {
    $.getJSON('./resources/data/map-01.json', function(mapData) {

        map = new GamePoc.Map(mapData, assetsData, canvas);
        asset = new GamePoc.Asset(assetsData);

        asset.loadImages(function() {
            setupControls();
            play();
        });

    });
});

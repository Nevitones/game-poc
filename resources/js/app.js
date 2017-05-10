// 218 ┌
// 191 ┐
// 217 ┘
// 192 └

var canvas = document.getElementById('mapCanvas'),
    context = canvas.getContext('2d'),
    totalTiles = 0,
    count = 0,
    mapSize,
    css = {
        width: 40,
        height: 40
    },
    boxDiameter = Math.sqrt(2*(css.width*css.width)),
    tile = {
        // width: boxDiameter,
        // height: boxDiameter / 2
        width: 128, // 132
        height:64, // 66
        depth: 31
    },
    dx = Math.floor(tile.width / 2),
    dy = Math.floor(tile.height / 2),
    dz = 0,
    x,
    y;
//14x8

function topDownToIso(coord) {
    return {
        x: coord.x - coord.y,
        y: coord.y + coord.x
    };
}

function drawMap() {
    for (z = 0; z < map.length; z++) {
        for (y = 0; map[z].length && y < mapSize.height; y++) { 
            for (x = 0; x < mapSize.width; x++) {
                var coordIso = topDownToIso({x: x, y: y}),
                    tileType = null,
                    paddingTop = (map.length - 1) * tile.depth,
                    xTile = coordIso.x * dx + (mapSize.width * dx),
                    yTile = coordIso.y * dy - dz + paddingTop;

                switch(map[z][y][x]) {
                    case 'O':
                        tileType = 'blue';
                        context.drawImage(tiles.water.image, xTile, yTile);
                        break;
                    case '#':
                        tileType = 'green';
                        context.drawImage(tiles.grass.image, xTile, yTile);
                        break;
                    case '@':
                        tileType = 'silver';
                        context.drawImage(tiles.ground.image, xTile, yTile);
                        break;
                    case '┌':
                        // tileType = 'silver';
                        context.drawImage(tiles.waterTopLeft.image, xTile, yTile);
                        break;
                    case '┐':
                        // tileType = 'silver';
                        context.drawImage(tiles.waterTopRight.image, xTile, yTile);
                        break;
                    case '└':
                        // tileType = 'silver';
                        context.drawImage(tiles.waterBottomLeft.image, xTile, yTile);
                        break;
                    case '┘':
                        // tileType = 'silver';
                        context.drawImage(tiles.waterBottomRight.image, xTile, yTile);
                        break;
                    case '*':
                        tileType = 'white';
                        context.drawImage(tiles.grassGround.image, xTile, yTile);
                }
            }
        }
        dz += tile.depth;
    }
}

$.getJSON('./resources/data/assets-01.json', function(data) {
    console.log(data);
    tiles = data;

    $.getJSON('./resources/data/map-01.json', function(data) {
        console.log(data);
        map = data;
        mapSize = {
            width: map[0][0].length,
            height: map[0].length
        };

        for (tileType in tiles) {
            var nextTile = tiles[tileType];
            totalTiles++;
            nextTile.image =  new Image();
            nextTile.image.onload = function() {
                count++;
                if (count === totalTiles) {
                    drawMap();
                }
            }
            nextTile.image.src = nextTile.imagePath;
        }
    });

});

var GamePoc = GamePoc || {};
GamePoc.Map = (function() {

    function Map(data, assets, context) {
        this.data = data;
        this.assets = assets;
        this.context = context;
        this.size = {
            width: data[0][0].length,
            height: data[0].length
        };
    }

    Map.prototype.topDownToIso = function(coord) {
        return {
            x: coord.x - coord.y,
            y: coord.y + coord.x
        };
    }

    Map.prototype.render = function() {
        var dx = Math.floor(this.assets.tile.width / 2),
            dy = Math.floor(this.assets.tile.height / 2),
            dz = 0;

        for (z = 0; z < this.data.length; z++) {
            for (y = 0; this.data[z].length && y < this.size.height; y++) { 
                for (x = 0; x < this.size.width; x++) {
                    var coordIso = this.topDownToIso({x: x, y: y}),
                        paddingTop = (this.data.length - 1) * this.assets.tile.depth,
                        xTile = coordIso.x * dx + (this.size.width * dx),
                        yTile = coordIso.y * dy - dz + paddingTop;

                        if (this.assets.images[this.data[z][y][x]]) {
                            this.context.drawImage(this.assets.images[this.data[z][y][x]].image, xTile, yTile);
                        }
                }
            }
            dz += this.assets.tile.depth;
        }
    }

    return Map;
}());

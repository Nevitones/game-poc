var GamePoc = GamePoc || {};
GamePoc.Map = (function() {

    function Map(data, assets, canvas) {
        /* PRIVATE PROPERTIES */

        var dx = Math.floor(assets.tile.width / 2),
            dy = Math.floor(assets.tile.height / 2),
            dz = assets.tile.depth;

        /* PUBLIC PROPERTIES */

        this.data = data;
        this.assets = assets;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.size = {
            width: data[0].xy[0].length, // TODO Size can't be defined by data length(must be passed as a constructor parameter)
            height: data[0].xy.length
        };

        this.calcX = function(x, y) {
            return x;
        }

        this.calcY = function(x, y) {
            return y;
        }

        /* PUBLIC METHODS */

        Map.prototype.getDeltas = function() {
            return {dx: dx, dy:dy, dz:dz};
        }
    }

    /* PRIVATE METHODS */

    function drawTile(x, y, z, key) {
        var isoPoint = this.topDownToIso({x: x, y: y}),
            // paddingTop = (this.data.length - 1) * this.assets.tile.depth,
            // paddingTop = this.getMaxZ() * this.assets.tile.depth / 2,
            paddingTop = this.assets.tile.depth,
            deltas = this.getDeltas(),
            xTile = isoPoint.x * deltas.dx + (this.size.width * deltas.dx),
            yTile = isoPoint.y * deltas.dy - (z * deltas.dz) + paddingTop;

        if (this.assets.images[key]) {
            this.context.drawImage(this.assets.images[key].image, this.calcX(xTile, yTile), this.calcY(xTile, yTile));
        }
    }

    /* PUBLIC METHODS */

    Map.prototype.topDownToIso = function(coord) {
        return {
            x: coord.x - coord.y,
            y: coord.y + coord.x
        };
    }

    Map.prototype.getData = function() {
        return this.data;
    }

    Map.prototype.setData = function(data) {
        this.data = data;
    }

    Map.prototype.getTile = function(x, y, z) {
        return this.data[z][y][x];
    }

    Map.prototype.setTile = function(x, y, z, key) {
        var tileLine = this.data[z][y].split('');
        tileLine[x] = key;
        this.data[z][y] = tileLine.join('');
    }

    Map.prototype.getMaxZ = function() {
        var layer,
            maxZ = 0;
        for (layer = 0; layer < this.data.length; layer++) {
            if (this.data[layer].z > maxZ) {
                maxZ = this.data[layer].z;
            }
        }
        return maxZ;
    }

    Map.prototype.clear = function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    Map.prototype.render = function() {
        var layer, y, x;

        for (layer = 0; layer < this.data.length; layer++) {
            for (y = 0; y < this.data[layer].xy.length; y++) { 
                for (x = 0; x < this.data[layer].xy[y].length; x++) {
                    drawTile.call(this, x, y, this.data[layer].z, this.data[layer].xy[y][x]);
                }
            }
        }
    }

    return Map;
}());

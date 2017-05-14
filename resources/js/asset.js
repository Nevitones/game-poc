var GamePoc = GamePoc || {};
GamePoc.Asset = (function() {

    function Asset(data) {
        this.data = data;
    }

    Asset.prototype.loadImages = function(callback) {
        var count = 0,
            totalTiles = 0,
            imageInfo;

        for (imageKey in this.data.images) {
            totalTiles++;
            imageInfo = this.data.images[imageKey];
            imageInfo.image = new Image();
            imageInfo.image.onload = function() {
                count++;
                if (count === totalTiles) {
                    callback();
                }
            }
            imageInfo.image.src = imageInfo.imagePath;
        }
    }

    return Asset;
}());

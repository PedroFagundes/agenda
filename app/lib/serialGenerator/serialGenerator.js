angular.module("serialGenerator", []);
angular.module("serialGenerator").provider("serialGenerator", function () {
	this.$get = function () {
		return {
			generate: function () {
				var serial = "";
				while(serial.length < _length) {
					serial += String.fromCharCode(Math.floor(Math.random() * 64) + 32);
				}
				return serial;
			}
		};
	};
});
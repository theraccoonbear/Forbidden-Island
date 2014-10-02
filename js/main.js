var Game = Class.extend({
	pieces: {},
	
	constructor: function() {
		var ctxt = this;
		ctxt.init();
	},
	
	init: function() {
		var ctxt = this;
		$.getJSON('/js/data/pieces.json', function(data) {
			ctxt.pieces = data;
			console.log(data);
		});
	}
});

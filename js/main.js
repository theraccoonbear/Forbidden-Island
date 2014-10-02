var Game = Class.extend({
	pieces: {},
	tiles: [],
	treasures: [],
	
	toHook: [
		'body'
	],
	
	board: [
		[false, false, true, true, false, false],
		[false, true,  true, true, true,  false],
		[true,  true,  true, true, true,  true ],
		[true,  true,  true, true, true,  true ],
		[false, true,  true, true, true,  false],
		[false, false, true, true, false, false],
	],
	
	$elems: {},
	
	constructor: function() {
		var ctxt = this;
		ctxt.hooks();
		ctxt.init();
	},
	
	hooks: function() {
		var ctxt = this;
		$.each(ctxt.toHook, function(idx, sel) {
			ctxt.$elems['$' + sel] = $(sel);
		});
	},
	
	init: function() {
		var ctxt = this;
		$.getJSON('./js/data/pieces.json', function(data) {
			ctxt.tiles = data.box.tiles;
			ctxt.treasures = data.box.treasures;
			ctxt.setupBoard();
		});
	},
	
	cellGetsTile: function(x, y) {
		var ctxt = this;
		return ctxt.board[y][x] === true;
	},
	
	placeTile: function(x, y) {
		var ctxt = this;
		var tiles = ctxt.tiles;
		var tile = false;
		while (tile === false) {
			var idx = Math.floor(Math.random() * tiles.length);
			if (tiles[idx].location === false) {
				tile = tiles[idx];
				tiles[idx].location = [x, y];
				var $tile = $('<div></div>');
				$tile
					.addClass('tile')
					.addClass(tile.key)
					.attr('title', tile.name)
					.click(function() {
						$(this).toggleClass('flooded');
					});
				
				return $tile;
			}
		}
	},
	
	setupBoard: function() {
		var ctxt = this;
		var el = ctxt.$elems;
		
		for (var idx = 0, l = ctxt.tiles.length; idx < l; idx++) {
			ctxt.tiles[idx].location = false;
		}
		
		el.$tiles = $('<table></table>')
			.addClass("tileGrid");
		
		for (var y = 0; y < 6; y++) {
			var $row = $('<tr></tr>');
			$row.data('row', (y + 1));
			el.$tiles.append($row);
			
			for (var x = 0; x < 6; x++) {
				var $cell = $('<td></td>');
				$cell.data('row', (y + 1)).data('col', (x + 1));
				if (ctxt.cellGetsTile(x, y)) {
					var $tile = ctxt.placeTile(x, y);
					$cell.append($tile);
				}
				
				$row.append($cell);
			}
			
		}
		el.$body.append(el.$tiles);
	},
	
	_xyz: null
});

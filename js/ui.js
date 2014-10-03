var UI = Class.extend({
	_defaults: {
		title: "Dialog",
		buttons: {
			close: true,
			OK: true,
			cancel: true
		}
	},
	
	structure: {
		a: {class: 'dialogWrapper'},
		c: [
			{
				a: {class: 'overlay'}
			},
			{
				a: {class: 'dialog'},
				c: [
					{
						a: {class: 'dialogHeader'},
						c: [
							{
								e: 'h1',
								a: {class: 'dialogTitle'}
							},
							{
								e: 'span',
								a: {class: 'dialogCloser'}
							}
						]
					},
					{
						a: {class: 'dialogBody'}
					},
					{
						a: {class: 'dialogFooter'}
					}
				]
			}
		]
	},
	
	$elems: {},
	
	constructor: function(o) {
		var ctxt = this;
		UI.super.constructor.call(this);
		this.options = $.extend({}, ctxt._defaults, o);
		ctxt.$structure = ctxt.build(ctxt.structure);
		$('body').append(ctxt.$structure);
		this.init();
	},
	
	build: function(s) {
		var ctxt = this;
		s = $.extend({}, {e: 'div', a: {}, c: [], i: 'elem_' + (new Date()).getTime()}, s);
		var $s = $('<' + s.e + '>');
		$.each(s.a, function(n, v) {
			$s.attr(n, v);
		});
		
		$.each(s.c, function(i, cs) {
			$s.append(ctxt.build(cs));
		});
		
		if (typeof $s.attr('id') === 'undefined'){
			$s.attr('id', s.i);
		}
		
		return $s;
	},
	
	init: function() {
		
	}
	
	
});
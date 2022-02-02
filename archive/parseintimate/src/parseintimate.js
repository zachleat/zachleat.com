/* 
 * BigTyper types text.
 * @author Zach Leatherman
 *
 * Animates text typing onto the screen. When finished, allows user to
 * also type their own text. Does not use contenteditable, so that we can
 * have more control over the cursor style. Side benefit: better mobile
 * support.
 */
var BigTyper = function($content, options)
{
	// TODO option to customize for 1px cursor OR block cursor.
	var deferred = $.Deferred(),
		text = $content.text(),
		$cursor = $('<span class="cursor"/>'),
		cancelFocus = false,
		defaultOptions = {
			delay: 50,
			variableDelay: 100,
			saveOriginalText: true,
			inputId: 'bigtyper-input',
			triggerFocus: true
		};

	options = $.extend({}, defaultOptions, options || {});

	$content.addClass('bigtyper')
		.css('min-height', $content.height())
		.empty()
		.append($cursor);

	if(!text.length || options.delay === 0) {
		deferred.resolve();
	} else {
		// TODO split on word, insert a variable delay between words
		for(var j=0, k=text.length; j<k; j++) {
			setTimeout(function()
			{
				var currentText = $cursor.text(),
					len = currentText.length;

				$cursor.html(currentText + text.substr(len, 1));

				if(len + 1 === text.length) {
					deferred.resolve();
				}
			}, j*options.delay + Math.random()*options.variableDelay);
		}
	}

	// Skip focus on scroll, otherwise the scrollbar jumps back to top.
	$(document).one('scroll', function()
	{
		cancelFocus = true;
	});

	return deferred.promise().done(function()
	{
		// Set up input proxy to allow 'typing' into the field.
		var originalValue = $cursor.text(),
			$mimic;

		$mimic = $('<textarea/>')
			.attr('id', options.inputId)
			.css({
				position: 'absolute',
				top: 0,
				left: -1000
			})
			.focus(function()
			{
				$
				$cursor.addClass('cursor blinking');
			})
			.blur(function()
			{
				$cursor.removeClass('cursor blinking');
			})
			.keydown(function(event)
			{
				switch(event.keyCode) {
					case 35: // end
					case 36: // home
					case 37: // left arrow
					case 38: // up arrow
					case 39: // right arrow
					case 40: // down arrow
						event.preventDefault();
				}
			})
			.bind('input', function(event)
			{
				$cursor.html((options.saveOriginalText ? originalValue + ' ' : '') + $(this).val());

				$content.trigger('bigTyperInput');
			})
			.appendTo(document.body);

		if(!cancelFocus && options.triggerFocus) {
			$mimic.focus();
		}

		$content.click(function()
		{
			$mimic.focus();
		});
	});
};

// Parse Intimate

(function($)
{
	// jQuery additions
	$.c = function(tagName)
	{
		return $(document.createElement(tagName));
	};

	$.byId = function(id)
	{
		return $(document.getElementById(id));
	};
})(jQuery);

(function($)
{
	var $input,
		clearPending = true,
		$log = $.byId('log'),
		$commandline = $.byId('commandline'),
		$instructions = $.byId('instructions'),
		stringId = 'string-argument',
		$viewportMeta = $('meta[name="viewport"]');

	var parseIntimate = {
		template: function(val, base, output, isCorrect)
		{
			return ['<div class="command">',
					'<span class="prompt">&gt; </span>',
					'parseInt(“<span class="numeric">',
					val,
					'</span>”',
					(base ? ', <span class="numeric">' + base + '</span>' : ''),
					');</div>',
					'<span class="result numeric">',
					output,
					'</span>',
					(base ? (isCorrect ? '<span class="label label-success">NO WORRIES.</span>' : '<span class="label label-important">WATCH OUT!</span>') : '')].join('');
		},
		parse: function(val)
		{
			var output,
				outputBase10,
				equal;

			switch(val) {
				case '8008135':
					output = 'NaN, that\'s anatomy.';
					break;
				default:
					output = parseInt(val);
					outputBase10 = parseInt(val, 10);
			}

			// NaN does not equal NaN
			equal = isNaN(output) && isNaN(outputBase10) || output == outputBase10;

			$log.append($.c('div')
				.addClass('terminal')
				.html(parseIntimate.template(val, null, output)));

			if(outputBase10) {
				$log.append($.c('div')
					.addClass('comparison' + (equal ? ' equality' : ' inequality'))
					.html(parseIntimate.template(val, 10, outputBase10, equal)));
			}
		},
		instructions: {
			init: function()
			{
				$instructions.modal({
					backdrop: true
				}).on('hidden', function () {
				  	$input.trigger('focus');
				});
			},
			hide: function()
			{
				$instructions.modal('hide');
			}
		}
	};

	BigTyper($('#parseintimate'), {
		delay: 0,
		saveOriginalText: false,
		inputId: stringId,
		triggerFocus: false
	}).done(function()
	{
		function changeZoom(event)
		{
			// http://nerd.vasilis.nl/prevent-ios-from-zooming-onfocus/
			$viewportMeta.attr('content', 'width=device-width,initial-scale=1,maximum-scale=' + (event.type == 'blur' ? 10 : 1));
		}

		$input = $.byId(stringId).bind('focus', function(event)
		{
			$commandline.addClass('active');
		}).bind('blur', function(event)
		{
			$commandline.removeClass('active');
			changeZoom(event);
		}).bind('keydown', function(event)
		{
			var $t = $(this),
				val,
				output;

			if(event.which == 13) {
				val = $t.val();

				parseIntimate.parse(val);
				$t.val('').trigger('input');

				$input.css('top', $commandline.offset().top);
				window.scrollTo(0, $(document).height());

				return false;
			} else if(clearPending) {
				clearPending = false;

				$t.val('').trigger('input');
			}
		});

		$(document).bind('click', function()
		{
			$input.focus();
		});

		// Prevent zoom on focus
		if(document.addEventListener) {
			$input[0].addEventListener('DOMFocusIn', changeZoom, false);
			// I can't test this, but this is for mobile Firefox (assuming it zooms on focus?)
			$input[0].addEventListener('onfocus', changeZoom, true);
		}
	});

	$(document).delegate('code.example', 'click', function(event)
	{
		var html = $(this).html(),
			match = html.match(/parseInt\(\"([^\"]*)\"\)/);

		if(match && match.length > 1) {
			parseIntimate.instructions.hide();

			parseIntimate.parse(match[1]);
		}
	});

	parseIntimate.instructions.init();
	parseIntimate.parse("08");
})(jQuery);
(function($) {
	 var converter = new Showdown.converter();
	 var UPDATE_INTERVAL = 150; // msec

	 var timerID = 0;
	 var previewFunction = function(e, elt) {
		 console.log('clearing tid=', timerID);
		 clearTimeout(timerID);
	 	 timerID = setTimeout(function() {
			 //console.log('running tid=', timerID);
			 //var prev = $(elt).siblings('iframe.preview');
			 var prev = $('div.preview', $(elt).parents('div.showdown'));
			 // console.log(e, 'prev=', prev, 'conv=',converter);
			 var text = elt.value;
			 text = converter.makeHtml(text);
			 // console.log('prev=', prev, 'text=', text);
			 // prev = $(prev[0].contentDocument.body);
			 //console.log(text);
			 prev.children('div.content').html(text);
			 //prev.resizable({handles: 's'});
		 }, UPDATE_INTERVAL);
	 }
	adminPageHandler = function() {
		 var prev = $(this).find('div.showdown div.preview');
		 //$('.showdown textarea').resizable({handles: 's'});
		 $(this).find('.showdown textarea').keyup(function(e) { return previewFunction(e, this); });
		 $(this).find('.showdown textarea').keyup();
	}
	
	$(document).ready(function(){
		if (typeof $(document).livequery != 'undefined') 
			$('#Form_EditForm').livequery(adminPageHandler);
		else	$('#Form_EditForm').each(adminPageHandler);
	});
})(jQuery);

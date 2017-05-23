
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ' ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');
    

    // YOUR CODE GOES HERE!

    var NYTimesURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?=' + cityStr + '&sort=newest&api-key=1d8dfecf2f7c45a5a5855aec78f8d156';

       $.getJSON(NYTimesURL, function(data) {
           //console.log(data);

			$nytHeaderElem.text('New York Times Articles About '+ cityStr);

			articles = data.response.docs;
           
			for (var i = 0; i < articles.length; i++) {
				var article = articles[i];
                $nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
				'<p>' + article.snippet + '</p>' +
				'</li>');
			};
            
		}).error(function(e) {
            $nytHeaderElem.text('ERROR: AJAX REQUEST FAILED');
    });
    // Wikipedia AJAX request goer here
    var wikiURl = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + cityStr + '&format=json&callback=wikiCallback'; 
        console.log(wikiUrl);

        $.ajax({
            url: wikiUrl,

            dataType: "jsonp",
            // jsonp: "callback",
            success: function( response ) {
                var articleList = response[1];

                for (var i = 0; i < articleList.length; i++) {
                    articleStr = articleList[i];
                    var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                    $wikiElem.append('<li><a href="' + url + '">' +
                        articleStr + '</a></li>');
                }
            }
        });    

    return false;
};




$('#form-container').submit(loadData);

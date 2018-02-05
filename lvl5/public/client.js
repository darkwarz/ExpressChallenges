/* global $ */
$(function(){
    $.get('/cities', appendToList);
    
    function appendToList(cities) {
        var list = [];
        var content, city;
        for(var i in cities){
            city = cities[i];
            content = '<a href="#" data-block="' +city+ '"><img src="https://lh3.googleusercontent.com/G2jzG8a6-GAA4yhxx3XMJfPXsm6_pluyeEWKr9I5swUGF62d2xo_Qg3Kdnu00HAmDQ=w300" height= 25px></a>' + ' ' + '<a href="/cities/' +city+ '">' +city+ '</a>';
            list.push($('<li>', { html: content }));
        }
        $('.cities-list').append(list);
    };
    
    $('form').on('submit', function(event) {
        event.preventDefault();
        var form = $(this);
        var cityData = form.serialize();
        
        $.ajax({
            type: 'POST', url: '/cities', data: cityData
        }).done(function(cityName){
            console.log(cityName);
            appendToList([cityName]);
            form.trigger('reset');
        });
    });
    
    $('.cities-list').on('click', 'a[data-block]', function(event){
        var target = $(event.currentTarget);
        if (!confirm('Are you sure you want to delete ' + target.data('block') + '?')) {
            return false;
        }
        
        $.ajax({
            type: 'DELETE', url: '/cities/' + target.data('block')
        }).done(function() {
            console.log('hello');
            target.parents('li').remove();
        });
         
    });
});
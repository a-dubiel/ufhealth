 /**
 * bookmark.js
 * 2015 Andrzej Dubiel | http://dubiel.me/
 */

 ; (function ($, window, document, undefined) {

    'use strict';

    var bmk;
    var Bookmark = Bookmark || {};

    Bookmark.init = function () {

        bmk = this;

        bmk.cache();
        bmk.bind();

        if($('.drag-me').length > 0) {
            bmk.dragndrop();
        }

    }; // init()

    Bookmark.cache = function () {

        bmk.$doc = $(document);
        bmk.$win = $(window);
        bmk.$html = $('html');
        bmk.$nav = $('nav');
        bmk.$dropdown = $('.dropdown');
        bmk.$form = $('.form-bmk');
        bmk.$notification = $('.notification');

    }; // cache()

    Bookmark.bind = function () {
        
        bmk.$doc.on('click', '[data-bmk-dropdown]', function (e) {
            e.preventDefault(); 
            $(this).addClass('bookmark-added'); 
            bmk.$dropdown.toggleClass('show-me');
        });

        bmk.$doc.on('click', '[data-bmk-remove]', function (e) {
            e.preventDefault(); 
            $('[data-bmk-dropdown]').removeClass('bookmark-added');
            bmk.$dropdown.toggleClass('show-me');
        });

        bmk.$form.on('submit', function (e){
            e.preventDefault();
            bmk.$dropdown.toggleClass('show-me');
        });

        bmk.$doc.on('click', '[data-bmk-icon], [data-bmk-ribbon]', function (e) {
            e.preventDefault(); 

            if($(this).hasClass('bookmark-added')) {
                bmk.$notification.find('p').text('This page has been removed from your bookmarks!');
                bmk.$notification.addClass('notification-danger show-me').delay(3500).queue(function(next){
                    $(this).removeClass('notification-danger show-me');
                    next(); 
                });
                $(this).removeClass('bookmark-added');
            }
            else {
                bmk.$notification.find('p').text('This page has been added to your bookmarks!');
                bmk.$notification.addClass('notification-success show-me').delay(3500).queue(function(next){
                    $(this).removeClass('notification-success show-me');
                    next(); 
                });
                $(this).addClass('bookmark-added');
            }     
        });

        bmk.$doc.on('click', '[data-notification-close]', function (e) {
            e.preventDefault();
            bmk.$notification.removeClass('show-me');
        });

    }; //bind()

    Bookmark.dragndrop = function(){

        $('.drag-me').draggable({
            drag: function() {
                $('body').addClass('is-dragging');
            },
            stop: function() {
               setTimeout(function(){ $('body').removeClass('is-dragging')}, 1200);
           },
           revertDuration: 100,
           revert: true
       });

        $('.drop-in').droppable({
            drop: function(event, ui) {
                $(this).append('<div class="item"><i class="fa fa-user"></i></div>');
                $('.drag-me').addClass('bookmark-added');
            },
            hoverClass: 'drop-hover',
            accept: '.drag-me'
        });

    }; // dragndrop()

    window.Bookmark = Bookmark;
    window.Bookmark.init();

})(jQuery, window, document);
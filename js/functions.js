jQuery(document).ready(function($){

    positionSidebar();

    $(window).resize(function(){
        positionSidebar();
    });

    // display the primary menu at mobile widths
    $('#toggle-navigation').on('click', openPrimaryMenu);

    // display the dropdown menus
    $('.toggle-dropdown').on('click', openDropdownMenu);

    // push down sidebar when dropdown menu opened
    $('.toggle-dropdown').on('click', adjustSidebarPosition);

    function openPrimaryMenu() {

        var sidebar = $('#main-sidebar');

        // if menu open
        if( sidebar.hasClass('open') ) {

            // remove styling class
            sidebar.removeClass('open');

            // close all ULs by removing increased max-height
            $('#menu-primary-items ul, .menu-unset ul').removeAttr('style');

            // close all ULs and require 2 clicks again when reopened
            $('.menu-item-has-children').each(function(){
                if( $(this).hasClass('open') ) {
                    $(this).removeClass('open');
                }
            });
        } else {
            sidebar.addClass('open');
        }
    }

    function openDropdownMenu() {

        var menuItem = $(this).parent();

        if( menuItem.hasClass('open') ) {
            menuItem.removeClass('open');
        } else {
            menuItem.addClass('open');
        }
    }

    function positionSidebar() {

        var windowWidth = $(window).width();

        // if at width when menu is absolutely positioned
        if( windowWidth > 549 && windowWidth < 950 ) {

            var socialIconsHeight = 0;

            if( $('#site-header').find('.social-media-icons').length ) {
                socialIconsHeight = $('#site-header').find('.social-media-icons').find('ul').outerHeight();
            }

            // get the selector for the primary menu
            if( $('.menu-unset').length ) {
                var menu = $('.menu-unset');
            } else {
                var menu = $('#menu-primary-items');
            }
            var menuHeight = menu.outerHeight();
            var headerHeight = $('#main-sidebar').outerHeight();

            $('#menu-primary').css('top', headerHeight + socialIconsHeight + 24 + 'px');
            // below the header and menu + 24 for margin
            $('#sidebar-primary').css('top', headerHeight + socialIconsHeight + menuHeight + 48 + 'px');
        }
        else {
            $('#sidebar-primary, #menu-primary').css('top', '');
        }
    }

    function adjustSidebarPosition() {

        /*
         When .toggle-dropdown is clicked, get the adjacent ul.sub-menu and get the height of
         it's child li elements combined (X).
         Increase the top value for the sidebar by X
         */

        // get the current window width
        var windowWidth = $(window).width();

        // if at width when menu is absolutely positioned
        if( windowWidth > 549 && windowWidth < 950 ) {

            // get the submenu
            var list = $(this).next();

            // set the height variable
            var listHeight = 0;

            // get the height of all the child li elements combined (because ul has max-height: 0)
            list.children().each(function(){
                listHeight = listHeight + $(this).height();
            });

            // get the current top value for the sidebar
            var sidebarTop = $('#sidebar-primary').css('top');

            // remove 'px' so addition is possible
            sidebarTop = parseInt(sidebarTop);

            // set the new top value for the sidebar
            $('#sidebar-primary').css('top', sidebarTop + listHeight + 'px');
        }
    }

});
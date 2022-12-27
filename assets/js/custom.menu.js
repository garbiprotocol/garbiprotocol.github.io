jQuery.fn.extend({
    setMenu: function() {
        return this.each(function() {
            var containermenu = $(this);

            var itemmenu = containermenu.find('.ctmenu-item');
            itemmenu.click(function() {
                var submenuitem = containermenu.find('.ctmenu-sub');
                submenuitem.slideToggle(200);
            });
            $(document).click(function(e) {
                if (!containermenu.is(e.target) &&
                    containermenu.has(e.target).length === 0) {
                    var isopened =
                        containermenu.find('.ctmenu-sub').css("display");

                    if (isopened == 'block') {
                        containermenu.find('.tmenu-sub').slideToggle(200);
                    }
                }
            });
        });
    },
});
$('.dropMenu').setMenu();
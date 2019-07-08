require([
    'jquery'
], function($) {
    $(document).on('click.plugin.termtabs', '.termtabs .termtabs-header .tab', function(e) {
        var $btn = $(e.target);
        var $tabs = $btn.parents('.termtabs');
        var tabId = $btn.data('codetab');

        $tabs.find('.tab').removeClass('active');
        $tabs.find('.tab[data-codetab="' + tabId + '"]').addClass('active');
    });
});

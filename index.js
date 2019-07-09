/*
    Generate HTML for the tab in the header

    @param {Block}
    @param {Boolean}
    @return {String}
*/
function createTab(block, i, isActive) {
    return '<div class="tab' + (isActive? ' active' : '') + '" data-termtab="' + i + '">' + block.kwargs.name + '</div>';
}

(function () {
    var old = console.log;
    var logger = document.getElementById('log');
    console.log = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
    }
})();

/*
    Generate HTML for the tab's content

    @param {Block}
    @param {Boolean}
    @return {String}
*/
function createTabBody(block, i, isActive) {
    return this.renderBlock('markdown', block.body)
    .then(function (data){
    console.log(data);
    return '<div class="tab' + (isActive? ' active' : '') + '" data-termtab="' + i + '">'
        + data + '</div>'
    });
}

module.exports = {
    this: {
        assets: './assets',
        css: [
            'termtabs.css'
        ],
        js: [
            'termtabs.js'
        ]
    },

    blocks: {
        termtabs: {
            blocks: ['tab'],
            process: function(parentBlock) {
                var blocks = [parentBlock].concat(parentBlock.blocks);
                var tabsContent = '';
                var tabsHeader = '';

                blocks.forEach(function(block, i) {
                    var isActive = (i == 0);

                    if (!block.kwargs.name) {
                        throw new Error('The tab requires a "name" property');
                    }

                    tabsHeader += createTab(block, i, isActive);
                    tabsContent += createTabBody(block, i, isActive);
                });


                return '<div class="termtabs">' +
                    '<div class="termtabs-header">' + tabsHeader + '</div>' +
                    '<div class="termtabs-body">' + tabsContent + '</div>' +
                '</div>';
            }
        }
    }
};

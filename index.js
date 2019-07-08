//var escape = require('escape-html');

/*
    Generate HTML for the tab in the header

    @param {Block}
    @param {Boolean}
    @return {String}
*/
function createTab(block, i, isActive) {
    return '<div class="tab' + (isActive? ' active' : '') + '" data-codetab="' + i + '">' + block.kwargs.name + '</div>';
}

/*
    Generate HTML for the tab's content

    @param {Block}
    @param {Boolean}
    @return {String}
*/
function createTabBody(block, i, isActive) {
    return '<div class="tab' + (isActive? ' active' : '') + '" data-codetab="' + i + '"><pre><code>'
        + block.body +
    '</code></pre></div>';
}

module.exports = {
    book: {
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
                        throw new Error('Code tab requires a "name" property');
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

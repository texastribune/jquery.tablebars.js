// jquery tablebars plugin
// version 0.1
// usage: $('table').tablebars()
// to turn on bars for a column, add the 'tablebars' class to the corresponding
// header. By default, the bars have no style. you'll can style them with:
//
//      .ui-tablebar { color: #333; background: #DACD99; }
//
// limitations: table must have a thead, data must be simple
jQuery.fn.tablebars = function(){
    $(this).each(function(){
        var table = $(this);

        function pickColumns(table){
            var columns = [];
            table.find('thead > tr:eq(0)').children().each(function(i, cell){
                if ($(cell).hasClass('tablebars')) columns.push(i);
            });
            return columns;
        }

        function processColumn(set){
            set.children('span.ui-tablebar').remove();
            var data = [],
                rawdata = [],
                max = 0,
                width = set.eq(0).width();
            set.each(function(i, cell){
                var rawvalue = rawdata[i] = $(cell).text();
                var value = data[i] = Math.max(0, +rawvalue.replace(/[^0-9.\-]+/g,''));
                max = Math.max(max, value);
            });
            if (!max) max = 1;
            set.css('position', 'relative').prepend($('<span class="ui-tablebar" style="overflow:hidden; position:absolute; width:0;"></span>'));
            set.each(function(i, cell){
                $(cell).find('span.ui-tablebar').width(width * data[i] / max).html(rawdata[i]);
            });
        }

        function collectCells(columns){
            columns.forEach(function(index){
                var set = $(table.find('tbody > tr > td:nth-child(' + (index + 1) + ')'));
                processColumn(set);
            });
        }

        collectCells(pickColumns(table));
    });
    return this;
};

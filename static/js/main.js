
$(document).ready(function(){      
    $('#builder').advancedQueryBuilder({        
        filters: [{
            id: 'category',
            label: 'Category',
            type: 'integer',
            input: 'select',
            multiple: true,
            values: {
                1: 'Books',
                2: 'Movies',
                3: 'Music',
                4: 'Tools',
                5: 'Goodies',
                6: 'Clothes'
            },
            operators: ['equal', 'not_equal', 'in', 'not_in', 'is_null', 'is_not_null'],
            placeholder: 'Books, Movies, Music',
        }, {
            id: 'in_stock',
            label: 'In stock',
            type: 'integer',
            input: 'select',
            values: {
                1: 'True',
                0: 'False'
            },
            operators: ['equal']
        }, {
            id: 'price',
            label: 'Price',
            type: 'double',
            input: 'text',
            placeholder: 'Enter number (e.g. 3)',
            validation: {
                min: 0,
                step: 0.01
            }
        }, {
            id: 'created_at',
            label: 'Created',
            type: 'date',
            placeholder: 'Enter date (e. g. 1999/01/19)',
            validation: {
              format: 'YYYY/MM/DD'
            },
            plugin: 'datepicker',
            plugin_config: {
                format: 'yyyy/mm/dd',
                todayBtn: 'linked',
                todayHighlight: true,
                autoclose: true
            },
        }, {
            id: 'id',
            label: 'Identifier',
            type: 'string',
            placeholder: '____-____-____',
            operators: ['equal', 'not_equal'],
            validation: {
                format: /^.{4}-.{4}-.{4}$/
            }
        }],
        allow_groups: false,
        inputs_separator: ' and ',
    });

    $('#get_rule').click(function() {
        console.log($('#builder').queryBuilder('getRules'));
    });
});

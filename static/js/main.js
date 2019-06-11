
$(document).ready(function(){      
    $('#builder').advancedQueryBuilder({        
        filters: [{
            id: 'category',
            label: 'Category',
            type: 'integer',
            input: 'select',
            values: {
                1: 'Books',
                2: 'Movies',
                3: 'Music',
                4: 'Tools',
                5: 'Goodies',
                6: 'Clothes'
            },
            operators: ['equal', 'not_equal', 'in', 'not_in', 'is_null', 'is_not_null']
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
            validation: {
                min: 0,
                step: 0.01
            }
        }, {
            id: 'created_at',
            label: 'Created',
            type: 'date',
            validation: {
              format: 'YYYY/MM/DD'
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

    });

    $('#get_rule').click(function() {
        console.log($('#builder').queryBuilder('getRules'));
    });
});

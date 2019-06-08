jq331(document).ready(function(){
    var options = {
        allow_empty: true,
        filters: [
        {
            id: 'label',
            label: 'Name',
            type: 'string',
            default_value: 'gaur',
            size: 30,
            unique:true
        }
        ],
        allow_groups:false,
        conditions: ['OR'],
        default_condition: 'OR',

    }

    jq331('#builder').queryBuilder(options);

});


function updateQuerybuilderElements() {
  $('.rules-list .input-field > select').formSelect();
  $('.query-builder .rules-list .rule-value-container input.form-control').each(function() {
    if ($(this).parent().hasClass('select-wrapper'))
      return;
    $(this).before(`<div class="input-field white lighten-1"><div class="select-wrapper"></div></div>`);
    $(this).prev().children().first().append($(this));
  });

  $('.rule-container').on('mouseenter', function() {
    $(this).find('.rule-header').show();
  });
  
  $('.rule-container').on('mouseleave', function() {
    $(this).find('.rule-header').hide();
  });
  
  $('.rule-filter-container').each(function() {
    operatorEl = $(this).next();
    valueEl = operatorEl.next();

    if (operatorEl.html() === '' || operatorEl.is(":visible") == false){
      $(this).addClass('no-after');
    } else {
      $(this).removeClass('no-after');      
    }

    if (valueEl.html() === '' || valueEl.is(":visible") == false) {
      operatorEl.addClass('no-after');
    } else {
      operatorEl.removeClass('no-after');
    }
  });

  $('.input-field > span:first-child').hide();
}

$.fn.extend({
    advancedQueryBuilder: function(options) {
      newOptions = {
        templates: {
          group: '\
          <div id="{{= it.group_id }}" class="rules-group-container"> \
            <div class=rules-group-body> \
              <div class=rules-list></div> \
            </div> \
            <div class="rules-group-header"> \
              <div class="btn-group pull-right group-actions"> \
                <button type="button" class="btn btn-xs waves-effect white grey-text text-darken-4" data-add="rule"> \
                  <i class="{{= it.icons.add_rule }} green-text text-darken-1"></i> {{= it.translate("add_rule") }} \
                </button> \
                {{? it.settings.allow_groups===-1 || it.settings.allow_groups>=it.level }} \
                  <button type="button" class="btn btn-xs waves-effect white grey-text text-darken-4" data-add="group"> \
                    <i class="{{= it.icons.add_group }} green-text text-darken-1 white"></i> {{= it.translate("add_group") }} \
                  </button> \
                {{?}} \
                {{? it.level>1 }} \
                  <button type="button" class="btn btn-xs waves-effect white grey-text text-darken-4" data-delete="group"> \
                    <i class="{{= it.icons.remove_group }} red-text red-darken-1"></i> {{= it.translate("delete_group") }} \
                  </button> \
                {{?}} \
              </div> \
              <div class="btn-group group-conditions"> \
                {{~ it.conditions: condition }} \
                  <label class="btn btn-xs btn-primary"> \
                    <input type="radio" name="{{= it.group_id }}_cond" value="{{= condition }}"> {{= it.translate("conditions", condition) }} \
                  </label> \
                {{~}} \
              </div> \
              {{? it.settings.display_errors }} \
                <div class="error-container"><i class="{{= it.icons.error }}"></i></div> \
              {{?}} \
            </div> \
          </div>',
          rule: '\
          <div id="{{= it.rule_id }}" class="rule-container"> \
            <div class="rule-filter-container"></div> \
            <div class="rule-operator-container"></div> \
            <div class="rule-value-container"></div> \
            {{? it.settings.display_errors }} \
              <div class="error-container"><i class="{{= it.icons.error }}"></i></div> \
            {{?}} \
            <div class="rule-header" style="display:none;"> \
              <div class="btn-group pull-right rule-actions"> \
                <button type="button" class="btn btn-floating btn-small waves-effect waves-light grey darken-2 btn-remove" data-delete="rule"> \
                  <i class="{{= it.icons.remove_rule }} grey-text text-lighten-3"></i> {{= it.translate("delete_rule") }} \
                </button> \
              </div> \
            </div> \
          </div>',
          filterSelect: '\
          {{ var optgroup = null; }} \
          <div class="input-field blue darken-2">\
            <select class="form-control" name="{{= it.rule.id }}_filter"> \
              {{? it.settings.display_empty_filter }} \
                <option value="-1">{{= it.settings.select_placeholder }}</option> \
              {{?}} \
              {{~ it.filters: filter }} \
                {{? optgroup !== filter.optgroup }} \
                  {{? optgroup !== null }}</optgroup>{{?}} \
                  {{? (optgroup = filter.optgroup) !== null }} \
                    <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> \
                  {{?}} \
                {{?}} \
                <option class="waves-effect" value="{{= filter.id }}" {{? filter.icon}}data-icon="{{= filter.icon}}"{{?}}>{{= it.translate(filter.label) }}</option> \
              {{~}} \
              {{? optgroup !== null }}</optgroup>{{?}} \
            </select>\
          </div>',
          operatorSelect: '\
          <div class="input-field blue lighten-1">\
            {{? it.operators.length === 1 }} \
            <span> \
            {{= it.translate("operators", it.operators[0].type) }} \
            </span> \
            {{?}} \
            {{ var optgroup = null; }} \
            <select class="form-control {{? it.operators.length === 1 }}hide{{?}}" name="{{= it.rule.id }}_operator"> \
                {{~ it.operators: operator }} \
                {{? optgroup !== operator.optgroup }} \
                    {{? optgroup !== null }}</optgroup>{{?}} \
                    {{? (optgroup = operator.optgroup) !== null }} \
                    <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> \
                    {{?}} \
                {{?}} \
                <option value="{{= operator.type }}" {{? operator.icon}}data-icon="{{= operator.icon}}"{{?}}>{{= it.translate("operators", operator.type) }}</option> \
                {{~}} \
                {{? optgroup !== null }}</optgroup>{{?}} \
            </select>\
          </div>',
          ruleValueSelect: '\
          <div class="input-field white lighten-1">\
            {{ var optgroup = null; }} \
            <select class="form-control grey-text text-darken-1" name="{{= it.name }}" {{? it.rule.filter.multiple }}multiple{{?}}> \
              {{? it.rule.filter.placeholder }} \
                <option value="{{= it.rule.filter.placeholder_value }}" disabled selected>{{= it.rule.filter.placeholder }}</option> \
              {{?}} \
              {{~ it.rule.filter.values: entry }} \
                {{? optgroup !== entry.optgroup }} \
                  {{? optgroup !== null }}</optgroup>{{?}} \
                  {{? (optgroup = entry.optgroup) !== null }} \
                    <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> \
                  {{?}} \
                {{?}} \
                <option value="{{= entry.value }}">{{= entry.label }}</option> \
              {{~}} \
              {{? optgroup !== null }}</optgroup>{{?}} \
            </select>\
          </div>',
        }
      }
  
      $.extend(options, newOptions);
      this.queryBuilder(options);
      this.on('finishedRendering', function() {
         updateQuerybuilderElements();
      });

      // Fix for Bootstrap Datepicker
      this.on('afterUpdateRuleValue.queryBuilder', function(e, rule) {
        if (rule.filter.plugin === 'datepicker') {
          console.log(rule.$el);
          rule.$el.find('.rule-value-container input').addClass('datepicker');
          rule.$el.find('.rule-value-container input').datepicker();
        }
      });

      updateQuerybuilderElements();
    },
  });
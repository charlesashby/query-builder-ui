function updateQuerybuilderElements() {
  $('.rules-list .rule-filter-container .input-field > select').formSelect();
  $('.rules-list .rule-operator-container .input-field > select').formSelect();
  var placeholder;
  if ($('.rules-list .rule-value-container .input-field > select[multiple] option[value="-1"]').text()) {
    placeholder = $('.rules-list .rule-value-container .input-field > select[multiple] option[value="-1"]').text();
    $('.rules-list .rule-value-container .input-field > select[multiple] option[value="-1"]').remove();
    $('.rules-list .rule-value-container .input-field > select[multiple]').attr('placeholder', placeholder);
  }
  $('.rules-list .rule-value-container .input-field > select[multiple]').select2({
    placeholder: $('.rules-list .rule-value-container .input-field > select[multiple]').attr('placeholder'),
  });
  $('.rules-list .rule-value-container .input-field > select:not([multiple])').formSelect();
  
  $('.query-builder .rules-list .rule-value-container > input.form-control').each(function() {
    if ($(this).parent().hasClass('select-wrapper'))
      return;
    var valueContainer = $(this).parent();
    valueContainer.removeClass('rule-value-container').toggleClass('select-wrapper').removeClass('empty-content');
    valueContainer.prev().after('<div class="rule-value-container"><div class="input-field white lighten-1">');
    valueContainer.prev().find('.input-field').first().html(valueContainer);
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
      operatorEl.addClass('empty-content');
    } else {
      $(this).removeClass('no-after');
      $(this).addClass('filter-fixed');
      $(this).find('input.select-dropdown.dropdown-trigger').attr('disabled', '');
      operatorEl.removeClass('empty-content');
    }

    if (valueEl.html() === '' || valueEl.is(":visible") == false) {
      operatorEl.addClass('no-after');
      valueEl.addClass('empty-content');
    } else {
      operatorEl.removeClass('no-after');
      valueEl.removeClass('empty-content');
    }
  });

  $('.input-field > span:first-child').hide();

  $('.rules-group-body').each(function() {
    if ($(this).find('.rules-list').html() === ''){
      $(this).next().addClass('no-body');
    } else {
      $(this).next().removeClass('no-body');
    }
  });

  $('.input-seperator').prev().attr('style', 'text-align:center');
  $('.input-seperator').next().attr('style', 'text-align:center');
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
                  <div class="flex-layout layout-row layout-align-start-center"><icon class="add-icon flex-none inherit xlarge" key="add"><svg viewBox="0 0 24 24"><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"></path></svg></icon>\
                  <span class="add-filter-label cb-overflow-ellipsis flex-nogrow cb-margin-small-left">{{= it.translate("add_rule")}}</span></div>\
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
                <button class="mat-icon-button" mat-icon-button="" type="button" aria-label="Remove Filter" data-delete="rule"><span class="mat-button-wrapper"><icon key="remove" class="dark xlarge"><svg viewBox="0 0 24 24"><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"></path></svg></icon></span><div class="mat-button-ripple mat-ripple mat-button-ripple-round" matripple=""></div><div class="mat-button-focus-overlay"></div></button>\
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
      this.on('afterUpdateRuleFilter.queryBuilder', function() {
        
      });

      updateQuerybuilderElements();
    },
  });
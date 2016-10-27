var $ = require('jQuery');

var addSelected = function($el, $selections, sel, display, template){
  $selections.find('.empty-selection').hide();
  
  var text;
  if (template && typeof template === 'function') {
    text = template(sel);
  } else {
    text = display ? sel[display] : sel;
  }    
  
  $('<li class="ttmulti-selection list-group-item">' + text + '<i class="js-remove pull-right" style="cursor:pointer">✖</i></li>')
    .data("__ttmulti_data__", sel)
    .appendTo( $selections )
    .find(".js-remove").bind("click", function(){
      this.parentNode.remove();
      if ($selections.find('li:not(.empty-selection)').length === 0) {
        $selections.find('.empty-selection').show();
      }
      $el.trigger('selectionRemoved', sel);
    });
  
  $el.trigger('selectionAdded', sel);
};
var addEmpty = function ($selections, empty_selection) {
  var text;
  if (!empty_selection) {
    text = 'No selections.';
  } else {
    if (typeof empty_selection === 'function') {
      text = empty_selection();
    } else {
      text = '' + empty_selection;
    }
  }
  
  $('<li class="empty-selection list-group-item">' + text + '</li>')
    .appendTo( $selections );
};


$.fn.typeaheadmulti = function(options, dataset){
  function initialize(options, dataset){ //TODO: accept multiple datasets.
    var display = dataset ? dataset.display : undefined;
    var templates = dataset.templates || {};
    
    this.each(function(){
      var $el = $(this);
      var selections_id = Math.random().toString(36).slice(2);
      $el.data('selectionsContainer', selections_id);
      
      var $selections = $('<ul>').addClass("ttmulti-selections list-group");
      if (options.selectionsContainer) {
        $(options.selectionsContainer).append($selections);
      } else{
        $selections.insertBefore($el);
      }
      
      $selections.attr('id', selections_id);
      addEmpty($selections, templates.emptySelection);
      
      $el.typeahead(options, dataset)
        .bind('typeahead:select', function(ev, selection) {
          addSelected($el, $selections, selection, display, templates.selection);
          $el.typeahead('val', '');
        });  
    });
  
  }

  function getVal(newVal){
    // TODO: Check if the val is set. typeaheadmulti('val', someval)
    $input = this.filter('.tt-input');
    return(
      $('#' + $input.data('selectionsContainer'))
        .find(".ttmulti-selection").map(function(){
          return $(this).data("__ttmulti_data__");
        })
    );
  }

  if (options === 'val'){ 
    return getVal.call(this, [].slice.call(arguments, 1));
  }else{
    return initialize.call(this, options, dataset);
  }

  return this;
};


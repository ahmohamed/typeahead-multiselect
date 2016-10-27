(function( $ ) {
  var addSelected = function($selections, sel, display){
    $selections.find('.empty-selection').hide();
    
    var text = display ? sel[display] : sel;
    
    // TODO: allow templates to be rendered.
    $('<li>' + text + '<i class="js-remove">✖</i></li>')
      .data("__ttmulti_data__", sel)
      .appendTo( $selections )
      .find(".js-remove").bind("click", function(){
        this.parentNode.remove();
        if ($selections.find('li').length === 0) {
          $selections.find('.empty-selection').show();
        }
      });
  };
  var addEmpty = function ($selections) {
    // TODO: allow templates to be rendered.
    $('<li class="empty-selection">' + 'No selections.' + '</li>')
      .appendTo( $selections );
  };


  $.fn.typeaheadmulti = function(options, dataset){
    function initialize(options, dataset){ //TODO: accept multiple datasets.
      var display = dataset ? dataset.display : undefined;
      this.each(function(){
        var $el = $(this);
        var selections_id = Math.random().toString(36).slice(2);
        $el.data('selectionsContainer', selections_id);
        
        var $selections = options.selectionsContainer ||
          ($('<ul>').addClass("ttmulti-selections").insertBefore($el));
        
        $selections.attr('id', selections_id);
        addEmpty($selections);
        
        $el.typeahead(options, dataset)
          .bind('typeahead:select', function(ev, selection) {
            addSelected($selections, selection, display);
            $el.typeahead('val', '');
          });  
      });
    
    }

    function getVal(newVal){
      // TODO: Check if the val is set. typeaheadmulti('val', someval)
      
      return(
        $('#' + this.data('selectionsContainer'))
          .find("li").map(function(){
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

}( jQuery ));

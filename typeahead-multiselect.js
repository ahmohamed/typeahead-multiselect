(function( $ ) {
  var addSelected = function($selections, sel, display){
    var text = display ? sel[display] : sel;
    
    // TODO: allow templates to be rendered.
    $('<li>' + text + '<i class="js-remove">✖</i></li>')
      .data("__ttmulti_data__", sel)
      .appendTo( $selections )
      .find(".js-remove").bind("click", function(){
        this.parentNode.remove();
      });
  };


  $.fn.typeaheadmulti = function(options, dataset){
    function initialize(options, dataset){ //TODO: accept multiple datasets.
      var display = dataset ? dataset.display : undefined;
      this.each(function(){
        var $el = $(this);

        var $selections = $('<ul>').addClass("ttmulti-selections")
          .insertBefore($el);
      
        $el.typeahead(options, dataset)
          .bind('typeahead:select', function(ev, selection) {
            addSelected($selections, selection, display);
            $el.typeahead('val', "");
          });  
      });
    
    }

    function getVal(newVal){
      // TODO: Check if the val is set. typeaheadmulti('val', someval)
      return(
        this.first().parent().prev(".ttmulti-selections")
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

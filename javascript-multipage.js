($(window).on('load', function(){
  // Initializes all multipage containeres
  initialize_multipage();

  function initialize_multipage(){
    // Initializes all multipage containeres
    var containers = get_containers();
    containers.each(function(index, container){
      initialize_container(container);
    });
    function get_containers(){
      // Uses jQuery to return all elements with the attribute
      // [data-multipage-container], as an array of DOM element references
      // returns: containers[...]
      var containers = $('[data-multipage-container]');
      return containers;
    }
  };
  function initialize_container(container_element){
    // For each element with attribute [data-pagify-container],
    // creates a pages handler that listens for a custom event and
    // changes pages depending on the event properties.
    var pages_array = get_pages(container_element);
    console.log('DEBUG', pages_array);
    initialize_pages(pages_array);

    function get_pages(container_element){
      // Uses jQuery to return all elements with the attribute
      // [data-multipage-pageno], as an array of DOM element references
      // returns: pages_array[...]
      var pages_array = [];
      $(container_element)
        .find('[data-multipage-pageno]')
        .each(function(index, page_element){
          var page = $(page_element);
          var page_number = page.attr('[data-multipage-pageno]');
          pages_array.push(page_element);
        });
      return pages_array;
    };
    function initialize_pages(pages_array){
      pages_array.forEach(function(page, index){
        if(index == 0){
          $(page).show();  
        } else {
          console.log('hiding');
          $(page).hide();
        }
      });
    }
  };
}));
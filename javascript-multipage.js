// The MIT License (MIT)

// Copyright (c) 2014 Monarch Wadia / Jhaveri

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


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
    var current_container = $(container_element);
    var pages_array = get_pages(container_element);
    var buttons_array = get_buttons(container_elements);

    initialize_pages(pages_array);
    initialize_buttons(buttons_array);

    function get_pages(container_element){
      var elements = get_elements(container_element, '[data-multipage-page]');
      return elements;
    };
    function get_buttons(container_element){
      var next_buttons = get_elements(container_element, '[data-multipage-button-next]');
      var previous_buttons = get_elements(container_element, '[data-multipage-button-previous]');
      var first_buttons = get_elements(container_element, '[data-multipage-button-first]');
      var last_buttons = get_elements(container_element, '[data-multipage-button-last]');
      var object = {
        next_buttons: next_buttons,
        previous_buttons: previous_buttons,
        first_buttons: first_buttons,
        last_buttons: last_buttons
      };
      return object;
    };

    function get_elements(container_element, element_selector){
      // Uses jQuery to return all elements with the attribute
      // specified in element-selector, as an array of DOM element references
      // returns: elements_array[...]
      var elements_array = $(container_element)
        .find(element_selector)
      return elements_array;
    };

    function initialize_pages(pages_array){
      // Initializes pages by hiding all the pages in a containers except
      // the very first one.
      pages_array.each(function(index, page){
        if(index == 0){
          $(page).show();  
        } else {
          $(page).hide();
        }
      });
    };

    function initialize_buttons(buttons_object){
      buttons_object.next_buttons.each(index, button){
        $(button).on('click', function(){
          next_page();
        });
      };
      buttons_object.previous_buttons.each(index, button){
        $(button).on('click', function(){
          previous_page();
        });
      };
      buttons_object.first_buttons.each(index, button){
        $(button).on('click', function(){
          first_page();
        });
      };
      buttons_object.last_buttons.each(index, button){
        $(button).on('click', function(){
          last_page();
        });
      };
    };

    function get_page_from_direction(direction){
      var step;
      var target_page;
      var current_page = $(current_container)
        .find('[data-multipage-current-page]');        

      if(direction > 0 || direction < 0){
        step = direction;
      } else {
        step = 0;
      };

      if(current_page.length == 1){
        var current_page_index = $(pages_array).index(current_page);
      } else {
        target_page = 0;
        return $(pages_array)
      };


      return $(current_container)
        .find('[data-multipage-page]')
        .removeAttr('data-multipage-current-page')
        .hide()
        .get(target_page)
        .attr('data-multipage-current-page', true)
        .show();
    }

    function go_to_page(page_element){
      pages_array.hide();
      pages_array.attr('data-multipage-current-page', false)
      $(page_element)
        .show()
        .attr('data-multipage-current-page', true);
    };
  };
}));
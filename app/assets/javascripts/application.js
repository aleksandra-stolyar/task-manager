// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require best_in_place
//= require_tree .

$(document).ready(function() {
  jQuery(".best_in_place").best_in_place();

  $( "body" ).delegate( ".task-done", "change", function(e) {
    $.ajax({
      url: $(this).val(),
      type: 'GET',
      context: this
    }).done(function(data) {
      $(this).parent().html(data);
    });
  });

  $( "body" ).delegate( ".task-delete", "click", function(e) {
    e.preventDefault()
    $.ajax({
      url: $(this).attr('href'),
      type: 'DELETE',
      context: this
    }).done(function(data) {
      $(this).parent().remove();
    });
  });

  $( "body" ).delegate( ".task-add", "submit", function(e) {
    debugger
    $.ajax({
      type: "POST",
      url: $(this).attr('action'),
      data: $(this).serialize(),
      context: this
    }).success(function(data){
      $(this).siblings("ul").append(data);
    }).error(function(data){
      alert(data.responseText);
    });
    return false;

  });

  $( "body" ).delegate( ".project-delete", "click", function(e) {
    if (confirm("Delete project?"));
    if (answer) {
      e.preventDefault()
      $.ajax({
        url: $(this).attr('href'),
        type: 'DELETE',
        context: this
      }).done(function(data) {
        $(this).parent().parent().remove();
      });
    };  
  });

  $( "body" ).delegate( ".project-add", "click", function(e) {
    e.preventDefault()
    $.ajax({
      url: $(this).attr('href'),
      type: 'GET',
    }).done(function(data) {
      $('#projects-container').after(data);
    }).error(function(data){
      alert(data.responseText);
    });
    return false; 
  });

  $( ".sortable" ).sortable({
    stop: function(){
      var taskIds = [];
      $(this).children().each(function(){
        taskIds.push($(this).data("task-id"))
      });

      $.ajax({
        type: "POST",
        url: "/projects/save_sort",
        data: {
          taskIds: taskIds
        }
      });
    }
  });    

  $( ".sortable" ).disableSelection();

});


// ---- JS!!!!!! -----

// var taks_ids = []

// this.parent.li.each |li| {
//   taks_ids.push($(li).data("task-id"))
// }

// ajax_send_to_server( taks_ids )


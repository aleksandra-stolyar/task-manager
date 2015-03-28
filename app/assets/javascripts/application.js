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
      $(this).parent().replaceWith(data);
    });
  });

  $( "body" ).delegate( ".task-delete", "click", function(e) {
    var answer = confirm("Delete task?");
    if (answer) {
      e.preventDefault()
      $.ajax({
        url: $(this).attr('href'),
        type: 'DELETE',
        context: this
      }).done(function(data) {
        $(this).parent().remove();
      });
    };
  });

  $( "body" ).delegate( ".task-add", "submit", function(e) {
    $.ajax({
      type: "POST",
      url: $(this).attr('action'),
      data: $(this).serialize(),
      context: this
    }).success(function(data){
      $(this).siblings("ul").append(data);
      $(this).children(".task-name").val("");
    }).error(function(data){
      alert(data.responseText);
    });
    return false;
  });

  $( "body" ).delegate( ".project-delete", "click", function(e) {
    var answer = confirm("Delete project?");
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
      $('#projects-container').append(data);
      $('#projects-container .project:last').find('.task-deadline').datepicker();
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
  $( ".task-deadline").datepicker();
});

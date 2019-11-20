import { $ } from "protractor";

// JavaScript Document
$(document).ready(function(){
  $(window).sroll(function(event){
      var pos_body= $('html,body').srollTop();

      if(pos_body>1000){
        $('.backtotop').addClass('showup');
      }
      else{
        $('.backtotop').removeClass('showup');
      }
  });
  $('.backtotop').click(function(event){
    $('html,body').animate({
      scrollTop:0},1200);
  });
});

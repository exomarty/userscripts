// ==UserScript==
// @name         Tsubaseitor
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       Tidon
// @match        https://tsubasa.im/global/es/player/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @require      https://p.rst.im/p/cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js

// ==/UserScript==
function round5(x)
{
    return Math.round(x/5)*5;
}

function dark(){
var $ = window.jQuery;
$("body").css({"background-color": "black", "color": "white"});
$("table th").css({"background-color": "#241c1c", "olor": "white"});
$("table td").css({"background-color": "#241c1c", "color": "white"});
$("table").css({"background-color": "#241c1c", "color": "white"});
}


(function() {
    'use strict';
    // Your code here...

    var $ = window.jQuery;

   /* $('.breadcrumb').after("<button type='button' class='btn btn-primary' id='dark'>Dark</button>");
    $('#dark').on('mousedown', function(){
        dark();
    });
*/
    $('#DataTables_Table_0,#DataTables_Table_1').find('tr').each(function(){
      var tecnica = $(this).find('td').eq(0).text();
      var type = $(this).find('td').eq(1).text();
      var power = $(this).find('td').eq(3).text();
      var energy = $(this).find('td').eq(5).text();
      var Maxlvl = 0;
      var increment = 0;

      if( type == "S"){
          Maxlvl = 99;
          increment = 0.57;
      }
      else if ( type == "A"){
          if ( tecnica.indexOf( "(EX)" ) != -1 ){
              increment = 0.64;
          }
          else {
          increment = 0.60;
          }
          Maxlvl = 80;
      }
      else if ( type == "B"){
          Maxlvl = 60;
          increment = 0.60;
      }
      else if ( type == "C"){
          Maxlvl = 40;
          increment = 0.68;
      }

      var power0;

      power0 = power * increment;
      var power00 = round5(power0);

      $(this).find('th').eq(2).after('<th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label=": activate to sort column ascending" style="width: 34px;"><span class="fas fa-baby-carriage"></span></th>');
       $(this).find('td').eq(2).after("<td>" + (power00).toFixed(0) + "</td>");

      $(this).find('th').eq(10).after('<th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label=": activate to sort column ascending" style="width: 34px;"><span class="fas fa-cat"></span></th>');
      $(this).find('td').eq(10).after("<td>" + (power/energy).toFixed(2) + "</td>");
    });

var table = $('#DataTables_Table_0').DataTable({
    paging: false,
    "order": [ 2, 'asc' ],
     buttons: [
        'copy', 'excel', 'pdf'
    ]
});
var table2 = $('#DataTables_Table_1').DataTable({
    paging: false,
    "order": [ 2, 'asc' ]
});
table.draw();
table2.draw();


})();



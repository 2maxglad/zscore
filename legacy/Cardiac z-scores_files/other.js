$( document ).delegate("#mmode", "pagebeforecreate", function() {
    $().ready(function() {
    window.lang.run();
});
changeLanguage(window.lang);
setStrings();
mmode_calc();
setDatePicker();
setCurrentDate("current");

$("#dateInput_flip").bind("change", function(event, ui) {
    var dateInput = $("#dateInput_flip").val();
        showDateInput(dateInput);
        setDateInputStorage(dateInput);
        mmode_calc();
});

    $("input[name^='date']").keyup(function() {
dateInputKeyUp($(this), "mmode");
});

$("#radio").find("input[type='radio']").bind("change", function(){
mmode_calc();
});
});

$(function() {
var browserLang = getBrowserLanguage();

$('#birthday').mobiscroll().date({
    theme: 'ios',
    display: 'modal',
    mode: 'scroller',
    lang: browserLang,
    dateOrder: 'ddMMyy',
    onClose: function(html, inst) {
        $("#birthday").val(html);
        mmode_calc();
    }
});
$('#currentdate').mobiscroll().date({
    theme: 'ios',
    display: 'modal',
    mode: 'scroller',
    lang: browserLang,
    dateOrder: 'ddMMyy',
    onClose: function(html, inst) {
        $("#currentdate").val(html);
        mmode_calc();
    }
});
});

function changeLanguage() {
	window.lang = new jquery_lang_js();
}
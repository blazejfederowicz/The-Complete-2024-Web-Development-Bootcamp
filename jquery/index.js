$('h1').addClass('big');

$(document).keydown((e)=>{
    console.log(e.key)
    $('h1').text(e.key);
})
function isEmail(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
};
 
$(document).ready(function(){  
 
    $("form.forms").submit(function () {
        //When the form is submitted
        var elem = $("form.forms").children('fieldset').children('input, textarea');
        var error, foc;
  
        //Loop through each input and textarea
        elem.each(function (index) {
              
            //Does this have the class "required"?
            if ($(this).hasClass('required') == true) {
  
                //It has the class, is it empty or still have the default value?
                if (!this.value || this.value == this.defaultValue) {
  
                    //Add the error class for CSS styling
                    $(this).addClass("error");
                    $(this).append('<p>REQUIRED</p>');
  
                    //Switch the error var to true
                    error = true;
  
                    //If this is the first required element not filled out, save the ID
                    if (!foc) foc = $(this).attr("id");
                } else {
  
                    //If this is filled out make sure it doesn't have the error class
                    $(this).removeClass("error");
                }
            }
        });
 
        //If error has been switched to true
        if (error){     
 
            //Focus on the first required element that hasn't been filled out.
            if(foc)$('#'+foc).css("fontStyle","normal").focus();
 
            //Stop the form from submitting
            return false;
    }else{
            //Clear default values on non required elements before submit continues
//            if(elem.value == this.defaultValue)
//             this.value = "";
        }
		
    });  
 
 
});
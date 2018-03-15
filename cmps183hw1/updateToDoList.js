function updateOption(){
    var option = document.getElementById("option").value;
    if(option == "all"){
        document.getElementById("item1").style.display = 'block';
        document.getElementById("item2").style.display = 'block';
        document.getElementById("item3").style.display = 'block';
        document.getElementById("item4").style.display = 'block';
    }
    if(option == "completed"){
        if(document.getElementById("check1").checked == true)
            document.getElementById("item1").style.display = 'block';
        else 
            document.getElementById("item1").style.display = 'none';

        if(document.getElementById("check2").checked == true)
            document.getElementById("item2").style.display = 'block';
        else 
            document.getElementById("item2").style.display = 'none';

        if(document.getElementById("check3").checked == true)
            document.getElementById("item3").style.display = 'block';
        else 
            document.getElementById("item3").style.display = 'none';

        if(document.getElementById("check4").checked == true)
            document.getElementById("item4").style.display = 'block';
        else 
            document.getElementById("item4").style.display = 'none';
    }

    if(option == "todo"){
        if(document.getElementById("check1").checked == false)
            document.getElementById("item1").style.display = 'block';
        else 
            document.getElementById("item1").style.display = 'none';

        if(document.getElementById("check2").checked == false)
            document.getElementById("item2").style.display = 'block';
        else 
            document.getElementById("item2").style.display = 'none';

        if(document.getElementById("check3").checked == false)
            document.getElementById("item3").style.display = 'block';
        else 
            document.getElementById("item3").style.display = 'none';

        if(document.getElementById("check4").checked == false)
            document.getElementById("item4").style.display = 'block';
        else 
            document.getElementById("item4").style.display = 'none';
    }

}
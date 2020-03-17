// Code goes here

$(function () {
    'use strict';
    let stateArr = [];
    let allData;
    let lga;
    $.ajax({url: "http://locationsng-api.herokuapp.com/api/v1/lgas ", success: function(result){
        console.log(result)
        allData = result;
        result.map((value, index )=> {

            stateArr.push(value.alias);         
        });
        console.log(stateArr)
        searchState(stateArr);
    }});

    const searchState = (states) => {
        console.log(states)
         var optStates = new Bloodhound({

          datumTokenizer: Bloodhound.tokenizers.whitespace,
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          local: states
        });

        // passing in `null` for the `options` arguments will result in the default
        // options being used
        $('#mytyphead').typeahead(null, {
          name: 'optStates',
          source: optStates
        });
        
    }

    $("#mytyphead").change(()=> {
        let stateSeleceted = $("#mytyphead").val();
        allData.map((value) => {
            if(value.alias === stateSeleceted){
                lga = value.lgas;
                populateLga(lga);
            };
        });
    })

    const populateLga = (lgs) => {
        console.log(lgs)
        $("#lg").empty();
        lgs.map((value, index) => {
            console.log(value); 
            let option = `<option>${value}</option>`;
            $("#lg").append(option);
        });
    };
});
$(function(){
    $(document).on('click','#myButton',function(){
        let month= $('#inputMonth').find(':selected').val();
        let day=$('#inputDay').val();
        let year= $('#inputYear').val();
        if (month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12) {
            if (day>31 || day<0) 
            {window.alert("day must be lesst than 31 or equals 31");return;}
        }
        if (month==4 || month==6 || month==9 || month==11) {
            if (day>=31 || day<0) 
            {window.alert("day must be lesst than 31");return;}
        }
        if (month==2) {
            if(day>28 || day<0){window.alert("day must be lesst than 29");return;}
        }
        if (year<0) {window.alert("year must be greater than 0");return;}
       
        getDataFromAPI(
            month,day,year
        );
    });

    async function getDataFromAPI(month,day,year){
        $('.loader').fadeIn();
        let data = await fetch(`https://api.aladhan.com/v1/calendar?latitude=40&longitude=49&method=2&month=${month}&year=${year}`)
        .then(res=>res.json())
        .then(res=>res.data[day-1].timings);
        $('.cardCol').css("display","block");
        $('.cardCol .date span').text(`${day},${month},${year}`);
        $('.cardCol .fajr span').text(data.Fajr);
        $('.cardCol .sunrise span').text(data.Sunrise);
        $('.cardCol .dhuhr span').text(data.Dhuhr);
        $('.cardCol .asr span').text(data.Asr);
        $('.cardCol .sunset span').text(data.Sunset);
        $('.cardCol .maghrib span').text(data.Maghrib);
        $('.cardCol .isha span').text(data.Isha);
        $('.cardCol .imsak span').text(data.Imsak);
        $('.cardCol .midnight span').text(data.Midnight);
        $('.loader').fadeOut();
    }
});

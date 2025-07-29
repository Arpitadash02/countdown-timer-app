// const endDate=new Date('29 Jul, 2025 20:00:00').getTime();
// const startDate=new Date().getTime();

let countdownInterval;
function startCountdown(){
    clearInterval(countdownInterval);
    
    const dateInput=document.getElementById("user-date").value;
    const timeInput=document.getElementById("user-time").value;

    if(!dateInput || !timeInput){
        alert("Please, Enter both date and time!");
        return;
    }

    const endDate=new Date(`${dateInput}T${timeInput}:00`).getTime();
    const startDate=new Date().getTime();

    if(endDate<=startDate){
        alert("Please, Enter a future date and time.");
        return;
    }

    countdownInterval=setInterval(function updateTimer(){
    const now=new Date().getTime();

    const distanceCovered=now-startDate;
    const distancePending=endDate-now;

    //calculate days,hrs,min,secs
    //1day=24*60*60*1000ms
    const oneDayInMillis=(24*60*60*1000);
    const oneHourInMillis=(60*60*1000);
    const oneMinInMillis=(60*1000);
    const oneSecondInMillis=(1000);

    const days=Math.floor(distancePending/(oneDayInMillis));

    const hrs=Math.floor((distancePending%(oneDayInMillis)/(oneHourInMillis)));
    
    const mins=Math.floor((distancePending%(oneHourInMillis)/(oneMinInMillis)));
    
    const secs=Math.floor((distancePending%(oneMinInMillis))/(oneSecondInMillis));

    //populate in UI
    document.getElementById("days").innerHTML=days;
    document.getElementById("hours").innerHTML=hrs;
    document.getElementById("minutes").innerHTML=mins;
    document.getElementById("seconds").innerHTML=secs;

    //calculate width percentage for progress bar
    const totalDistance=endDate-startDate;

    const percentageDistance=(distanceCovered/totalDistance)*100;

    //set width for progress bar
    document.getElementById("progress-bar").style.width=percentageDistance+"%";
    if(distancePending<0){
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML="EXPIRED";
        document.getElementById("progress-bar").style.width="100%";
    }


},1000);

}

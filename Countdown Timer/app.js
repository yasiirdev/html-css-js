




let userMinutes = 5;
let totalSecond = userMinutes * 60;
 let ms = totalSecond * 1000;

  let btn = document.getElementById("btn");
  var counter = document.getElementById("counter");

  btn.addEventListener("click",()=>{
     let CurrentTime = new Date().getTime();
        let endTime = CurrentTime + ms;

       let timer = setInterval(()=>{

              var now = new Date().getTime();
              let RemainingTime = endTime - now;

         if (RemainingTime <= 0 ) {
                 clearInterval(timer);
                 counter.innerText =`00:00`;
                 return;
         }
         let  minutes =Math.floor( RemainingTime / (1000 * 60));
           let  second = Math.floor(RemainingTime % (1000* 60)/1000);      
                counter.innerText = `0${minutes}:${second}`;

        },1000);

               return;
  });


        

   
  
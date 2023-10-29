const popup =  document.querySelector('.popup')
const wifiIcon =  document.querySelector('.icon i')
const popupTitle = document.querySelector('.popup .title')

const popupDesc = document.querySelector('.desc');
const reconnectBtn = document.querySelector('.reconnect')

let isOnline = true;
let intervalId;
let timer = 10


const checkConnection = async()=>{
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        

        isOnline = response.status >= 200 && response.status < 300
    }
    catch(error){
        isOnline = false
    }
    timer =10;
    clearInterval(intervalId)
    handlePopup(isOnline)
}


const handlePopup = (status)=>{
    if(status){
        wifiIcon.className = 'uil uil-wifi';
        popupTitle.innerText = 'Restored Connection';
        popupDesc.innerHTML ='Your device is now successfully connected to the internet';
        popup.classList.add('online')
        return setTimeout(()=>popup.classList.remove('show','online'), 2000)
    } else {
        wifiIcon.className = 'uil uil-wifi-slash';
        popupTitle.innerText = 'Lost Connection';
        popupDesc.innerHTML ='Your Network is unavalaible. we will attempt to reconnect you in <b>10</b> seconds';
        popup.className = 'popup show'
    };


    intervalId = setInterval(()=>{
        timer--;
        if(timer===0){checkConnection()}
        document.querySelector('.desc b').innerText = timer;
    },1000)
}

setInterval(()=>{
    if(isOnline){
        checkConnection()
    }
}, 3000)


reconnectBtn.addEventListener('click', checkConnection)

let submit=false;
let crosshair=false;
let XYgenerated=false;
document.getElementById('name-preview').innerHTML="Abhinav";
document.getElementById("submit").addEventListener("click", function(e){
  e.preventDefault();
  let img= document.getElementById("file-input");
  const file=img.files[0];
  const reader=new FileReader();
    reader.readAsDataURL(file);
  reader.onload = function(event){
     const image=new Image();
     image.src=event.target.result;
     document.getElementById("image-preview").style.height = `${image.height}px`;
        document.getElementById("image-preview").style.width = `${image.width}px`;
      document.getElementById('image-preview').style.backgroundImage = `url(${image.src})`;
  };
  submit=true;
});

document.getElementById('add-name').addEventListener('click', function(event){
  event.preventDefault();
  if(submit){
  document.getElementsByClassName('crosshair-line')[0].style.visibility = 'visible';
  document.getElementsByClassName('crosshair-line')[1].style.visibility = 'visible';
  document.getElementById('name-preview').style.opacity = '.7';
  }
  crosshair=true;
});

document.addEventListener("mousemove", (e) => {
    if(crosshair){
      document.getElementById("vertical-line").style.left = `${e.clientX}px`;
      document.getElementById("horizontal-line").style.top = `${e.clientY}px`;
      document.getElementById("name-preview").style.left = `${e.clientX}px`;
      document.getElementById("name-preview").style.top = `${e.clientY}px`;
      document.getElementById("name-preview").style.transform = `translate(-50%, -50%)`;
    }

    });
document.getElementById('image-preview').addEventListener('click', function(event){
  event.preventDefault();
    if(crosshair){
      document.getElementById("name-preview").style.left = `${event.clientX}px`;
      document.getElementById("name-preview").style.top = `${event.clientY}px`;
      document.getElementById("name-preview").style.transform = `translate(-50%, -50%)`;
      document.getElementById("name-preview").style.opacity = `1`;
      crosshair=false;
      document.body.style.overflow = "hidden";
      let imageHeight= document.getElementById("image-preview").offsetHeight;
      let imageWidth= document.getElementById("image-preview").offsetWidth;
      let X=window.innerWidth/10+imageWidth/2-window.scrollX-event.clientX;
      let Y=window.innerHeight/5+imageHeight/2-window.scrollY-event.clientY;
      let cert=document.getElementById("certificate-type").value;
      document.getElementById("result").style.visibility = 'visible';
      document.getElementById("result").innerHTML = `Result <br> X: ${(X).toFixed(2)} <br> Y: ${(Y).toFixed(2)} <br><button id="Reload" onclick="window.location.reload()">Add more</button>  `;
      document.getElementById("image-preview").style.opacity = '.7';
      
      fetch('/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ certificate:cert,Y:Y})
      }).then(response => {
        if (response.ok) {
          console.log('Data sent successfully');
        } else {
          console.error('Error sending data');
        }
      }).catch(error => { 
      console.error('Error:', error);
      });
  }
});


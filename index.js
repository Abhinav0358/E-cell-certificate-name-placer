let submit=false;
let crosshair=false;
let name="Abhinav"
document.getElementById('name-preview').innerHTML=name;
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
    if(crosshair){

    }
});
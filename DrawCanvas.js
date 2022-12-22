function main(){
    var canvas = document.getElementById('Webgl');
    if (!canvas)
    {
        console.debug('Fail');
        return;
    }

    var ct = canvas.getContext ('2d');
    
    // var ct = getWebGlConetext(canvas);   error: DrawCanvas.js:10 
    //    Uncaught ReferenceError: getWebGlConetext is not defined
    //    at main (DrawCanvas.js:10:14)
    //    at onload (bookExample.html:8:23) 

    ct.fillStyle = 'rgba(255,0,255,1.0)';
    ct.fillRect(120,10,150,150);
}
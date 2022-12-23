var VSHADER_SOURCE =`
void main () 
{
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 10.0;
}`;

var FSHADER_SOURCE =`
void main ()
{
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}`

function main () {
    var canvas = document.getElementById ('Webgl');
    var gl = getWebGLContext (canvas);
        if (!gl)
        {
            console.log('fail to render');
        }

    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE))
    {
        console.log('fail to initialize');
    }

    gl.clearColor(0.75, 0.0, 0.25, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.drawArrays(gl.Points , 0 , 1);
}

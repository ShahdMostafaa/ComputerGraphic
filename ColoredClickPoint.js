var VSHADER_SOURCE = `
attribute vec4 a_position;
void main()
{
    gl_Position = a_position;
    gl_PointSize = 10.0;
}`;

var FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_fragcolor;
void main()
{
    gl_FragColor = u_fragcolor;
}`;

function main()
{
    var canvas = document.getElementById('Webgl');
    if (!canvas)
    {
        console.debug('Fail');
        return;
    }
    var gl = getWebGLContext(canvas);
    if(!gl)
    {
        console.log('Fail to render');
        return;
    } 

    if(!initShaders(gl , VSHADER_SOURCE , FSHADER_SOURCE))
    {
        console.log('fail to initialize');
        return;
    }

    var position = gl.getAttribLocation(gl.program , 'a_position');
    if(position < 0) { 
        console.log('Position NotFound');
        return;
    }
    
    var color = gl.getUniformLocation(gl.program , 'u_fragcolor');
    if(color < 0) { 
        console.log('color NotFound');
        return;
    }
    canvas.onmousedown = function (ev){click(ev , gl , canvas , position , color);};

    gl.clearColor (0.75 , 0.25 , 0.75 , 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

var gpoints = [];
var gcolors = [];

function click( ev , gl , canvas , position , color )
{
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();

    x = ((x-rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y-rect.top))/(canvas.height/2);
    gpoints.push([x,y]);

    if(x >= 0.0 && y >= 0.0)
    {
        gcolors.push([1.0,1.0,0.0,1.0]);
    }
    else if(x < 0.0 && y < 0.0)
    {
        gcolors.push([0.0,1.0,1.0,1.0]);
    }
    else
    {
        gcolors.push([1.0,1.0,1.0,1.0]);
    }

    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = gpoints.length;
    for(var i = 0 ; i < len ; i++)
    {
        var xy = gpoints[i];
        var rgba = gcolors[i];

        gl.vertexAttrib3f(position , xy[0] , xy[1] , 0.0);
        gl.uniform4f(color , rgba[0] , rgba[1] , rgba[2] , rgba[3]);

        gl.drawArrays(gl.Points , 0 , 1);
    }
}
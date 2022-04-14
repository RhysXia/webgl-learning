import { createProgram, createShader } from '../utils/webgl';

export default (gl: WebGLRenderingContext) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const VERTEX_SHADER = `
  attribute vec4 a_Position;
  attribute vec2 a_TexCoord;
  varying vec2 v_TexCoord;
  void main() {
    gl_Position = a_Position;
    v_TexCoord = a_TexCoord;
  }
  `;

  const FRAGMENT_SHADER = `
  precision mediump float;
  uniform sampler2D u_Sampler;
  varying vec2 v_TexCoord;
  void main() {
    gl_FragColor = texture2D(u_Sampler, v_TexCoord);
  }
  `;

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);

  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

  const program = createProgram(gl, vertexShader, fragmentShader);

  gl.useProgram(program);

  const vertexTexCoords = new Float32Array([
    -0.5, 0.5, 0.0, 1.0, 
    -0.5, -0.5, 0.0, 0.0,
     0.5, 0.5, 1.0, 1.0,
     0.5, -0.5, 1.0, 0.0
  ]);

  const FSIZE = vertexTexCoords.BYTES_PER_ELEMENT;

  const vertexTexCoordBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, vertexTexCoords, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(program, 'a_Position');

  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, FSIZE * 4, 0);

  gl.enableVertexAttribArray(aPosition);

  const aTexCoord = gl.getAttribLocation(program, 'a_TexCoord');

  gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
  gl.enableVertexAttribArray(aTexCoord);

  const texture = gl.createTexture();

  const uSampler = gl.getUniformLocation(program, 'u_Sampler');

  const image = new Image();

  image.onload = () => {
    loadTexture(gl, 4, texture!, uSampler!, image);
  };

  image.src = '/texture1.jpeg';
};

const loadTexture = (
  gl: WebGLRenderingContext,
  n: number,
  texture: WebGLTexture,
  uSampler: WebGLUniformLocation,
  image: HTMLImageElement
) => {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.uniform1i(uSampler, 0);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
};

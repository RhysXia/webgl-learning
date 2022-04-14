import { createProgram, createShader } from '../utils/webgl';

export default (gl: WebGLRenderingContext) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const VERTEX_SHADER = `
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  varying vec4 v_Color;
  void main() {
    gl_Position = a_Position;
    v_Color = a_Color;
  }
  `;

  const FRAGMENT_SHADER = `
  precision mediump float;
  varying vec4 v_Color;
  void main() {
    gl_FragColor = v_Color;
  }
  `;

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);

  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

  const program = createProgram(gl, vertexShader, fragmentShader);

  gl.useProgram(program);

  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const verticesColors = new Float32Array([
    0.0, 0.5, 1.0, 0.0, 0.0,
    -0.5, -0.5, 0.0, 1.0, 0.0,
    0.5, -0.5, 0.0, 0.0, 1.0
  ]);

  const FSIZE = verticesColors.BYTES_PER_ELEMENT

  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(program, 'a_Position');

  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, FSIZE * 5, 0);

  gl.enableVertexAttribArray(aPosition);

  const aColor = gl.getAttribLocation(program, 'a_Color');

  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2)
  gl.enableVertexAttribArray(aColor)

  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

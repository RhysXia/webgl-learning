import { useRef, useEffect } from 'react';
import createDemo from './webgl/demo7_texture';

function App() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;

    if (!canvas) {
      return;
    }

    const gl = canvas.getContext('webgl');

    if (!gl) {
      return;
    }

    createDemo(gl);
  }, []);

  return <canvas ref={ref}></canvas>;
}

export default App;

import React, { useEffect, useRef } from 'react';

export const ColorBends = ({
  color = '#A855F7',
  speed = 0.2,
  frequency = 1.0,
  noise = 0.15,
  bandWidth = 0.14,
  rotation = 90,
  fadeTop = 0.75,
  iterations = 1,
  intensity = 1.3,
  className = '',
  style = {}
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    // Helper to compile shaders
    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform float uSpeed;
      uniform float uFreq;
      uniform float uNoise;
      uniform float uBandWidth;
      uniform float uRotation;
      uniform float uFade;
      uniform float uIter;
      uniform float uIntensity;
      uniform vec3 uColor;
      uniform vec2 uResolution;

      // 2D Random
      float random (in vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      // 2D Noise based on Morgan McGuire @morgan3d
      float noise2(in vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);

          // Four corners in 2D of a tile
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));

          // Smooth Interpolation
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        st.x *= uResolution.x / uResolution.y;

        // Apply rotation
        float rad = uRotation * 3.14159265359 / 180.0;
        mat2 rot = mat2(cos(rad), -sin(rad), sin(rad), cos(rad));
        vec2 rotatedSt = rot * (st - 0.5) + 0.5;

        float t = uTime * uSpeed;
        
        // Fluid distortion
        float n = noise2(rotatedSt * uFreq * 3.0 + t) * uNoise;
        for(int i = 1; i < 5; i++) {
            if(float(i) >= uIter) break;
            n += noise2(rotatedSt * uFreq * float(i+1) - t) * (uNoise / float(i+1));
        }

        // Bending bands
        float wave = sin((rotatedSt.y + n) * (10.0 / uBandWidth)) * 0.5 + 0.5;
        wave = pow(wave, 1.0 / uIntensity);

        // Fade out at the top
        float fade = smoothstep(1.0, 1.0 - uFade, vUv.y);

        gl_FragColor = vec4(uColor * wave * fade, fade * wave);
      }
    `;

    const vertexShader = compileShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fsSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Quad buffer
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const getLoc = (name) => gl.getUniformLocation(program, name);
    
    // Parse hex color to vec3
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
      ] : [0.66, 0.33, 0.97]; // Default purple
    };

    let animationFrameId;
    let startTime = performance.now();

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      const currentTime = performance.now();
      const uTime = (currentTime - startTime) * 0.001;

      gl.useProgram(program);
      gl.uniform1f(getLoc('uTime'), uTime);
      gl.uniform1f(getLoc('uSpeed'), speed);
      gl.uniform1f(getLoc('uFreq'), frequency);
      gl.uniform1f(getLoc('uNoise'), noise);
      gl.uniform1f(getLoc('uBandWidth'), bandWidth);
      gl.uniform1f(getLoc('uRotation'), rotation);
      gl.uniform1f(getLoc('uFade'), fadeTop);
      gl.uniform1f(getLoc('uIter'), iterations);
      gl.uniform1f(getLoc('uIntensity'), intensity);
      gl.uniform3fv(getLoc('uColor'), hexToRgb(color));
      gl.uniform2f(getLoc('uResolution'), width, height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, [color, speed, frequency, noise, bandWidth, rotation, fadeTop, iterations, intensity]);

  return (
    <div className={`absolute inset-0 z-[-1] pointer-events-none ${className}`} style={style}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100%', height: '100%', opacity: 0.8 }}
      />
    </div>
  );
};

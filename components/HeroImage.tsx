'use client';
import { useEffect, useRef, type RefObject } from 'react';
import Photo from './Photo';
import type { Photo as HeroPhoto } from '@/lib/content/types';

const VERTEX = `
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

// Cuts the photo into horizontal bands. Scrolling and moving the pointer push the
// bands sideways and split their colour channels; at rest the photo is whole.
const FRAGMENT = `
precision highp float;
varying vec2 uv;
uniform sampler2D photo;
uniform vec2 canvasSize;
uniform vec2 photoSize;
uniform vec2 pointer;
uniform float broken;
uniform float energy;
uniform float time;

float random(float n) { return fract(sin(n) * 43758.5453); }

vec2 cover(vec2 p) {
  float canvasRatio = canvasSize.x / canvasSize.y;
  float photoRatio = photoSize.x / photoSize.y;
  vec2 scale = canvasRatio > photoRatio ? vec2(1.0, photoRatio / canvasRatio) : vec2(canvasRatio / photoRatio, 1.0);
  return (p - 0.5) * scale + 0.5;
}

void main() {
  float bands = 18.0;
  float band = floor(uv.y * bands);
  float center = (band + 0.5) / bands;

  float near = smoothstep(0.3, 0.0, abs(center - pointer.y));
  float tick = floor(time * 0.7);
  float idle = step(0.93, random(band + tick)) * 0.05;
  float amount = broken * (0.1 + random(band) * 0.45) + near * energy * 0.14 + idle;

  float direction = random(band + 3.0) > 0.5 ? 1.0 : -1.0;
  vec2 p = vec2(uv.x + direction * amount, uv.y);
  float split = 0.004 + amount * 0.08;

  vec3 color = vec3(
    texture2D(photo, cover(p + vec2(split, 0.0)) * vec2(1.0, -1.0) + vec2(0.0, 1.0)).r,
    texture2D(photo, cover(p) * vec2(1.0, -1.0) + vec2(0.0, 1.0)).g,
    texture2D(photo, cover(p - vec2(split, 0.0)) * vec2(1.0, -1.0) + vec2(0.0, 1.0)).b
  );

  float light = dot(color, vec3(0.3, 0.59, 0.11));
  vec3 crash = vec3(0.075, 0.133, 1.0);
  vec3 tone = mix(vec3(0.0), crash, smoothstep(0.02, 0.5, light));
  tone = mix(tone, vec3(1.0), smoothstep(0.5, 0.95, light));
  gl_FragColor = vec4(tone, 1.0);
}`;

function textureUrl(src: string) {
  if (src.startsWith('http')) return `${src}${src.includes('?') ? '&' : '?'}w=1920&q=75&auto=format`;
  return `/_next/image?url=${encodeURIComponent(src)}&w=1920&q=75`;
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

export default function HeroImage({
  photo,
  broken,
}: {
  photo: HeroPhoto;
  broken: RefObject<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const pointer = { y: 0.5, energy: 0 };
    let frame = 0;
    let visible = true;
    let ready = false;

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = canvas.clientWidth * scale;
      canvas.height = canvas.clientHeight * scale;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniform('canvasSize'), canvas.width, canvas.height);
    };

    const draw = (now: number) => {
      frame = 0;
      if (!ready || !visible) return;
      pointer.energy *= 0.94;
      gl.uniform2f(uniform('pointer'), 0, pointer.y);
      gl.uniform1f(uniform('broken'), broken.current);
      gl.uniform1f(uniform('energy'), pointer.energy);
      gl.uniform1f(uniform('time'), now / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.y = 1 - event.clientY / window.innerHeight;
      pointer.energy = Math.min(1, pointer.energy + Math.abs(event.movementX + event.movementY) / 90);
    };

    const image = new window.Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.uniform2f(uniform('photoSize'), image.naturalWidth, image.naturalHeight);
      ready = true;
      canvas.style.opacity = '1';
      start();
    };
    image.src = textureUrl(photo.src);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    observer.observe(canvas);

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      image.onload = null;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [broken, photo.src]);

  return (
    <div className="absolute inset-0 bg-crash">
      {/* Shown until WebGL is ready, and instead of it when WebGL or motion is off. */}
      <Photo
        src={photo.src}
        alt={photo.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70 mix-blend-luminosity"
        style={{ objectPosition: photo.position }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700"
      />
    </div>
  );
}

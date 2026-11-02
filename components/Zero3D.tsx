'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// The club's slashed zero, on the same 100 x 180 grid as the logo.
const OUTLINE = [[26, 0], [74, 0], [100, 26], [100, 154], [74, 180], [26, 180], [0, 154], [0, 26]];
const HOLES = [
  [[34, 36], [62, 36], [34, 96]],
  [[66, 144], [38, 144], [66, 84]],
];

// Fine speckle over larger soft pits, for a rough cast-metal surface.
function castSurface(size: number) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const context = canvas.getContext('2d')!;
  context.fillStyle = '#808080';
  context.fillRect(0, 0, size, size);

  for (let i = 0; i < 1400; i++) {
    const shade = Math.random() > 0.5 ? '30,30,30' : '220,220,220';
    context.fillStyle = `rgba(${shade},${0.02 + Math.random() * 0.1})`;
    context.beginPath();
    context.arc(Math.random() * size, Math.random() * size, 2 + Math.random() * 16, 0, Math.PI * 2);
    context.fill();
  }

  const image = context.getImageData(0, 0, size, size);
  for (let i = 0; i < image.data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 20;
    image.data[i] += noise;
    image.data[i + 1] += noise;
    image.data[i + 2] += noise;
  }
  context.putImageData(image, 0, 0);
  return canvas;
}

export default function Zero3D({
  poster,
  turn = 0.55,
  alt,
}: {
  poster: 'a' | 'c';
  turn?: number;
  alt: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let stop = () => {};
    let cancelled = false;

    import('three').then((THREE) => {
      if (cancelled) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      } catch {
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.z = 11;

      // Soft studio reflections, so the metal shows its form without any coloured light.
      const studio = new THREE.Scene();
      const softbox = (w: number, h: number, x: number, y: number, z: number, level: number) => {
        const box = new THREE.Mesh(
          new THREE.PlaneGeometry(w, h),
          new THREE.MeshBasicMaterial({ color: new THREE.Color(level, level, level), side: THREE.DoubleSide }),
        );
        box.position.set(x, y, z);
        box.lookAt(0, 0, 0);
        studio.add(box);
      };
      softbox(9, 3, 0, 7, 3, 3.2);
      softbox(2, 9, -7, 0, 3, 1.4);
      softbox(2, 7, 7, -1, -2, 1.8);
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(studio, 0.03).texture;
      scene.environmentIntensity = 2.6;

      const surface = new THREE.CanvasTexture(castSurface(512));
      surface.wrapS = surface.wrapT = THREE.RepeatWrapping;
      surface.repeat.set(0.007, 0.007);

      const toPoint = ([x, y]: number[]) => new THREE.Vector2(x - 50, 90 - y);
      const shape = new THREE.Shape(OUTLINE.map(toPoint));
      shape.holes = HOLES.map((hole) => new THREE.Path(hole.map(toPoint)));

      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 30,
        bevelEnabled: true,
        bevelThickness: 3.5,
        bevelSize: 3,
        bevelSegments: 5,
      });
      geometry.center();

      const material = new THREE.MeshStandardMaterial({
        color: 0x8a8a8a,
        metalness: 0.75,
        roughness: 0.62,
        roughnessMap: surface,
        bumpMap: surface,
        bumpScale: 1,
      });
      const zero = new THREE.Mesh(geometry, material);
      zero.scale.setScalar(0.027);
      scene.add(zero);

      const key = new THREE.DirectionalLight(0xffffff, 1.7);
      key.position.set(-3, 5, 6);
      const rim = new THREE.DirectionalLight(0xffffff, 2.8);
      rim.position.set(5, -1, -4);
      scene.add(key, rim);

      const aim = { x: 0, y: 0 };
      const tilt = { x: 0, y: 0 };
      let spin = 0;
      let last = performance.now();
      let frame = 0;
      let visible = true;

      const resize = () => {
        const size = canvas.clientWidth;
        renderer.setSize(size, size, false);
      };

      const draw = (now: number) => {
        frame = 0;
        if (!visible) return;
        const delta = Math.min((now - last) / 1000, 0.05);
        last = now;
        spin += delta * 0.22;
        tilt.x += (aim.x - tilt.x) * (1 - Math.pow(0.02, delta));
        tilt.y += (aim.y - tilt.y) * (1 - Math.pow(0.02, delta));

        zero.rotation.set(-0.08 + tilt.y * 0.22, turn + spin + window.scrollY * 0.0012 + tilt.x * 0.35, 0.1);
        renderer.render(scene, camera);
        frame = requestAnimationFrame(draw);
      };

      const start = () => {
        if (frame) return;
        last = performance.now();
        frame = requestAnimationFrame(draw);
      };

      const onPointerMove = (event: PointerEvent) => {
        aim.x = (event.clientX / window.innerWidth - 0.5) * 2;
        aim.y = (event.clientY / window.innerHeight - 0.5) * 2;
      };

      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      });

      resize();
      observer.observe(canvas);
      window.addEventListener('resize', resize);
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      setReady(true);

      stop = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        window.removeEventListener('resize', resize);
        window.removeEventListener('pointermove', onPointerMove);
        geometry.dispose();
        material.dispose();
        surface.dispose();
        pmrem.dispose();
        renderer.dispose();
      };
    });

    return () => {
      cancelled = true;
      stop();
    };
  }, [turn]);

  return (
    <div className="relative aspect-square w-full">
      {/* A still render, shown until the 3D is ready and instead of it when motion is off. */}
      <Image
        src={`/zero-${poster}.webp`}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 45vw"
        className={`object-contain transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 size-full transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}

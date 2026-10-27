import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The canvas renders only while scroll progress changes, rather than running a
// permanent animation loop. This keeps the mobile version considerably lighter.
export default function ScrollDumbbell3D({ sectionRef }) {
  const mount = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const el = mount.current;
    const section = sectionRef.current;
    if (!el || !section) return;
    const mobile = window.matchMedia('(max-width: 700px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const constrained = mobile && ((navigator.deviceMemory && navigator.deviceMemory <= 2) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4));
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !constrained, powerPreference: 'low-power' });
    } catch (_) {
      setFallback(true);
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? (constrained ? 1 : 1.25) : 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, .1, 100);
    camera.position.set(0, 0, 7.5);
    scene.add(new THREE.AmbientLight(0xf5ffe0, 1.8));
    const light = new THREE.DirectionalLight(0xffffff, 3.2);
    light.position.set(-3, 4, 6);
    scene.add(light);
    const rim = new THREE.DirectionalLight(0xb5eb34, 1.7);
    rim.position.set(3, -2, -4);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);
    const dark = new THREE.MeshStandardMaterial({ color: 0x242a1b, roughness: .34, metalness: .48 });
    const lime = new THREE.MeshStandardMaterial({ color: 0xc7ed35, roughness: .4, metalness: .2 });
    const metal = new THREE.MeshStandardMaterial({ color: 0xc5cfbf, roughness: .28, metalness: .72 });
    const detail = new THREE.MeshStandardMaterial({ color: 0x5a7430, roughness: .44, metalness: .35 });
    const cylinder = (radius, length, material, x = 0) => {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, constrained ? 32 : 48), material);
      mesh.rotation.z = Math.PI / 2;
      mesh.position.x = x;
      group.add(mesh);
    };
    cylinder(.11, 3, metal);
    for (let i = -5; i <= 5; i++) cylinder(.14, .018, detail, i * .055);
    [-1, 1].forEach(side => {
      cylinder(.61, .20, dark, side * .98);
      cylinder(.69, .24, dark, side * 1.20);
      cylinder(.61, .055, lime, side * 1.345);
      cylinder(.34, .10, detail, side * 1.39);
      cylinder(.21, .13, metal, side * 1.48);
      [.91, 1.31].forEach(x => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(.56, .022, 10, constrained ? 40 : 64), lime);
        ring.rotation.y = Math.PI / 2;
        ring.position.x = side * x;
        group.add(ring);
      });
    });

    const state = { progress: 0 };
    const render = () => {
      const p = state.progress;
      group.rotation.x = .15 + p * 1.15;
      group.rotation.y = -.58 + p * Math.PI * 1.3;
      group.rotation.z = -.25 + p * .56;
      const size = (mobile ? 1.25 : 1.16) * (1 + .22 * Math.sin(Math.PI * p));
      group.scale.setScalar(size);
      group.position.y = .3 * Math.sin(Math.PI * p);
      renderer.render(scene, camera);
      el.dataset.progress = p.toFixed(3);
    };
    const resize = () => {
      if (!el.clientWidth || !el.clientHeight) return;
      renderer.setSize(el.clientWidth, el.clientHeight, false);
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      render();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(el);
    resize();
    let tween;
    if (!reduced) {
      tween = gsap.to(state, {
        progress: 1, ease: 'none', onUpdate: render,
        scrollTrigger: { trigger: section, start: 'top 72px', end: 'bottom bottom', scrub: .45, invalidateOnRefresh: true },
      });
      ScrollTrigger.refresh();
    }
    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      resizeObserver.disconnect();
      scene.traverse(object => { if (object.geometry) object.geometry.dispose(); });
      [dark, lime, metal, detail].forEach(material => material.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, [sectionRef]);

  return <div className="story-canvas" ref={mount} aria-hidden="true">{fallback && <svg viewBox="0 0 400 180" fill="none"><g transform="rotate(-17 200 90)" stroke="#c9ec39" strokeWidth="8"><path d="M75 90h250"/><rect x="58" y="50" width="24" height="80" rx="10" fill="#29311c"/><rect x="83" y="36" width="28" height="108" rx="10" fill="#29311c"/><rect x="289" y="36" width="28" height="108" rx="10" fill="#29311c"/><rect x="318" y="50" width="24" height="80" rx="10" fill="#29311c"/></g></svg>}</div>;
}

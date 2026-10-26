/* Mendel laws — Three.js chromosome / meiosis scenes */
(function (global) {
  const THREE = global.THREE;
  if (!THREE) {
    console.error('THREE missing');
    return;
  }

  // ---------- helpers ----------
  function makeLabelSprite(text, color, scale) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 128, 128);
    ctx.beginPath();
    ctx.arc(64, 64, 52, 0, Math.PI * 2);
    ctx.fillStyle = color || '#2563eb';
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px "Noto Sans SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 64, 70);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: true });
    const spr = new THREE.Sprite(mat);
    const s = scale || 0.55;
    spr.scale.set(s, s, 1);
    return spr;
  }

  function makeChromatid(color, length, radius) {
    const L = length || 1.6;
    const R = radius || 0.12;
    const geo = new THREE.CapsuleGeometry
      ? new THREE.CapsuleGeometry(R, L - 2 * R, 4, 10)
      : new THREE.CylinderGeometry(R, R, L, 12);
    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.35,
      metalness: 0.12,
      emissive: color,
      emissiveIntensity: 0.08,
    });
    return new THREE.Mesh(geo, mat);
  }

  /**
   * X-shaped chromosome (two sister chromatids) with allele label.
   * alleleText e.g. "D", color hex number.
   */
  function makeChromosome(opts) {
    const g = new THREE.Group();
    const color = opts.color || 0x2563eb;
    const allele = opts.allele || '';
    const len = opts.length || 1.7;
    const sep = opts.chromatidSep || 0.16;

    const left = makeChromatid(color, len);
    left.position.x = -sep;
    const right = makeChromatid(color, len);
    right.position.x = sep;

    // centromere
    const centro = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 16, 12),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x94a3b8,
        emissiveIntensity: 0.25,
        roughness: 0.4,
      })
    );

    g.add(left, right, centro);

    if (allele) {
      const spr = makeLabelSprite(allele, opts.labelBg || '#1d4ed8', opts.labelScale || 0.5);
      spr.position.set(0, len * 0.42, 0.2);
      g.add(spr);
      g.userData.label = spr;
    }

    g.userData.allele = allele;
    g.userData.color = color;
    g.userData.sisters = [left, right];
    g.userData.centromere = centro;
    return g;
  }

  function makeCellMembrane(radius) {
    const geo = new THREE.SphereGeometry(radius || 3.2, 48, 32);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xb8d9f5,
      transparent: true,
      opacity: 0.18,
      roughness: 0.6,
      metalness: 0.05,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    // outer rim ring for visibility
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius || 3.2, 0.035, 8, 64),
      new THREE.MeshBasicMaterial({ color: 0x7eb6e0, transparent: true, opacity: 0.55 })
    );
    ring.rotation.x = Math.PI / 2;
    const wrap = new THREE.Group();
    wrap.add(mesh, ring);
    wrap.userData.membrane = mesh;
    wrap.userData.ring = ring;
    return wrap;
  }

  function makeSpindleLine(from, to, color) {
    const pts = [from.clone(), to.clone()];
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color: color || 0x94a3b8,
      transparent: true,
      opacity: 0.55,
    });
    return new THREE.Line(geo, mat);
  }

  function makePole(color) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 12, 10),
      new THREE.MeshStandardMaterial({
        color: color || 0x64748b,
        emissive: color || 0x64748b,
        emissiveIntensity: 0.3,
      })
    );
  }

  function lerpVec3(a, b, t) {
    return new THREE.Vector3().lerpVectors(a, b, t);
  }

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  // ---------- Scene base ----------
  function createRenderer(host) {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    return renderer;
  }

  function createCamera(aspect) {
    const cam = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
    cam.position.set(0, 1.2, 9.5);
    cam.lookAt(0, 0, 0);
    return cam;
  }

  function addLights(scene) {
    scene.add(new THREE.AmbientLight(0xffffff, 0.72));
    const key = new THREE.DirectionalLight(0xffffff, 0.85);
    key.position.set(4, 6, 8);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xbdd8f5, 0.45);
    fill.position.set(-5, -2, 3);
    scene.add(fill);
  }

  function bindOrbit(dom, camera, target) {
    const state = { dragging: false, lx: 0, ly: 0, theta: 0.15, phi: 0.35, dist: 9.5 };
    const t = target || new THREE.Vector3(0, 0, 0);

    function apply() {
      const x = state.dist * Math.sin(state.phi) * Math.sin(state.theta);
      const y = state.dist * Math.cos(state.phi) + 0.4;
      const z = state.dist * Math.sin(state.phi) * Math.cos(state.theta);
      camera.position.set(x + t.x, y + t.y, z + t.z);
      camera.lookAt(t);
    }
    apply();

    dom.addEventListener('pointerdown', (e) => {
      state.dragging = true;
      state.lx = e.clientX;
      state.ly = e.clientY;
      dom.setPointerCapture(e.pointerId);
    });
    dom.addEventListener('pointerup', () => { state.dragging = false; });
    dom.addEventListener('pointermove', (e) => {
      if (!state.dragging) return;
      const dx = e.clientX - state.lx;
      const dy = e.clientY - state.ly;
      state.lx = e.clientX;
      state.ly = e.clientY;
      state.theta -= dx * 0.008;
      state.phi = Math.max(0.2, Math.min(1.4, state.phi + dy * 0.008));
      apply();
    });
    dom.addEventListener('wheel', (e) => {
      e.preventDefault();
      state.dist = Math.max(5, Math.min(16, state.dist + e.deltaY * 0.01));
      apply();
    }, { passive: false });

    return { apply, state };
  }

  // =========================================================
  // Module A — Segregation (Dd)
  // =========================================================
  function SegregationScene(host) {
    const scene = new THREE.Scene();
    addLights(scene);
    const renderer = createRenderer(host);
    let w = host.clientWidth || 800;
    let h = host.clientHeight || 500;
    const camera = createCamera(w / h);
    renderer.setSize(w, h, false);

    const root = new THREE.Group();
    scene.add(root);

    const cell = makeCellMembrane(3.4);
    root.add(cell);

    // Homolog with D (dark blue) and homolog with d (light blue)
    const chromD = makeChromosome({ color: 0x1d4ed8, allele: 'D', labelBg: '#1d4ed8' });
    const chromD2 = makeChromosome({ color: 0x3b82f6, allele: 'd', labelBg: '#2563eb' });
    // duplicate pair for "sister visible" — already X shape

    root.add(chromD, chromD2);

    const poleL = makePole(0x64748b);
    const poleR = makePole(0x64748b);
    poleL.position.set(-3.6, 0, 0);
    poleR.position.set(3.6, 0, 0);
    poleL.visible = false;
    poleR.visible = false;
    root.add(poleL, poleR);

    const spindleGroup = new THREE.Group();
    root.add(spindleGroup);

    // Four gamete cells for final step
    const gameteGroup = new THREE.Group();
    gameteGroup.visible = false;
    root.add(gameteGroup);

    const orbit = bindOrbit(renderer.domElement, camera, new THREE.Vector3(0, 0, 0));

    let step = 0;
    let animT = 1; // 0..1 progress into current step pose
    let fromPose = null;
    let toPose = null;

    const STEPS = [
      {
        // 0 初级性母细胞
        pose: () => ({
          D: { x: -0.7, y: 0.3, z: 0, rx: 0.15, ry: 0.2, rz: 0.1 },
          d: { x: 0.7, y: -0.2, z: 0.1, rx: -0.1, ry: -0.15, rz: -0.05 },
          cellScale: 1,
          poles: false,
          spindle: false,
          gametes: false,
          splitSisters: false,
        }),
      },
      {
        // 1 减Ⅰ中期 — 赤道板排列
        pose: () => ({
          D: { x: -0.45, y: 0, z: 0, rx: 0, ry: 0, rz: 0 },
          d: { x: 0.45, y: 0, z: 0, rx: 0, ry: 0, rz: 0 },
          cellScale: 1,
          poles: true,
          spindle: true,
          gametes: false,
          splitSisters: false,
        }),
      },
      {
        // 2 减Ⅰ后期 — 同源分离
        pose: () => ({
          D: { x: -2.0, y: 0.1, z: 0, rx: 0.1, ry: 0.3, rz: 0.2 },
          d: { x: 2.0, y: -0.1, z: 0, rx: -0.1, ry: -0.3, rz: -0.2 },
          cellScale: 1.05,
          poles: true,
          spindle: true,
          gametes: false,
          splitSisters: false,
        }),
      },
      {
        // 3 次级性母细胞（两个细胞）
        pose: () => ({
          D: { x: -2.2, y: 0, z: 0, rx: 0, ry: 0.2, rz: 0 },
          d: { x: 2.2, y: 0, z: 0, rx: 0, ry: -0.2, rz: 0 },
          cellScale: 0.001, // hide big cell, show two small
          poles: false,
          spindle: false,
          gametes: false,
          splitSisters: false,
          dualCells: true,
        }),
      },
      {
        // 4 减Ⅱ姐妹分开
        pose: () => ({
          D: { x: -2.2, y: 0, z: 0, rx: 0, ry: 0, rz: 0 },
          d: { x: 2.2, y: 0, z: 0, rx: 0, ry: 0, rz: 0 },
          cellScale: 0.001,
          poles: false,
          spindle: false,
          gametes: false,
          splitSisters: true,
          dualCells: true,
        }),
      },
      {
        // 5 四个配子
        pose: () => ({
          D: { x: -99, y: 0, z: 0, rx: 0, ry: 0, rz: 0 },
          d: { x: -99, y: 0, z: 0, rx: 0, ry: 0, rz: 0 },
          cellScale: 0.001,
          poles: false,
          spindle: false,
          gametes: true,
          splitSisters: false,
          dualCells: false,
        }),
      },
    ];

    // dual cell membranes for secondary
    const cellL = makeCellMembrane(1.55);
    const cellR = makeCellMembrane(1.55);
    cellL.position.x = -2.2;
    cellR.position.x = 2.2;
    cellL.visible = false;
    cellR.visible = false;
    root.add(cellL, cellR);

    // sister split helpers — temporary single chromatids
    const sisterParts = new THREE.Group();
    sisterParts.visible = false;
    root.add(sisterParts);

    function buildGametes() {
      while (gameteGroup.children.length) gameteGroup.remove(gameteGroup.children[0]);
      const labels = ['D', 'D', 'd', 'd'];
      const colors = [0x1d4ed8, 0x1d4ed8, 0x3b82f6, 0x3b82f6];
      const positions = [
        [-2.4, 1.2, 0],
        [-2.4, -1.2, 0],
        [2.4, 1.2, 0],
        [2.4, -1.2, 0],
      ];
      labels.forEach((lab, i) => {
        const g = new THREE.Group();
        const mem = makeCellMembrane(1.1);
        g.add(mem);
        const ch = makeChromosome({
          color: colors[i],
          allele: lab,
          labelBg: lab === 'D' ? '#1d4ed8' : '#2563eb',
          length: 1.2,
          chromatidSep: 0.02,
        });
        // single chromatid look: hide one sister
        ch.userData.sisters[1].visible = false;
        ch.userData.sisters[0].position.x = 0;
        g.add(ch);
        g.position.set(positions[i][0], positions[i][1], positions[i][2]);
        gameteGroup.add(g);
      });
    }
    buildGametes();

    function buildSisterSplit() {
      while (sisterParts.children.length) sisterParts.remove(sisterParts.children[0]);
      // Left cell: D splits into two chromatids going up/down
      const d1 = makeChromatid(0x1d4ed8, 1.4);
      const d2 = makeChromatid(0x1d4ed8, 1.4);
      d1.position.set(-2.2, 0.85, 0);
      d2.position.set(-2.2, -0.85, 0);
      const ld1 = makeLabelSprite('D', '#1d4ed8', 0.4);
      ld1.position.set(-2.2, 1.55, 0.2);
      const ld2 = makeLabelSprite('D', '#1d4ed8', 0.4);
      ld2.position.set(-2.2, -1.55, 0.2);
      // Right: d
      const r1 = makeChromatid(0x3b82f6, 1.4);
      const r2 = makeChromatid(0x3b82f6, 1.4);
      r1.position.set(2.2, 0.85, 0);
      r2.position.set(2.2, -0.85, 0);
      const lr1 = makeLabelSprite('d', '#2563eb', 0.4);
      lr1.position.set(2.2, 1.55, 0.2);
      const lr2 = makeLabelSprite('d', '#2563eb', 0.4);
      lr2.position.set(2.2, -1.55, 0.2);
      sisterParts.add(d1, d2, ld1, ld2, r1, r2, lr1, lr2);
    }
    buildSisterSplit();

    function rebuildSpindle(pose) {
      while (spindleGroup.children.length) spindleGroup.remove(spindleGroup.children[0]);
      if (!pose.spindle) return;
      const left = new THREE.Vector3(pose.D.x, pose.D.y, pose.D.z);
      const right = new THREE.Vector3(pose.d.x, pose.d.y, pose.d.z);
      spindleGroup.add(makeSpindleLine(poleL.position, left, 0x94a3b8));
      spindleGroup.add(makeSpindleLine(poleR.position, right, 0x94a3b8));
      spindleGroup.add(makeSpindleLine(poleL.position, right.clone().lerp(left, 0.3), 0xcbd5e1));
      spindleGroup.add(makeSpindleLine(poleR.position, left.clone().lerp(right, 0.3), 0xcbd5e1));
    }

    function capturePose() {
      return {
        D: {
          x: chromD.position.x, y: chromD.position.y, z: chromD.position.z,
          rx: chromD.rotation.x, ry: chromD.rotation.y, rz: chromD.rotation.z,
        },
        d: {
          x: chromD2.position.x, y: chromD2.position.y, z: chromD2.position.z,
          rx: chromD2.rotation.x, ry: chromD2.rotation.y, rz: chromD2.rotation.z,
        },
      };
    }

    function applyPose(pose, t) {
      const e = easeInOut(Math.min(1, Math.max(0, t)));
      const fp = fromPose || pose;
      function mix(a, b, k) { return a + (b - a) * k; }

      chromD.position.set(
        mix(fp.D.x, pose.D.x, e),
        mix(fp.D.y, pose.D.y, e),
        mix(fp.D.z, pose.D.z, e)
      );
      chromD.rotation.set(
        mix(fp.D.rx, pose.D.rx, e),
        mix(fp.D.ry, pose.D.ry, e),
        mix(fp.D.rz, pose.D.rz, e)
      );
      chromD2.position.set(
        mix(fp.d.x, pose.d.x, e),
        mix(fp.d.y, pose.d.y, e),
        mix(fp.d.z, pose.d.z, e)
      );
      chromD2.rotation.set(
        mix(fp.d.rx, pose.d.rx, e),
        mix(fp.d.ry, pose.d.ry, e),
        mix(fp.d.rz, pose.d.rz, e)
      );

      const showMain = !pose.gametes && !pose.splitSisters;
      chromD.visible = showMain && pose.D.x > -50;
      chromD2.visible = showMain && pose.d.x > -50;

      cell.visible = pose.cellScale > 0.5;
      if (cell.visible) {
        const s = mix(1, pose.cellScale, e);
        cell.scale.setScalar(s);
      }

      poleL.visible = !!pose.poles;
      poleR.visible = !!pose.poles;
      spindleGroup.visible = !!pose.spindle;
      if (pose.spindle) rebuildSpindle(pose);

      cellL.visible = !!pose.dualCells;
      cellR.visible = !!pose.dualCells;

      sisterParts.visible = !!pose.splitSisters;
      if (pose.splitSisters) {
        chromD.visible = false;
        chromD2.visible = false;
      }

      gameteGroup.visible = !!pose.gametes;
    }

    function setStep(i, animate) {
      step = Math.max(0, Math.min(STEPS.length - 1, i));
      const pose = STEPS[step].pose();
      if (animate) {
        fromPose = capturePose();
        // if coming from hidden, snap fromPose alleles
        if (!chromD.visible && !pose.gametes) {
          fromPose = {
            D: { x: pose.D.x, y: pose.D.y, z: pose.D.z, rx: 0, ry: 0, rz: 0 },
            d: { x: pose.d.x, y: pose.d.y, z: pose.d.z, rx: 0, ry: 0, rz: 0 },
          };
        }
        toPose = pose;
        animT = 0;
      } else {
        fromPose = pose;
        toPose = pose;
        animT = 1;
        applyPose(pose, 1);
      }
      return step;
    }

    // init
    setStep(0, false);

    let raf = 0;
    let running = false;
    function tick() {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      if (animT < 1 && toPose) {
        animT = Math.min(1, animT + 0.035);
        applyPose(toPose, animT);
      }
      // gentle idle
      root.rotation.y = Math.sin(performance.now() * 0.00025) * 0.04;
      renderer.render(scene, camera);
    }

    function resize() {
      w = host.clientWidth || 1;
      h = host.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }

    return {
      stepCount: STEPS.length,
      getStep: () => step,
      setStep,
      start() {
        if (running) return;
        running = true;
        resize();
        tick();
      },
      stop() {
        running = false;
        cancelAnimationFrame(raf);
      },
      resize,
      dispose() {
        this.stop();
        renderer.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      },
    };
  }

  // =========================================================
  // Module B — Independent assortment (YyRr)
  // =========================================================
  function IndependentScene(host) {
    const scene = new THREE.Scene();
    addLights(scene);
    const renderer = createRenderer(host);
    let w = host.clientWidth || 800;
    let h = host.clientHeight || 500;
    const camera = createCamera(w / h);
    renderer.setSize(w, h, false);

    const root = new THREE.Group();
    scene.add(root);

    const cell = makeCellMembrane(3.6);
    root.add(cell);

    // Color pair Y/y (amber) — longer chromosomes
    const chromY = makeChromosome({ color: 0xd97706, allele: 'Y', labelBg: '#d97706', length: 1.9 });
    const chromY2 = makeChromosome({ color: 0xfbbf24, allele: 'y', labelBg: '#b45309', length: 1.9 });
    // Shape pair R/r (green) — shorter
    const chromR = makeChromosome({ color: 0x059669, allele: 'R', labelBg: '#059669', length: 1.35 });
    const chromR2 = makeChromosome({ color: 0x34d399, allele: 'r', labelBg: '#047857', length: 1.35 });

    root.add(chromY, chromY2, chromR, chromR2);

    const poleL = makePole(0x64748b);
    const poleR = makePole(0x64748b);
    poleL.position.set(-3.8, 0, 0);
    poleR.position.set(3.8, 0, 0);
    poleL.visible = false;
    poleR.visible = false;
    root.add(poleL, poleR);

    const spindleGroup = new THREE.Group();
    root.add(spindleGroup);

    const gameteGroup = new THREE.Group();
    gameteGroup.visible = false;
    root.add(gameteGroup);

    const orbit = bindOrbit(renderer.domElement, camera, new THREE.Vector3(0, 0, 0));

    let step = 0;
    let orientation = 1; // 1 or 2
    let animT = 1;
    let fromPos = null;

    /**
     * Steps:
     * 0 intro cell YyRr
     * 1 metaphase I orientation 1 (or 2 via toggle)
     * 2 anaphase I separation for that orientation
     * 3 secondary cells
     * 4 meiosis II sketch
     * 5 four gametes from this orientation (2 types ×2)
     * 6 combined: all 4 types 1:1:1:1
     */
    function metaphasePose(ori) {
      if (ori === 1) {
        // Y and R same side (left), y and r right → gametes YR and yr
        return {
          Y: { x: -0.55, y: 0.85, z: 0 },
          y: { x: 0.55, y: 0.85, z: 0 },
          R: { x: -0.55, y: -0.85, z: 0 },
          r: { x: 0.55, y: -0.85, z: 0 },
        };
      }
      // ori 2: Y with r, y with R → Yr and yR
      return {
        Y: { x: -0.55, y: 0.85, z: 0 },
        y: { x: 0.55, y: 0.85, z: 0 },
        R: { x: 0.55, y: -0.85, z: 0 },
        r: { x: -0.55, y: -0.85, z: 0 },
      };
    }

    function anaphasePose(ori) {
      const m = metaphasePose(ori);
      const scale = 2.4;
      return {
        Y: { x: Math.sign(m.Y.x) * scale, y: m.Y.y, z: 0 },
        y: { x: Math.sign(m.y.x) * scale, y: m.y.y, z: 0 },
        R: { x: Math.sign(m.R.x) * scale, y: m.R.y, z: 0 },
        r: { x: Math.sign(m.r.x) * scale, y: m.r.y, z: 0 },
      };
    }

    function introPose() {
      return {
        Y: { x: -1.0, y: 0.9, z: 0.1 },
        y: { x: -0.2, y: 0.7, z: -0.1 },
        R: { x: 0.5, y: -0.6, z: 0.1 },
        r: { x: 1.2, y: -0.8, z: 0 },
      };
    }

    function buildFourGametes(types) {
      while (gameteGroup.children.length) gameteGroup.remove(gameteGroup.children[0]);
      const pos = [
        [-2.5, 1.3, 0],
        [-2.5, -1.3, 0],
        [2.5, 1.3, 0],
        [2.5, -1.3, 0],
      ];
      types.forEach((t, i) => {
        const g = new THREE.Group();
        g.add(makeCellMembrane(1.15));
        // two single chromatids as small rods with labels
        const c1 = makeChromosome({
          color: t[0] === 'Y' || t[0] === 'y' ? (t[0] === 'Y' ? 0xd97706 : 0xfbbf24) : 0x059669,
          allele: t[0],
          labelBg: t[0] === 'Y' || t[0] === 'y' ? '#d97706' : '#059669',
          length: 1.0,
          chromatidSep: 0.02,
        });
        c1.userData.sisters[1].visible = false;
        c1.userData.sisters[0].position.x = 0;
        c1.position.set(-0.35, 0.15, 0);
        const c2 = makeChromosome({
          color: t[1] === 'R' || t[1] === 'r' ? (t[1] === 'R' ? 0x059669 : 0x34d399) : 0xd97706,
          allele: t[1],
          labelBg: t[1] === 'R' || t[1] === 'r' ? '#059669' : '#d97706',
          length: 0.85,
          chromatidSep: 0.02,
        });
        c2.userData.sisters[1].visible = false;
        c2.userData.sisters[0].position.x = 0;
        c2.position.set(0.35, -0.1, 0);
        g.add(c1, c2);
        // big type label
        const big = makeLabelSprite(t, '#1e40af', 0.55);
        big.position.set(0, -1.35, 0);
        g.add(big);
        g.position.set(pos[i][0], pos[i][1], pos[i][2]);
        gameteGroup.add(g);
      });
    }

    function currentTargetPose() {
      if (step === 0) return { kind: 'chrom', pos: introPose(), poles: false, spindle: false, gametes: false, cell: true };
      if (step === 1) return { kind: 'chrom', pos: metaphasePose(orientation), poles: true, spindle: true, gametes: false, cell: true };
      if (step === 2) return { kind: 'chrom', pos: anaphasePose(orientation), poles: true, spindle: true, gametes: false, cell: true };
      if (step === 3) {
        // secondary: same as anaphase but poles off
        return { kind: 'chrom', pos: anaphasePose(orientation), poles: false, spindle: false, gametes: false, cell: true, dual: true };
      }
      if (step === 4) {
        return { kind: 'chrom', pos: anaphasePose(orientation), poles: false, spindle: false, gametes: false, cell: true, dual: true };
      }
      if (step === 5) {
        const types = orientation === 1
          ? ['YR', 'YR', 'yr', 'yr']
          : ['Yr', 'Yr', 'yR', 'yR'];
        return { kind: 'gametes', types, poles: false, spindle: false, gametes: true, cell: false };
      }
      // step 6 all four
      return { kind: 'gametes', types: ['YR', 'Yr', 'yR', 'yr'], poles: false, spindle: false, gametes: true, cell: false };
    }

    function capture() {
      return {
        Y: chromY.position.clone(),
        y: chromY2.position.clone(),
        R: chromR.position.clone(),
        r: chromR2.position.clone(),
      };
    }

    function apply(target, t) {
      const e = easeInOut(Math.min(1, Math.max(0, t)));
      const showChrom = target.kind === 'chrom';

      chromY.visible = showChrom;
      chromY2.visible = showChrom;
      chromR.visible = showChrom;
      chromR2.visible = showChrom;

      if (showChrom && fromPos && target.pos) {
        ['Y', 'y', 'R', 'r'].forEach((k) => {
          const mesh = { Y: chromY, y: chromY2, R: chromR, r: chromR2 }[k];
          const a = fromPos[k];
          const b = target.pos[k];
          mesh.position.set(
            a.x + (b.x - a.x) * e,
            a.y + (b.y - a.y) * e,
            a.z + (b.z - a.z) * e
          );
        });
      }

      cell.visible = !!target.cell && !target.gametes;
      poleL.visible = !!target.poles;
      poleR.visible = !!target.poles;

      while (spindleGroup.children.length) spindleGroup.remove(spindleGroup.children[0]);
      if (target.spindle && target.pos) {
        const p = target.pos;
        spindleGroup.add(makeSpindleLine(poleL.position, new THREE.Vector3(p.Y.x, p.Y.y, 0)));
        spindleGroup.add(makeSpindleLine(poleR.position, new THREE.Vector3(p.y.x, p.y.y, 0)));
        spindleGroup.add(makeSpindleLine(poleL.position, new THREE.Vector3(p.R.x, p.R.y, 0)));
        spindleGroup.add(makeSpindleLine(poleR.position, new THREE.Vector3(p.r.x, p.r.y, 0)));
      }

      if (target.gametes) {
        if (e > 0.5 || animT >= 1) {
          buildFourGametes(target.types);
          gameteGroup.visible = true;
        }
      } else {
        gameteGroup.visible = false;
      }
    }

    let toTarget = null;

    function setStep(i, animate) {
      step = Math.max(0, Math.min(6, i));
      toTarget = currentTargetPose();
      if (animate && toTarget.kind === 'chrom') {
        fromPos = capture();
        animT = 0;
      } else {
        if (toTarget.kind === 'chrom') {
          fromPos = {
            Y: new THREE.Vector3(toTarget.pos.Y.x, toTarget.pos.Y.y, toTarget.pos.Y.z),
            y: new THREE.Vector3(toTarget.pos.y.x, toTarget.pos.y.y, toTarget.pos.y.z),
            R: new THREE.Vector3(toTarget.pos.R.x, toTarget.pos.R.y, toTarget.pos.R.z),
            r: new THREE.Vector3(toTarget.pos.r.x, toTarget.pos.r.y, toTarget.pos.r.z),
          };
          // snap
          chromY.position.copy(fromPos.Y);
          chromY2.position.copy(fromPos.y);
          chromR.position.copy(fromPos.R);
          chromR2.position.copy(fromPos.r);
        }
        animT = 1;
        apply(toTarget, 1);
      }
      return step;
    }

    function setOrientation(ori, animate) {
      orientation = ori === 2 ? 2 : 1;
      if (step >= 1 && step <= 5) setStep(step, animate !== false);
      return orientation;
    }

    setStep(0, false);

    let raf = 0;
    let running = false;
    function tick() {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      if (animT < 1 && toTarget) {
        animT = Math.min(1, animT + 0.035);
        apply(toTarget, animT);
      }
      root.rotation.y = Math.sin(performance.now() * 0.00022) * 0.035;
      renderer.render(scene, camera);
    }

    function resize() {
      w = host.clientWidth || 1;
      h = host.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }

    return {
      stepCount: 7,
      getStep: () => step,
      getOrientation: () => orientation,
      setStep,
      setOrientation,
      start() {
        if (running) return;
        running = true;
        resize();
        tick();
      },
      stop() {
        running = false;
        cancelAnimationFrame(raf);
      },
      resize,
      dispose() {
        this.stop();
        renderer.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      },
    };
  }

  // CapsuleGeometry polyfill for older three.min
  if (!THREE.CapsuleGeometry) {
    THREE.CapsuleGeometry = class CapsuleGeometry extends THREE.CylinderGeometry {
      constructor(r, len, capSegs, radSegs) {
        super(r, r, len + 2 * r, radSegs || 10);
      }
    };
  }

  global.MendelScenes = {
    SegregationScene,
    IndependentScene,
  };
})(typeof window !== 'undefined' ? window : globalThis);

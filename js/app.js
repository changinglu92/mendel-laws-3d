/* Mendel laws SPA controller */
(function () {
  const SEG_STEPS = [
    {
      badge: '步骤 1 / 6 · 初级性母细胞 Dd',
      caption: 'F1 杂合子<strong>初级性母细胞</strong>：基因型 <strong>Dd</strong>（高茎显性）。一对同源染色体上分别携带等位基因 D 与 d，每条染色体已复制为两条姐妹染色单体。',
      desc: '观察：深蓝色染色体带 D，浅蓝色带 d。姐妹染色单体由着丝粒相连，等位基因位于同源染色体的相同位置。',
    },
    {
      badge: '步骤 2 / 6 · 减数第一次分裂中期',
      caption: '减Ⅰ<strong>中期</strong>：同源染色体成对排列在赤道板两侧。纺锤丝牵引，为分离做准备。',
      desc: '关键：一对同源染色体（含 D 与含 d）整齐排在细胞中央——这是分离的“起跑线”。',
    },
    {
      badge: '步骤 3 / 6 · 减Ⅰ后期 · 同源分离',
      caption: '减Ⅰ<strong>后期</strong>：同源染色体分开，移向两极。<strong>等位基因 D 与 d 随同源染色体分离</strong>，分别进入将形成的两个次级性母细胞。',
      desc: '定律核心画面：等位基因分离 = 同源染色体分离。此时姐妹染色单体仍连在一起（着丝粒未分裂）。',
    },
    {
      badge: '步骤 4 / 6 · 次级性母细胞',
      caption: '形成两个<strong>次级性母细胞</strong>：一个只含 D（仍为两条姐妹染色单体），另一个只含 d。',
      desc: '每个次级性母细胞的染色体数目减半；等位基因已经分开，不再同处一室。',
    },
    {
      badge: '步骤 5 / 6 · 减Ⅱ · 姐妹染色单体分开',
      caption: '减数第二次分裂：着丝粒分裂，<strong>姐妹染色单体分开</strong>成为子染色体，分别进入子细胞。',
      desc: '减Ⅱ类似于“特殊的有丝分裂”，不再发生同源染色体的分离（同源已在减Ⅰ分开）。',
    },
    {
      badge: '步骤 6 / 6 · 四个配子 · 1/2 D + 1/2 d',
      caption: '最终产生四个配子：其中 <strong>1/2 含 D、1/2 含 d</strong>。这就是分离定律在配子水平上的直接结果。',
      desc: '高考底座：杂合子 Dd 产生配子 D : d = 1 : 1。后续测交、自交比例都由此推出。',
    },
  ];

  const IND_STEPS = [
    {
      badge: '步骤 1 / 7 · F1 杂合子 YyRr',
      caption: '豌豆子叶颜色 Y（黄）/ y（绿），种子形状 R（圆）/ r（皱）。F1 基因型 <strong>YyRr</strong>，两对等位基因位于<strong>非同源染色体</strong>上。',
      desc: '橙色一对：Y / y；绿色一对：R / r。拖拽可旋转观察。自由组合的前提：非同源、非等位。',
      showPoss: false,
      showGametes: false,
    },
    {
      badge: '步骤 2 / 7 · 减Ⅰ中期 · 两种取向',
      caption: '减Ⅰ中期，两对同源染色体在赤道板上可有<strong>两种排列取向</strong>（可能性均等）。右侧可切换「取向① / 取向②」。',
      desc: '取向①：Y 与 R 同侧、y 与 r 同侧 → 将产生配子 YR、yr。取向②：Y 与 r 同侧 → 将产生 Yr、yR。',
      showPoss: true,
      showGametes: false,
    },
    {
      badge: '步骤 3 / 7 · 减Ⅰ后期 · 非同源独立移向两极',
      caption: '同源染色体分离的同时，<strong>非同源染色体自由组合</strong>进入同一极——这是自由组合的细胞学基础。',
      desc: '注意：等位基因仍随同源分开（Y 与 y 必分到两极）；非等位基因（如 Y 与 R）则可同可异。',
      showPoss: true,
      showGametes: false,
    },
    {
      badge: '步骤 4 / 7 · 次级性母细胞',
      caption: '两种取向各产生两类次级性母细胞。当前取向决定本侧得到的基因组合。',
      desc: '每个次级性母细胞含每对同源中的一条（已复制），基因组合由取向决定。',
      showPoss: true,
      showGametes: false,
    },
    {
      badge: '步骤 5 / 7 · 减Ⅱ完成',
      caption: '减Ⅱ姐妹染色单体分开后，每种取向最终得到<strong>两种</strong>配子类型（各占该取向产物的一半）。',
      desc: '取向① → YR 与 yr；取向② → Yr 与 yR。两种取向概率相等。',
      showPoss: true,
      showGametes: false,
    },
    {
      badge: '步骤 6 / 7 · 当前取向的配子',
      caption: '看清<strong>当前取向</strong>产生的配子类型（各两个细胞，基因型相同）。再切换取向对比另一组。',
      desc: '单看一种取向，只能得到两种配子；必须两种取向合在一起才有四种。',
      showPoss: true,
      showGametes: false,
    },
    {
      badge: '步骤 7 / 7 · 四种配子 1 : 1 : 1 : 1',
      caption: '综合两种取向：配子 <strong>YR : Yr : yR : yr = 1 : 1 : 1 : 1</strong>。非同源上的非等位基因自由组合；等位基因仍随同源分离。',
      desc: '自交 F2 性状分离比 9 : 3 : 3 : 1 由此而来。计算时先写配子再棋盘法/相乘法。',
      showPoss: false,
      showGametes: true,
    },
  ];

  // ---------- DOM ----------
  const $ = (id) => document.getElementById(id);
  const views = {
    home: $('view-home'),
    segregation: $('view-segregation'),
    independent: $('view-independent'),
  };

  let currentView = 'home';
  let segScene = null;
  let indScene = null;
  let segStep = 0;
  let indStep = 0;

  function setTitle(view) {
    const el = $('top-title');
    if (view === 'home') {
      el.innerHTML = '孟德尔遗传定律 · 一轮复习 <span class="sub">深圳实验学校 · 高三生物</span>';
    } else if (view === 'segregation') {
      el.innerHTML = '基因的分离定律 <span class="sub">豌豆高茎 / 矮茎 Dd</span>';
    } else {
      el.innerHTML = '基因的自由组合定律 <span class="sub">豌豆黄圆 / 绿皱 YyRr</span>';
    }
  }

  function showView(name) {
    Object.keys(views).forEach((k) => {
      views[k].classList.toggle('active', k === name);
    });
    currentView = name;
    setTitle(name);
    location.hash = name === 'home' ? '' : name;

    if (name === 'segregation') {
      ensureSeg();
      segScene && segScene.start();
      indScene && indScene.stop();
      updateSegUI();
      requestAnimationFrame(() => segScene && segScene.resize());
    } else if (name === 'independent') {
      ensureInd();
      indScene && indScene.start();
      segScene && segScene.stop();
      updateIndUI();
      requestAnimationFrame(() => indScene && indScene.resize());
    } else {
      segScene && segScene.stop();
      indScene && indScene.stop();
    }
  }

  function ensureSeg() {
    if (segScene) return;
    const host = $('canvas-host');
    segScene = MendelScenes.SegregationScene(host);
    buildPills('seg-pills', SEG_STEPS.length);
  }

  function ensureInd() {
    if (indScene) return;
    const host = $('canvas-host-b');
    indScene = MendelScenes.IndependentScene(host);
    buildPills('ind-pills', IND_STEPS.length);
  }

  function buildPills(id, n) {
    const box = $(id);
    box.innerHTML = '';
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.className = 'step-pill';
      s.dataset.i = String(i);
      box.appendChild(s);
    }
  }

  function paintPills(id, step, total) {
    const pills = $(id).querySelectorAll('.step-pill');
    pills.forEach((p, i) => {
      p.classList.toggle('active', i === step);
      p.classList.toggle('done', i < step);
    });
  }

  function updateSegUI() {
    const s = SEG_STEPS[segStep];
    $('seg-badge').textContent = s.badge;
    $('seg-caption').innerHTML = s.caption;
    $('seg-desc').textContent = s.desc;
    $('seg-step-label').textContent = (segStep + 1) + ' / ' + SEG_STEPS.length;
    paintPills('seg-pills', segStep, SEG_STEPS.length);
    $('seg-prev').disabled = segStep === 0;
    $('seg-next').disabled = segStep === SEG_STEPS.length - 1;
    $('seg-next').textContent = segStep === SEG_STEPS.length - 1 ? '完成' : '下一步';
  }

  function updateIndUI() {
    const s = IND_STEPS[indStep];
    $('ind-badge').textContent = s.badge;
    $('ind-caption').innerHTML = s.caption;
    $('ind-desc').textContent = s.desc;
    $('ind-step-label').textContent = (indStep + 1) + ' / ' + IND_STEPS.length;
    paintPills('ind-pills', indStep, IND_STEPS.length);
    $('ind-prev').disabled = indStep === 0;
    $('ind-next').disabled = indStep === IND_STEPS.length - 1;
    $('ind-next').textContent = indStep === IND_STEPS.length - 1 ? '完成' : '下一步';
    $('ind-poss').style.display = s.showPoss ? 'flex' : 'none';
    $('ind-gametes').style.display = s.showGametes ? 'grid' : 'none';
    if (indScene) {
      const ori = indScene.getOrientation();
      $('ind-poss').querySelectorAll('button').forEach((b) => {
        b.classList.toggle('active', Number(b.dataset.poss) === ori);
      });
    }
  }

  // ---------- Navigation ----------
  document.querySelectorAll('[data-goto]').forEach((btn) => {
    btn.addEventListener('click', () => showView(btn.dataset.goto));
  });
  $('btn-home').addEventListener('click', () => showView('home'));

  $('seg-prev').addEventListener('click', () => {
    if (segStep <= 0) return;
    segStep -= 1;
    segScene.setStep(segStep, true);
    updateSegUI();
  });
  $('seg-next').addEventListener('click', () => {
    if (segStep >= SEG_STEPS.length - 1) return;
    segStep += 1;
    segScene.setStep(segStep, true);
    updateSegUI();
  });

  $('ind-prev').addEventListener('click', () => {
    if (indStep <= 0) return;
    indStep -= 1;
    indScene.setStep(indStep, true);
    updateIndUI();
  });
  $('ind-next').addEventListener('click', () => {
    if (indStep >= IND_STEPS.length - 1) return;
    indStep += 1;
    indScene.setStep(indStep, true);
    updateIndUI();
  });

  $('ind-poss').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-poss]');
    if (!btn || !indScene) return;
    indScene.setOrientation(Number(btn.dataset.poss), true);
    updateIndUI();
  });

  // pill click
  $('seg-pills').addEventListener('click', (e) => {
    const p = e.target.closest('.step-pill');
    if (!p) return;
    segStep = Number(p.dataset.i);
    segScene.setStep(segStep, true);
    updateSegUI();
  });
  $('ind-pills').addEventListener('click', (e) => {
    const p = e.target.closest('.step-pill');
    if (!p) return;
    indStep = Number(p.dataset.i);
    indScene.setStep(indStep, true);
    updateIndUI();
  });

  // Keyboard
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      showView('home');
      e.preventDefault();
      return;
    }
    if (currentView === 'segregation') {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        $('seg-next').click();
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        $('seg-prev').click();
        e.preventDefault();
      }
    } else if (currentView === 'independent') {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        $('ind-next').click();
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        $('ind-prev').click();
        e.preventDefault();
      } else if (e.key === '1') {
        indScene && indScene.setOrientation(1, true);
        updateIndUI();
      } else if (e.key === '2') {
        indScene && indScene.setOrientation(2, true);
        updateIndUI();
      }
    }
  });

  // Fullscreen
  $('btn-fs').addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      $('btn-fs').textContent = '退出全屏';
    } else {
      document.exitFullscreen().catch(() => {});
      $('btn-fs').textContent = '全屏';
    }
  });
  document.addEventListener('fullscreenchange', () => {
    $('btn-fs').textContent = document.fullscreenElement ? '退出全屏' : '全屏';
  });

  // Resize
  window.addEventListener('resize', () => {
    if (currentView === 'segregation' && segScene) segScene.resize();
    if (currentView === 'independent' && indScene) indScene.resize();
  });

  // Hash routing
  function applyHash() {
    const h = (location.hash || '').replace(/^#/, '');
    if (h === 'segregation' || h === 'independent') showView(h);
    else showView('home');
  }
  window.addEventListener('hashchange', applyHash);

  // Boot
  applyHash();
})();

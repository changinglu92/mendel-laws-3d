/* Mendel laws SPA — 人教版必修2 分离+自由组合 · 一轮复习 · 高频特例入门 */
(function () {
  /**
   * 分离定律：
   * 0–4 课本故事线
   * 5–9 细胞学实质
   * 10–11 要点补强（假说/演绎、适用范围、自交≠自由交配）
   * 12–13 特例入门（不完全显性、显性纯合致死）
   * 14–17 做中学 quizzes
   * sceneStep: SegregationScene 0..5；null = 平面示意
   */
  const SEG_STEPS = [
    {
      phase: '课本故事线 · ①杂交',
      title: '纯种高茎 × 纯种矮茎 → F₁ 全是高茎',
      body:
        '<p>孟德尔用<strong>纯种高茎</strong>与<strong>纯种矮茎</strong>作亲本（P）杂交。</p>' +
        '<p>无论正交还是反交，子一代（F₁）<strong>总是高茎</strong>——矮茎“隐而未现”。</p>' +
        '<p>F₁ 中显现的性状叫<span class="hl">显性性状</span>（高茎）；未显现的叫<span class="hl">隐性性状</span>（矮茎）。</p>',
      caption: '人教版：高茎为显性，矮茎为隐性；F₁ 表型一致，并不等于融合遗传。',
      sceneStep: null,
      visual: 'cross',
    },
    {
      phase: '课本故事线 · ②性状分离',
      title: 'F₁ 自交 → F₂ 出现约 3∶1 的性状分离',
      body:
        '<p>F₁ 自交后，F₂ 中<strong>既有高茎，又有矮茎</strong>——这叫<span class="hl">性状分离</span>。</p>' +
        '<p>孟德尔统计 <strong>1064</strong> 株 F₂：高茎 <strong>787</strong>、矮茎 <strong>277</strong>，分离比接近 <strong>3∶1</strong>。</p>' +
        '<p>其他 6 对相对性状也都接近 3∶1——不是偶然。</p>',
      caption: '课本数据：1064 株中 787∶277 ≈ 2.84∶1，接近 3∶1。',
      sceneStep: null,
      visual: 'f2',
    },
    {
      phase: '课本故事线 · ③假说',
      title: '假说：遗传因子成对 · 分离 · 受精随机',
      body:
        '<p>① 生物性状由<strong>遗传因子</strong>决定；体细胞中成对存在，<strong>不相融合</strong>。</p>' +
        '<p>② 形成配子时，成对遗传因子<strong>彼此分离</strong>，分别进入不同配子。</p>' +
        '<p>③ 受精时雌雄配子<strong>随机结合</strong> → F₂ 中 DD∶Dd∶dd = 1∶2∶1，表型高∶矮 ≈ <strong>3∶1</strong>。</p>',
      caption: '假说解释了 3∶1；还要用新实验去验证（假说—演绎法）。',
      sceneStep: null,
      visual: 'hypothesis',
    },
    {
      phase: '课本故事线 · ④测交验证',
      title: '测交：F₁（Dd）× 矮茎（dd）→ 预期 1∶1',
      body:
        '<p>测交：让 F₁ 与<strong>隐性纯合子</strong>杂交，可直接“看见”F₁ 产生的配子种类与比例。</p>' +
        '<p>按假说：Dd 配子 D∶d = 1∶1，与 dd 结合 → 高茎∶矮茎应接近 <strong>1∶1</strong>。</p>' +
        '<p>结果：166 株中高茎 <strong>87</strong>、矮茎 <strong>79</strong>，接近 1∶1 —— <strong>验证了假说</strong>。</p>',
      caption: '测交是演绎验证：预测 1∶1，实验相符，假说成立。',
      sceneStep: null,
      visual: 'testcross',
    },
    {
      phase: '课本故事线 · ⑤定律表述',
      title: '分离定律（孟德尔第一定律）',
      body:
        '<p>在生物的<strong>体细胞</strong>中，控制同一性状的遗传因子<strong>成对存在，不相融合</strong>；</p>' +
        '<p>在<strong>形成配子</strong>时，成对的遗传因子发生<strong>分离</strong>，分别进入不同的配子中，随配子遗传给后代。</p>' +
        '<p>下一幕用 3D 看清：分离发生在<strong>减数第一次分裂后期</strong>。</p>',
      caption: '课本原意：成对存在 → 形成配子时分离 → 进入不同配子。',
      sceneStep: null,
      visual: 'law',
    },
    {
      phase: '细胞学实质 · ⑥初级性母细胞',
      title: '杂合子 Dd 的初级性母细胞',
      body:
        '<p>F₁ 高茎基因型为 <strong>Dd</strong>。一对<strong>同源染色体</strong>上分别带等位基因 D 与 d。</p>' +
        '<p>此时每条染色体已复制为两条姐妹染色单体，着丝粒相连。</p>' +
        '<p>拖拽可旋转观察：深蓝 = D，浅蓝 = d。</p>',
      caption: '一轮要点：研究对象 = 一对同源染色体上的等位基因。',
      sceneStep: 0,
      visual: null,
    },
    {
      phase: '细胞学实质 · ⑦减Ⅰ中期',
      title: '减数第一次分裂中期：同源成对排赤道板',
      body:
        '<p>减Ⅰ<strong>中期</strong>：同源染色体成对排列在赤道板两侧。</p>' +
        '<p>纺锤丝牵引，为即将发生的分离做准备——这是分离的“起跑线”。</p>',
      caption: '中期排列整齐，后期才会定向分离。',
      sceneStep: 1,
      visual: null,
    },
    {
      phase: '细胞学实质 · ⑧减Ⅰ后期（核心）',
      title: '减Ⅰ后期：等位基因随同源染色体分离',
      body:
        '<p>减Ⅰ<strong>后期</strong>：同源染色体分开，移向两极。</p>' +
        '<p class="hl">分离定律的细胞学实质：等位基因随同源染色体的分开而分离，分别进入不同配子。</p>' +
        '<p>发生时期 = <strong>减数分裂Ⅰ后期</strong>（姐妹染色单体此时仍连在一起）。</p>',
      caption: '实质一句话：等位基因随同源染色体分开而分离（减Ⅰ后期）。',
      sceneStep: 2,
      visual: null,
    },
    {
      phase: '细胞学实质 · ⑨次级性母细胞',
      title: '两个次级性母细胞：一个只含 D，一个只含 d',
      body:
        '<p>同源分离后形成两个次级性母细胞：染色体数目减半。</p>' +
        '<p>等位基因已经分开——不再同处一室。接着进入减Ⅱ。</p>',
      caption: '等位基因的分离在减Ⅰ已完成；减Ⅱ不再分离同源。',
      sceneStep: 3,
      visual: null,
    },
    {
      phase: '细胞学实质 · ⑩配子 1/2 D + 1/2 d',
      title: '最终配子：1/2 含 D，1/2 含 d',
      body:
        '<p>减Ⅱ着丝粒分裂，姐妹染色单体分开，形成四个配子。</p>' +
        '<p>对 Dd 而言：配子 <strong>D∶d = 1∶1</strong>（各占 1/2）。</p>' +
        '<p><span class="hl">高考底座</span>：一切测交 1∶1、自交 3∶1 的计算，都先从配子比例写起。</p>',
      caption: '配子比例是计算底座：先写配子，再写受精。',
      sceneStep: 5,
      visual: null,
    },
    {
      phase: '要点补强 · 假说—演绎',
      title: '假说内容 ≠ 演绎推理（测交预测属演绎）',
      body:
        '<p><strong>假说</strong>：成对遗传因子不相融合；形成配子时彼此分离；受精随机——用来解释已有的 3∶1。</p>' +
        '<p><strong>演绎推理</strong>：若假说正确，则测交后代应接近 1∶1（这是<strong>预测</strong>，不是假说本身）。</p>' +
        '<p>易错：把“测交后代应 1∶1”当成假说内容——其实属于演绎（世纪金榜·第18讲）。</p>',
      caption: '假说解释旧结果；演绎预测新实验；实验相符 → 验证假说。',
      sceneStep: null,
      visual: 'hyp-deduce',
    },
    {
      phase: '要点补强 · 适用范围 · 自交/自由交配',
      title: '适用范围 · 自交 ≠ 自由交配',
      body:
        '<p><strong>适用范围</strong>：有性生殖的真核生物、核基因、一对相对性状。质基因（如线粒体）<span class="hl">不遵循</span>分离定律（广东2023 T4 思想）。</p>' +
        '<p><strong>自交</strong>（一对基因）：同基因型个体交配，用<strong>列举/棋盘</strong>即可（如 Dd×Dd → 1∶2∶1）。</p>' +
        '<p><strong>自由交配</strong>：先算群体<strong>配子频率</strong>，再随机结合（配子法）。二者算法不同，勿混用。</p>',
      caption: '核基因遵循；质基因不遵循。一对基因：自交列举，自由交配先算配子频率。',
      sceneStep: null,
      visual: 'scope',
    },
    {
      phase: '特例入门 · 不完全显性',
      title: '不完全显性：F₁ 中间型，F₂ 表型 1∶2∶1',
      body:
        '<p>完全显性：杂合 Dd 只显高茎。若为<span class="hl">不完全显性</span>，杂合子表现为<strong>中间型</strong>。</p>' +
        '<p>情境简化（广东2023 卷羽思想）：卷羽 F 对片羽 f 不完全显性，Ff 为<strong>半卷羽</strong>。</p>' +
        '<p>Ff 自交 → 基因型 1∶2∶1，表型也是 <strong>1∶2∶1</strong>（不再并成 3∶1）。分离实质不变，只是显隐关系变了。</p>',
      caption: '不完全显性：杂合中间型；F₂ 表型比 = 基因型比 1∶2∶1。',
      sceneStep: null,
      visual: 'incomplete',
    },
    {
      phase: '特例入门 · 显性纯合致死',
      title: '显性纯合致死：Aa 自交表型 2∶1（不是 3∶1）',
      body:
        '<p>若 <strong>AA 胚胎致死</strong>（显性纯合致死），存活个体只剩 Aa 与 aa。</p>' +
        '<p>Aa 自交：理论 AA∶Aa∶aa = 1∶2∶1，去掉 AA → 存活 <strong>Aa∶aa = 2∶1</strong>。</p>' +
        '<p>表观分离比从 3∶1 变成 <span class="hl">2∶1</span>——仍遵循分离，只是某一格“删掉”。</p>',
      caption: '显性纯合致死：棋盘格去掉 AA，存活表型比 2∶1。',
      sceneStep: null,
      visual: 'lethal21',
    },
    {
      phase: '做中学 · 关卡 1',
      title: '测交情境：你会预期什么比例？',
      body:
        '<p>情景（课本测交思路）：用高茎 F₁（Dd）与矮茎（dd）杂交，验证分离假说。</p>' +
        '<p>请选择：测交后代高茎∶矮茎的<strong>预期比例</strong>，以及它主要验证了什么。</p>',
      caption: '广东一轮常考：测交验证 · 1∶1 · 配子种类与比例。',
      sceneStep: null,
      visual: 'quiz-bg',
      quiz: {
        q: '测交 Dd × dd，预期后代表型比，并指出验证点：',
        options: [
          { t: 'A. 3∶1 —— 验证 F₂ 性状分离比', ok: false },
          { t: 'B. 1∶1 —— 验证 F₁ 产生配子 D∶d = 1∶1', ok: true },
          { t: 'C. 1∶2∶1 —— 验证基因型比例', ok: false },
          { t: 'D. 9∶3∶3∶1 —— 验证自由组合', ok: false },
        ],
        explain:
          '正确！测交后代 1∶1，直接反映杂合子配子 D∶d = 1∶1，从而验证“形成配子时成对遗传因子分离”。课本 166 株约 87∶79。',
      },
    },
    {
      phase: '做中学 · 关卡 2',
      title: '基因型推断：高茎 × 高茎 → 出现矮茎',
      body:
        '<p>情景（一轮常见）：两株高茎豌豆杂交，后代出现矮茎。</p>' +
        '<p>“无中生有为隐性”——矮茎是隐性；亲本都表现显性却能生出隐性，说明亲本都带隐性基因。</p>',
      caption: '方法：无中生有为隐性；亲本均为杂合子 Dd × Dd。',
      sceneStep: null,
      visual: 'quiz-bg',
      quiz: {
        q: '高茎 × 高茎 → 子代有矮茎，亲本基因型最可能是：',
        options: [
          { t: 'A. DD × DD', ok: false },
          { t: 'B. DD × Dd', ok: false },
          { t: 'C. Dd × Dd', ok: true },
          { t: 'D. Dd × dd', ok: false },
        ],
        explain:
          '正确！子代出现隐性矮茎（dd），两个 d 必须分别来自双亲，故双亲都是 Dd。若为 Dd×dd 则是测交（亲本之一为矮茎），与“双亲都高茎”不符。',
      },
    },
    {
      phase: '做中学 · 关卡 3',
      title: '配子比例底座：先写配子再算',
      body:
        '<p>情景：已知 Dd 产生配子 D∶d = 1∶1。若 Dd 自交，雌雄配子随机结合。</p>' +
        '<p>问：子代中<strong>矮茎（dd）</strong>所占比例是多少？（先想配子，再相乘）</p>',
      caption: '底座：P(d)×P(d)=1/2×1/2=1/4；高茎 = 1 − 1/4 = 3/4。',
      sceneStep: null,
      visual: 'quiz-bg',
      quiz: {
        q: 'Dd 自交，子代矮茎（dd）的比例是：',
        options: [
          { t: 'A. 1/2', ok: false },
          { t: 'B. 1/3', ok: false },
          { t: 'C. 1/4', ok: true },
          { t: 'D. 3/4', ok: false },
        ],
        explain:
          '正确！雌配子 d 占 1/2，雄配子 d 占 1/2，随机结合得 dd = 1/4。表型高∶矮 = 3∶1，正是课本 F₂ 的理论比。',
      },
    },
    {
      phase: '做中学 · 关卡 4 · 特例',
      title: '特例辨析：不完全显性 or 致死 2∶1',
      body:
        '<p>情景：某植物花色受一对等位基因控制，红花×白花 → F₁ 全为粉花；粉花自交得 F₂。</p>' +
        '<p>另：若 AA 致死，Aa 自交存活个体表型比如何？请选正确表述。</p>',
      caption: '不完全显性 → 表型 1∶2∶1；显性纯合致死 → 存活 2∶1。',
      sceneStep: null,
      visual: 'quiz-bg',
      quiz: {
        q: '下列说法正确的是：',
        options: [
          { t: 'A. 不完全显性时 F₂ 表型仍并成 3∶1', ok: false },
          { t: 'B. 不完全显性：F₂ 红∶粉∶白 = 1∶2∶1', ok: true },
          { t: 'C. AA 致死时 Aa 自交存活仍为 3∶1', ok: false },
          { t: 'D. 质基因也一定遵循分离定律', ok: false },
        ],
        explain:
          '正确！不完全显性时基因型与表型均为 1∶2∶1。显性纯合致死则存活 Aa∶aa = 2∶1。质基因不遵循分离定律。',
      },
    },
  ];

  /**
   * 自由组合：
   * 0–4 课本故事线
   * 5–11 细胞学实质（sceneStep 0..6）
   * 12 拆分法
   * 13–15 做中学 quizzes
   * 16–17 特殊分离比入门 + quiz
   */
  const IND_STEPS = [
    {
      phase: '课本故事线 · ①杂交',
      title: '黄圆 × 绿皱 → F₁ 全是黄圆',
      body:
        '<p>孟德尔用<strong>黄色圆粒</strong>（YYRR）与<strong>绿色皱粒</strong>（yyrr）杂交。</p>' +
        '<p>F₁ 全部为<strong>黄色圆粒</strong>（YyRr）——黄对绿显性，圆对皱显性。</p>' +
        '<p>两对相对性状同时研究，才能发现自由组合。</p>',
      caption: '人教版：P 黄圆×绿皱 → F₁ 全黄圆（YyRr）。',
      sceneStep: null,
      visual: 'ind-cross',
      showPoss: false,
      showGametes: false,
    },
    {
      phase: '课本故事线 · ②性状分离',
      title: 'F₁ 自交 → F₂ ≈ 9∶3∶3∶1',
      body:
        '<p>F₁（YyRr）自交，F₂ 出现四种表型：</p>' +
        '<p><strong>黄圆∶黄皱∶绿圆∶绿皱 ≈ 9∶3∶3∶1</strong>。</p>' +
        '<p>每一对单独看仍是 3∶1；合在一起才是 9∶3∶3∶1——暗示两对因子独立分配。</p>',
      caption: '课本核心比：9∶3∶3∶1 = (3∶1)×(3∶1)。',
      sceneStep: null,
      visual: 'ind-f2',
      showPoss: false,
      showGametes: false,
    },
    {
      phase: '课本故事线 · ③假说',
      title: '假说：两对因子 · 分离 · 自由组合',
      body:
        '<p>① 两对相对性状分别由<strong>两对遗传因子</strong>控制。</p>' +
        '<p>② 形成配子时：每对遗传因子<strong>彼此分离</strong>；不同对的遗传因子可以<strong>自由组合</strong>。</p>' +
        '<p>③ F₁ 产生四种配子 <strong>YR∶Yr∶yR∶yr = 1∶1∶1∶1</strong>；受精随机 → 表型 9∶3∶3∶1。</p>',
      caption: '假说核心：等位分离 + 非等位自由组合 → 四种配子等比例。',
      sceneStep: null,
      visual: 'ind-hyp',
      showPoss: false,
      showGametes: false,
    },
    {
      phase: '课本故事线 · ④测交验证',
      title: '测交：YyRr × yyrr → 预期 1∶1∶1∶1',
      body:
        '<p>演绎：若假说正确，F₁ 与双隐性测交，后代四种表型应接近 <strong>1∶1∶1∶1</strong>。</p>' +
        '<p>实验结果与预测相符 → 假说成立，得出自由组合定律。</p>' +
        '<p>注意：“测交后代应 1∶1∶1∶1”属于<strong>演绎推理</strong>，不是假说原文。</p>',
      caption: '测交验证四种配子等比例；预测属演绎，实验属验证。',
      sceneStep: null,
      visual: 'ind-testcross',
      showPoss: false,
      showGametes: false,
    },
    {
      phase: '课本故事线 · ⑤定律 · 前提 · 名师点',
      title: '自由组合定律 · 前提 · 重组类型',
      body:
        '<p><strong>定律</strong>：控制不同性状的遗传因子分离和组合互不干扰；形成配子时，成对因子分离，不同对因子自由组合。</p>' +
        '<p><strong>前提</strong>：非同源染色体上的非等位基因（同源上的非等位基因不能自由组合）。</p>' +
        '<p><span class="hl">名师点</span>：重组类型不一定 6/16。YYRR×yyrr → 重组 6/16；YYrr×yyRR → 重组 10/16。</p>',
      caption: '实质发生在形成配子时；前提=非同源上的非等位基因。',
      sceneStep: null,
      visual: 'ind-law',
      showPoss: false,
      showGametes: false,
    },
    {
      phase: '细胞学实质 · ⑥初级性母细胞',
      title: 'F₁ 杂合子 YyRr：两对基因在非同源染色体上',
      body:
        '<p>子叶颜色 Y（黄）/ y（绿），种子形状 R（圆）/ r（皱）。</p>' +
        '<p>F₁ 基因型 <strong>YyRr</strong>，两对等位基因位于<strong>非同源染色体</strong>——自由组合的前提。</p>',
      caption: '橙色一对 Y/y；绿色一对 R/r。拖拽旋转观察。',
      sceneStep: 0,
      visual: null,
      showPoss: false,
      showGametes: false,
    },
    {
      phase: '细胞学实质 · ⑦减Ⅰ中期',
      title: '减Ⅰ中期：两种赤道板取向（概率相等）',
      body:
        '<p>两对同源染色体在赤道板上可有<strong>两种排列取向</strong>。</p>' +
        '<p>取向① → 将产生 YR、yr；取向② → 将产生 Yr、yR。点下方按钮切换。</p>',
      caption: '两种取向可能性均等，是四种配子各 1/4 的基础。',
      sceneStep: 1,
      visual: null,
      showPoss: true,
      showGametes: false,
    },
    {
      phase: '细胞学实质 · ⑧减Ⅰ后期（核心）',
      title: '减Ⅰ后期：非同源染色体自由组合',
      body:
        '<p>同源分离的同时，<strong>非同源染色体自由组合</strong>进入同一极。</p>' +
        '<p>等位基因仍随同源分开；非等位基因（如 Y 与 R）则可同可异。</p>',
      caption: '细胞学基础：非同源上的非等位基因自由组合。',
      sceneStep: 2,
      visual: null,
      showPoss: true,
      showGametes: false,
    },
    {
      phase: '细胞学实质 · ⑨次级性母细胞',
      title: '次级性母细胞：取向决定基因组合',
      body:
        '<p>两种取向各产生两类次级性母细胞。</p>' +
        '<p>当前取向决定本侧得到的基因组合。</p>',
      caption: '每个次级性母细胞含每对同源中的一条（已复制）。',
      sceneStep: 3,
      visual: null,
      showPoss: true,
      showGametes: false,
    },
    {
      phase: '细胞学实质 · ⑩减Ⅱ',
      title: '减Ⅱ完成：每种取向得到两种配子',
      body:
        '<p>减Ⅱ姐妹染色单体分开后，每种取向最终得到<strong>两种</strong>配子类型。</p>' +
        '<p>取向① → YR 与 yr；取向② → Yr 与 yR。</p>',
      caption: '单看一种取向只有两种配子；两种取向合起来才有四种。',
      sceneStep: 4,
      visual: null,
      showPoss: true,
      showGametes: false,
    },
    {
      phase: '细胞学实质 · ⑪对比取向',
      title: '看清当前取向产生的配子',
      body:
        '<p>观察<strong>当前取向</strong>的配子类型，再切换取向对比另一组。</p>',
      caption: '切换「取向① / 取向②」对比。',
      sceneStep: 5,
      visual: null,
      showPoss: true,
      showGametes: false,
    },
    {
      phase: '细胞学实质 · ⑫四种配子',
      title: '四种配子 1∶1∶1∶1',
      body:
        '<p>综合两种取向：配子 <strong>YR∶Yr∶yR∶yr = 1∶1∶1∶1</strong>。</p>' +
        '<p>自交 F₂ 性状分离比 9∶3∶3∶1 由此而来。计算：先写配子再棋盘法/相乘法。</p>',
      caption: '非同源非等位自由组合；等位基因仍随同源分离。',
      sceneStep: 6,
      visual: null,
      showPoss: false,
      showGametes: true,
    },
    {
      phase: '解题方法 · 拆分法',
      title: '拆分法：AaBb 自交 = (3∶1)×(3∶1)',
      body:
        '<p>两对（或多对）独立遗传时，<strong>逐对按分离定律算，再相乘</strong>。</p>' +
        '<p>例：YyRr 自交，黄皱 = 黄(3/4) × 皱(1/4) = <strong>3/16</strong>；黄圆 = 3/4×3/4 = 9/16。</p>' +
        '<p>广东思想（2022 T19）：多对独立遗传 → 显性×隐性×显性…连乘（如 3/4×1/4×3/4）。</p>',
      caption: '拆分组合法：每对 3∶1（或 1∶1），再乘法原理。',
      sceneStep: null,
      visual: 'ind-split',
      showPoss: false,
      showGametes: false,
    },
    {
      phase: '做中学 · 关卡 1',
      title: '测交：YyRr × yyrr 后代比例？',
      body:
        '<p>情景：用黄色圆粒 F₁（YyRr）与绿色皱粒（yyrr）测交，验证自由组合假说。</p>' +
        '<p>问：测交后代表型比例预期是多少？</p>',
      caption: '测交直接反映四种配子比例 → 1∶1∶1∶1。',
      sceneStep: null,
      visual: 'quiz-bg',
      showPoss: false,
      showGametes: false,
      quiz: {
        q: 'YyRr × yyrr，测交后代表型比预期为：',
        options: [
          { t: 'A. 9∶3∶3∶1', ok: false },
          { t: 'B. 3∶1', ok: false },
          { t: 'C. 1∶1∶1∶1', ok: true },
          { t: 'D. 1∶2∶1', ok: false },
        ],
        explain:
          '正确！YyRr 产生 YR∶Yr∶yR∶yr = 1∶1∶1∶1，与 yyrr 结合后四种表型等比例，即 1∶1∶1∶1。',
      },
    },
    {
      phase: '做中学 · 关卡 2',
      title: '拆分法：求黄皱比例',
      body:
        '<p>情景：YyRr 自交（两对独立遗传）。</p>' +
        '<p>问：子代中<strong>黄色皱粒</strong>（Y_rr）所占比例是多少？</p>',
      caption: '黄 = 3/4，皱 = 1/4 → 3/4×1/4 = 3/16。',
      sceneStep: null,
      visual: 'quiz-bg',
      showPoss: false,
      showGametes: false,
      quiz: {
        q: 'YyRr 自交，黄色皱粒（Y_rr）的比例是：',
        options: [
          { t: 'A. 1/16', ok: false },
          { t: 'B. 3/16', ok: true },
          { t: 'C. 9/16', ok: false },
          { t: 'D. 1/4', ok: false },
        ],
        explain:
          '正确！拆分：Yy→黄 3/4；Rr→皱 1/4；独立则相乘 3/4×1/4=3/16。',
      },
    },
    {
      phase: '做中学 · 关卡 3',
      title: '广东思想：多对独立遗传连乘',
      body:
        '<p>情景简化（广东2022 家蚕思想）：两对独立遗传，求“显性性状 × 隐性性状”的比例。</p>' +
        '<p>AaBb 自交（独立），求子代中 <strong>A_ bb</strong>（显性×隐性）的比例。</p>',
      caption: '3/4 × 1/4 = 3/16；三对则再乘第三对的 3/4 或 1/4。',
      sceneStep: null,
      visual: 'quiz-bg',
      showPoss: false,
      showGametes: false,
      quiz: {
        q: 'AaBb 自交（独立遗传），A_bb 所占比例是：',
        options: [
          { t: 'A. 1/16', ok: false },
          { t: 'B. 3/16', ok: true },
          { t: 'C. 9/16', ok: false },
          { t: 'D. 1/4', ok: false },
        ],
        explain:
          '正确！A_ 占 3/4，bb 占 1/4，连乘得 3/16。多对独立同理：每对贡献相乘（如 3/4×1/4×3/4=9/64）。',
      },
    },
    {
      phase: '特例入门 · 特殊分离比',
      title: '9∶3∶4 / 15∶1 / 9∶6∶1 —— 9∶3∶3∶1 的变式',
      body:
        '<p>本质仍是自由组合，只是<strong>表型格合并</strong>：</p>' +
        '<p>· <strong>9∶3∶4</strong>（隐性上位）：aa 掩盖另一对 → aaB_+aabb 同表型，3+1=4。</p>' +
        '<p>· <strong>15∶1</strong>：只要有一个显性基因就同表型 → 9+3+3=15，仅双隐 1。</p>' +
        '<p>· <strong>9∶6∶1</strong>（累加/双显同效简版）：A_bb 与 aaB_ 同表型 → 3+3=6。</p>',
      caption: '先写出 9∶3∶3∶1 四格，再按互作规则合并。轻提示：一对致死可叠成 4∶2∶2∶1。',
      sceneStep: null,
      visual: 'ind-special',
      showPoss: false,
      showGametes: false,
    },
    {
      phase: '做中学 · 关卡 4 · 特殊比',
      title: '特殊分离比：你会合并哪几格？',
      body:
        '<p>情景：AaBb 自交遵循自由组合。若只要有显性基因（A 或 B）就表现为抗病，仅 aabb 感病。</p>' +
        '<p>问：抗病∶感病的表型比是？</p>',
      caption: '15∶1 = 有显性同表型；隐性上位常见 9∶3∶4。',
      sceneStep: null,
      visual: 'quiz-bg',
      showPoss: false,
      showGametes: false,
      quiz: {
        q: '“有显性即抗病、仅 aabb 感病”，AaBb 自交表型比为：',
        options: [
          { t: 'A. 9∶3∶3∶1', ok: false },
          { t: 'B. 9∶3∶4', ok: false },
          { t: 'C. 15∶1', ok: true },
          { t: 'D. 9∶6∶1', ok: false },
        ],
        explain:
          '正确！A_B_、A_bb、aaB_ 都抗病（9+3+3=15），aabb 感病（1）→ 15∶1。9∶3∶4 是隐性上位；9∶6∶1 是单显两格同效。',
      },
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
  let quizAnswered = {};
  let indQuizAnswered = {};

  function setTitle(view) {
    const el = $('top-title');
    if (view === 'home') {
      el.innerHTML = '孟德尔遗传定律 · 一轮复习 <span class="sub">深圳实验学校 · 高三生物</span>';
    } else if (view === 'segregation') {
      el.innerHTML = '基因的分离定律 <span class="sub">人教版必修2 · 豌豆高茎/矮茎</span>';
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
      const s = document.createElement('button');
      s.type = 'button';
      s.className = 'step-pill';
      s.dataset.i = String(i);
      s.textContent = String(i + 1);
      s.title = '跳到第 ' + (i + 1) + ' 步';
      box.appendChild(s);
    }
  }

  function paintPills(id, step) {
    const pills = $(id).querySelectorAll('.step-pill');
    pills.forEach((p, i) => {
      p.classList.toggle('active', i === step);
      p.classList.toggle('done', i < step);
    });
  }

  // ---------- Story visuals ----------
  const VISUALS = {
    cross: `
      <div class="sv-inner">
        <div class="sv-flow">
          <div class="sv-box tall"><div class="label">P 母本</div><div class="val">高茎<br>DD</div></div>
          <span class="sv-arrow">×</span>
          <div class="sv-box dwarf"><div class="label">P 父本</div><div class="val">矮茎<br>dd</div></div>
          <span class="sv-arrow">→</span>
          <div class="sv-box highlight tall"><div class="label">F₁</div><div class="val">全高茎<br>Dd</div></div>
        </div>
        <div class="sv-note">显性：高茎　隐性：矮茎　（正交 / 反交结果相同）</div>
      </div>`,
    f2: `
      <div class="sv-inner">
        <div class="sv-flow">
          <div class="sv-box tall"><div class="label">F₁ 自交</div><div class="val">Dd × Dd</div></div>
          <span class="sv-arrow">→</span>
          <div class="sv-box highlight"><div class="label">F₂ 共 1064 株</div><div class="val">高 787　矮 277</div></div>
        </div>
        <div class="sv-ratio">高茎 ∶ 矮茎 ≈ 3 ∶ 1</div>
        <div class="sv-note">杂种后代同时出现显、隐性性状 → 性状分离</div>
      </div>`,
    hypothesis: `
      <div class="sv-inner">
        <div class="sv-punnett">
          <div class="ph"></div><div class="ph">D</div><div class="ph">d</div>
          <div class="ph">D</div><div class="cell dom">DD</div><div class="cell dom">Dd</div>
          <div class="ph">d</div><div class="cell dom">Dd</div><div class="cell rec">dd</div>
        </div>
        <div class="sv-ratio">基因型 1∶2∶1 → 表型 3∶1</div>
        <div class="sv-note">成对 · 不融合 · 分离进配子 · 受精随机</div>
      </div>`,
    testcross: `
      <div class="sv-inner">
        <div class="sv-flow">
          <div class="sv-box tall"><div class="label">F₁</div><div class="val">高茎 Dd<br>配子 D∶d=1∶1</div></div>
          <span class="sv-arrow">×</span>
          <div class="sv-box dwarf"><div class="label">隐性纯合</div><div class="val">矮茎 dd<br>配子全 d</div></div>
        </div>
        <div class="sv-ratio">测交后代 ≈ 1 ∶ 1（87∶79 / 166）</div>
        <div class="sv-note">实验结果与预测相符 → 假说得到验证</div>
      </div>`,
    law: `
      <div class="sv-inner">
        <div class="sv-law">
          在生物的<em>体细胞</em>中，控制同一性状的遗传因子<em>成对存在，不相融合</em>；
          在<em>形成配子</em>时，成对的遗传因子发生<em>分离</em>，
          分离后的遗传因子分别进入不同的配子中，随配子遗传给后代。
        </div>
      </div>`,
    'hyp-deduce': `
      <div class="sv-inner">
        <div class="sv-flow">
          <div class="sv-box"><div class="label">假说</div><div class="val">解释<br>已有 3∶1</div></div>
          <span class="sv-arrow">→</span>
          <div class="sv-box highlight"><div class="label">演绎</div><div class="val">预测<br>测交 1∶1</div></div>
          <span class="sv-arrow">→</span>
          <div class="sv-box tall"><div class="label">验证</div><div class="val">实验<br>相符</div></div>
        </div>
        <div class="sv-note">“测交应 1∶1”是演绎预测，不是假说内容</div>
      </div>`,
    scope: `
      <div class="sv-inner">
        <div class="sv-flow">
          <div class="sv-box highlight"><div class="label">遵循</div><div class="val">真核 · 核基因<br>有性生殖</div></div>
          <span class="sv-arrow">≠</span>
          <div class="sv-box dwarf"><div class="label">不遵循</div><div class="val">质基因<br>（线粒体等）</div></div>
        </div>
        <div class="sv-ratio" style="font-size:1.2rem">自交：列举　｜　自由交配：先算配子频率</div>
      </div>`,
    incomplete: `
      <div class="sv-inner">
        <div class="sv-flow">
          <div class="sv-box" style="border-color:#f43f5e"><div class="label">FF</div><div class="val" style="color:#e11d48">卷羽</div></div>
          <div class="sv-box highlight"><div class="label">Ff</div><div class="val">半卷羽</div></div>
          <div class="sv-box dwarf"><div class="label">ff</div><div class="val">片羽</div></div>
        </div>
        <div class="sv-ratio">F₂ 表型 1 ∶ 2 ∶ 1</div>
        <div class="sv-note">不完全显性：杂合为中间型（广东2023 卷羽思想）</div>
      </div>`,
    lethal21: `
      <div class="sv-inner">
        <div class="sv-punnett">
          <div class="ph"></div><div class="ph">A</div><div class="ph">a</div>
          <div class="ph">A</div><div class="cell" style="background:#fee2e2;border-color:#fca5a5;color:#991b1b;text-decoration:line-through">AA</div><div class="cell dom">Aa</div>
          <div class="ph">a</div><div class="cell dom">Aa</div><div class="cell rec">aa</div>
        </div>
        <div class="sv-ratio">存活 Aa ∶ aa = 2 ∶ 1</div>
        <div class="sv-note">显性纯合致死：删掉 AA 格，不再是 3∶1</div>
      </div>`,
    'quiz-bg': `
      <div class="sv-inner">
        <div class="sv-flow">
          <div class="sv-box highlight"><div class="label">做中学</div><div class="val">选一选<br>立刻反馈</div></div>
        </div>
        <div class="sv-note">一轮情境：测交 · 反推 · 配子底座 · 特例辨析</div>
      </div>`,
    'ind-cross': `
      <div class="sv-inner">
        <div class="sv-flow">
          <div class="sv-box" style="border-color:#f59e0b"><div class="label">P</div><div class="val" style="color:#d97706">黄圆<br>YYRR</div></div>
          <span class="sv-arrow">×</span>
          <div class="sv-box" style="border-color:#059669"><div class="label">P</div><div class="val" style="color:#047857">绿皱<br>yyrr</div></div>
          <span class="sv-arrow">→</span>
          <div class="sv-box highlight"><div class="label">F₁</div><div class="val">全黄圆<br>YyRr</div></div>
        </div>
        <div class="sv-note">黄对绿显性 · 圆对皱显性</div>
      </div>`,
    'ind-f2': `
      <div class="sv-inner">
        <div class="sv-ratio">黄圆 ∶ 黄皱 ∶ 绿圆 ∶ 绿皱</div>
        <div class="sv-ratio">9 ∶ 3 ∶ 3 ∶ 1</div>
        <div class="sv-note">= (黄∶绿 = 3∶1) × (圆∶皱 = 3∶1)</div>
      </div>`,
    'ind-hyp': `
      <div class="sv-inner">
        <div class="sv-flow">
          <div class="sv-box highlight"><div class="label">四种配子</div><div class="val">YR Yr<br>yR yr</div></div>
        </div>
        <div class="sv-ratio">1 ∶ 1 ∶ 1 ∶ 1</div>
        <div class="sv-note">等位分离 · 非等位自由组合 · 受精随机</div>
      </div>`,
    'ind-testcross': `
      <div class="sv-inner">
        <div class="sv-flow">
          <div class="sv-box highlight"><div class="label">F₁</div><div class="val">YyRr<br>4 种配子</div></div>
          <span class="sv-arrow">×</span>
          <div class="sv-box dwarf"><div class="label">测交</div><div class="val">yyrr<br>全 yr</div></div>
        </div>
        <div class="sv-ratio">后代 1 ∶ 1 ∶ 1 ∶ 1</div>
        <div class="sv-note">演绎预测 → 实验验证 → 定律成立</div>
      </div>`,
    'ind-law': `
      <div class="sv-inner">
        <div class="sv-law">
          控制不同性状的遗传因子的分离和组合<em>互不干扰</em>；
          在形成配子时，成对的遗传因子分离，不同对的遗传因子<em>自由组合</em>。
          <br/><br/>前提：<em>非同源染色体</em>上的非等位基因。
          <br/>名师点：重组类型不一定 6/16（双显×双隐 → 6/16；单显交叉 → 10/16）。
        </div>
      </div>`,
    'ind-split': `
      <div class="sv-inner">
        <div class="sv-flow">
          <div class="sv-box"><div class="label">Yy</div><div class="val">3∶1</div></div>
          <span class="sv-arrow">×</span>
          <div class="sv-box"><div class="label">Rr</div><div class="val">3∶1</div></div>
          <span class="sv-arrow">=</span>
          <div class="sv-box highlight"><div class="label">YyRr</div><div class="val">9∶3∶3∶1</div></div>
        </div>
        <div class="sv-note">黄皱 = 3/4 × 1/4 = 3/16　｜　多对连乘同理</div>
      </div>`,
    'ind-special': `
      <div class="sv-inner">
        <div class="sv-flow" style="gap:8px">
          <div class="sv-box"><div class="label">隐性上位</div><div class="val" style="font-size:1.1rem">9∶3∶4</div></div>
          <div class="sv-box highlight"><div class="label">有显同型</div><div class="val" style="font-size:1.1rem">15∶1</div></div>
          <div class="sv-box"><div class="label">累加同效</div><div class="val" style="font-size:1.1rem">9∶6∶1</div></div>
        </div>
        <div class="sv-note">先写 9∶3∶3∶1 四格，再按互作合并表型</div>
      </div>`,
  };

  function renderStoryVisual(key, which) {
    const hostId = which === 'ind' ? 'ind-story' : 'seg-story';
    const stageId = which === 'ind' ? 'ind-stage' : 'seg-stage';
    const host = $(hostId);
    const stage = $(stageId);
    if (!host || !stage) return;
    if (!key) {
      host.innerHTML = '';
      host.setAttribute('aria-hidden', 'true');
      stage.classList.remove('story-mode');
      return;
    }
    stage.classList.add('story-mode');
    host.setAttribute('aria-hidden', 'false');
    host.innerHTML = VISUALS[key] || '';
  }

  function renderQuiz(boxId, answeredMap, stepIndex, quiz) {
    const box = $(boxId);
    if (!box) return;
    if (!quiz) {
      box.hidden = true;
      box.innerHTML = '';
      return;
    }
    box.hidden = false;
    const answered = !!answeredMap[stepIndex];
    let html = '<div class="quiz-q">' + quiz.q + '</div><div class="quiz-options">';
    quiz.options.forEach((opt, i) => {
      let cls = 'quiz-opt';
      if (answered) {
        if (opt.ok) cls += ' correct';
        else cls += ' wrong';
      }
      html +=
        '<button type="button" class="' +
        cls +
        '" data-qi="' +
        i +
        '"' +
        (answered ? ' disabled' : '') +
        '>' +
        opt.t +
        '</button>';
    });
    html += '</div>';
    if (answered) {
      html += '<div class="quiz-feedback ok">' + quiz.explain + '</div>';
    }
    box.innerHTML = html;
  }

  function bindQuizClick(boxId, steps, getStep, answeredMap, refresh) {
    $(boxId).addEventListener('click', (e) => {
      const btn = e.target.closest('.quiz-opt');
      if (!btn || btn.disabled) return;
      const stepIndex = getStep();
      const s = steps[stepIndex];
      if (!s || !s.quiz) return;
      const qi = Number(btn.dataset.qi);
      const opt = s.quiz.options[qi];
      answeredMap[stepIndex] = true;
      const box = $(boxId);
      let html = '<div class="quiz-q">' + s.quiz.q + '</div><div class="quiz-options">';
      s.quiz.options.forEach((o, i) => {
        let cls = 'quiz-opt';
        if (o.ok) cls += ' correct';
        else if (i === qi) cls += ' wrong';
        html +=
          '<button type="button" class="' +
          cls +
          '" disabled>' +
          o.t +
          '</button>';
      });
      html += '</div>';
      html +=
        '<div class="quiz-feedback ' +
        (opt.ok ? 'ok' : 'bad') +
        '">' +
        (opt.ok ? '' : '再想想：') +
        s.quiz.explain +
        '</div>';
      box.innerHTML = html;
    });
  }

  function updateSegUI() {
    const s = SEG_STEPS[segStep];
    $('seg-phase').textContent = s.phase;
    $('seg-title').textContent = s.title;
    $('seg-body').innerHTML = s.body;
    $('seg-caption').innerHTML = s.caption;
    $('seg-step-label').textContent = segStep + 1 + ' / ' + SEG_STEPS.length;
    paintPills('seg-pills', segStep);

    $('seg-prev').disabled = segStep === 0;
    const last = segStep === SEG_STEPS.length - 1;
    $('seg-next').disabled = false;
    $('seg-next').textContent = last ? '完成 · 回首页' : '下一步';

    renderStoryVisual(s.visual, 'seg');
    renderQuiz('seg-quiz', quizAnswered, segStep, s.quiz || null);

    if (segScene) {
      if (s.sceneStep != null) {
        segScene.setStep(s.sceneStep, true);
        requestAnimationFrame(() => segScene && segScene.resize());
      }
    }
  }

  function updateIndUI() {
    const s = IND_STEPS[indStep];
    $('ind-phase').textContent = s.phase;
    $('ind-title').textContent = s.title;
    $('ind-body').innerHTML = s.body;
    $('ind-caption').innerHTML = s.caption;
    $('ind-step-label').textContent = indStep + 1 + ' / ' + IND_STEPS.length;
    paintPills('ind-pills', indStep);
    $('ind-prev').disabled = indStep === 0;
    const last = indStep === IND_STEPS.length - 1;
    $('ind-next').disabled = false;
    $('ind-next').textContent = last ? '完成 · 回首页' : '下一步';
    $('ind-poss').style.display = s.showPoss ? 'flex' : 'none';
    $('ind-gametes').style.display = s.showGametes ? 'grid' : 'none';

    renderStoryVisual(s.visual, 'ind');
    renderQuiz('ind-quiz', indQuizAnswered, indStep, s.quiz || null);

    if (indScene) {
      if (s.sceneStep != null) {
        indScene.setStep(s.sceneStep, true);
        requestAnimationFrame(() => indScene && indScene.resize());
      }
      const ori = indScene.getOrientation();
      $('ind-poss').querySelectorAll('button').forEach((b) => {
        b.classList.toggle('active', Number(b.dataset.poss) === ori);
      });
    }
  }

  // ---------- Navigation ----------
  document.querySelectorAll('[data-goto]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.dataset.goto === 'segregation') {
        segStep = 0;
        quizAnswered = {};
      }
      if (btn.dataset.goto === 'independent') {
        indStep = 0;
        indQuizAnswered = {};
      }
      showView(btn.dataset.goto);
    });
  });
  $('btn-home').addEventListener('click', () => showView('home'));

  $('seg-prev').addEventListener('click', () => {
    if (segStep <= 0) return;
    segStep -= 1;
    updateSegUI();
  });
  $('seg-next').addEventListener('click', () => {
    if (segStep >= SEG_STEPS.length - 1) {
      showView('home');
      return;
    }
    segStep += 1;
    updateSegUI();
  });

  $('ind-prev').addEventListener('click', () => {
    if (indStep <= 0) return;
    indStep -= 1;
    updateIndUI();
  });
  $('ind-next').addEventListener('click', () => {
    if (indStep >= IND_STEPS.length - 1) {
      showView('home');
      return;
    }
    indStep += 1;
    updateIndUI();
  });

  $('ind-poss').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-poss]');
    if (!btn || !indScene) return;
    indScene.setOrientation(Number(btn.dataset.poss), true);
    updateIndUI();
  });

  $('seg-pills').addEventListener('click', (e) => {
    const p = e.target.closest('.step-pill');
    if (!p) return;
    segStep = Number(p.dataset.i);
    updateSegUI();
  });
  $('ind-pills').addEventListener('click', (e) => {
    const p = e.target.closest('.step-pill');
    if (!p) return;
    indStep = Number(p.dataset.i);
    updateIndUI();
  });

  bindQuizClick('seg-quiz', SEG_STEPS, () => segStep, quizAnswered, updateSegUI);
  bindQuizClick('ind-quiz', IND_STEPS, () => indStep, indQuizAnswered, updateIndUI);

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

  window.addEventListener('resize', () => {
    if (currentView === 'segregation' && segScene) segScene.resize();
    if (currentView === 'independent' && indScene) indScene.resize();
  });

  function applyHash() {
    const h = (location.hash || '').replace(/^#/, '');
    if (h === 'segregation' || h === 'independent') showView(h);
    else showView('home');
  }
  window.addEventListener('hashchange', applyHash);
  applyHash();
})();

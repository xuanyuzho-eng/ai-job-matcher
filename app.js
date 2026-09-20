const sampleJD = `岗位：AI 产品经理实习生
职责：
1. 参与 AI 工具产品的需求分析、用户调研、竞品分析和原型设计。
2. 与算法、研发、设计团队协作，推动 Prompt 优化和功能迭代。
3. 跟踪用户反馈，评估模型输出质量和产品使用效果。
要求：
1. 熟悉产品经理基本方法，能输出 PRD、流程图和验收标准。
2. 了解大语言模型、Prompt Engineering 或 RAG。
3. 具备数据分析能力，能用数据评估功能效果。
4. 有 AI 工具、SaaS、数据分析或校园项目经验优先。`;

const sampleResume = `某 2027 届理工科应届生，具备产品实习、数据分析和 AI 工具项目经历。
曾在 B 端 SaaS 产品实习中参与登录链路、说明组件和通讯录页面优化，基于用户反馈整理问题清单、竞品参考和原型方案，并跟进上线后反馈变化。
独立完成 HCM 产品竞品分析，拆解多个国内外同类产品的信息架构、核心流程和功能差异，输出功能对比矩阵与产品机会点。
完成城市发展水平数据分析项目，构建多维评价指标体系，使用 TOPSIS、聚类、回归等方法完成评分、分层和趋势判断，并将模型结果转化为策略建议。
熟悉 Python、Excel、PPT、原型设计、PRD 撰写和基础 Prompt Engineering。`;

const taxonomy = [
  {
    key: "product",
    name: "产品方法",
    weight: 30,
    tags: [
      { name: "需求分析", keywords: ["需求", "痛点", "用户调研", "场景", "问题定位"], advice: "补充你如何从用户反馈或业务问题中拆出需求。" },
      { name: "PRD/验收标准", keywords: ["PRD", "需求文档", "验收标准", "功能定义"], advice: "补充 PRD、状态流、边界条件和验收口径。" },
      { name: "原型与流程", keywords: ["原型", "流程图", "交互", "页面", "信息架构"], advice: "补充关键页面、流程图或低保真原型。" },
      { name: "竞品分析", keywords: ["竞品", "功能矩阵", "差异化", "五层", "对比矩阵"], advice: "把竞品拆解结论转成产品机会点。" },
      { name: "用户反馈闭环", keywords: ["用户反馈", "反馈", "工单", "上线", "迭代", "负面反馈"], advice: "补充上线前后反馈变化和复盘动作。" }
    ]
  },
  {
    key: "ai",
    name: "AI 理解",
    weight: 25,
    tags: [
      { name: "LLM 基础", keywords: ["大语言模型", "LLM", "模型", "幻觉", "上下文"], advice: "补充你对模型能力边界和幻觉风险的理解。" },
      { name: "Prompt 设计", keywords: ["Prompt", "提示词", "输出格式", "角色设定", "约束"], advice: "补充 Prompt 结构、约束和输出评估方式。" },
      { name: "RAG/知识库", keywords: ["RAG", "知识库", "检索", "向量", "召回"], advice: "如果岗位重视 RAG，补一个知识库问答小案例。" },
      { name: "模型评估", keywords: ["评估", "准确率", "一致性", "可解释", "输出质量"], advice: "补充模型输出质量评估指标和人工评审规则。" },
      { name: "AI 风控", keywords: ["隐私", "安全", "合规", "敏感信息", "不可编造"], advice: "强调事实约束、隐私脱敏和安全边界。" }
    ]
  },
  {
    key: "data",
    name: "数据能力",
    weight: 20,
    tags: [
      { name: "指标体系", keywords: ["指标", "评分", "权重", "转化率", "效率"], advice: "把业务目标拆成可衡量指标。" },
      { name: "数据分析", keywords: ["数据分析", "Excel", "Python", "SQL", "可视化"], advice: "补充数据来源、处理过程和结论。" },
      { name: "统计建模", keywords: ["回归", "聚类", "TOPSIS", "Lasso", "时间序列", "建模"], advice: "把建模方法和业务解释连接起来。" },
      { name: "实验评估", keywords: ["A/B", "实验", "样本", "对照组", "显著性"], advice: "补充功能效果验证方案。" }
    ]
  },
  {
    key: "business",
    name: "业务理解",
    weight: 15,
    tags: [
      { name: "招聘求职场景", keywords: ["简历", "JD", "岗位", "面试", "投递"], advice: "明确目标用户和投递流程痛点。" },
      { name: "SaaS/HCM", keywords: ["SaaS", "HCM", "HR", "B 端", "人力资源", "同类产品"], advice: "强调 B 端流程、配置复杂度和效率提升。" },
      { name: "校园/学生场景", keywords: ["校园", "学生", "课程", "学校", "应届生"], advice: "把学生用户的求职路径讲清楚。" },
      { name: "金融/投教", keywords: ["金融", "投教", "客户", "市场资料"], advice: "说明你如何把信息整理成用户可理解内容。" }
    ]
  },
  {
    key: "collaboration",
    name: "协作推进",
    weight: 10,
    tags: [
      { name: "跨团队协作", keywords: ["算法", "研发", "设计", "运营", "协作", "沟通"], advice: "补充你和哪些角色协作、如何推进。" },
      { name: "项目管理", keywords: ["排期", "优先级", "里程碑", "风险", "推动"], advice: "补充优先级判断和风险处理。" },
      { name: "汇报表达", keywords: ["报告", "会议", "汇报", "材料", "脚本"], advice: "说明输出文档如何影响决策。" }
    ]
  }
];

const els = {
  jdInput: document.querySelector("#jdInput"),
  resumeInput: document.querySelector("#resumeInput"),
  sampleBtn: document.querySelector("#sampleBtn"),
  clearBtn: document.querySelector("#clearBtn"),
  analyzeBtn: document.querySelector("#analyzeBtn"),
  apiStatus: document.querySelector("#apiStatus"),
  downloadBtn: document.querySelector("#downloadBtn"),
  reportMeta: document.querySelector("#reportMeta"),
  emptyState: document.querySelector("#emptyState"),
  report: document.querySelector("#report"),
  scoreValue: document.querySelector("#scoreValue"),
  scoreLevel: document.querySelector("#scoreLevel"),
  strengthCount: document.querySelector("#strengthCount"),
  gapCount: document.querySelector("#gapCount"),
  riskCount: document.querySelector("#riskCount"),
  dimensionScores: document.querySelector("#dimensionScores"),
  riskList: document.querySelector("#riskList"),
  requiredTags: document.querySelector("#requiredTags"),
  resumeTags: document.querySelector("#resumeTags"),
  gapList: document.querySelector("#gapList"),
  rewriteList: document.querySelector("#rewriteList"),
  questionList: document.querySelector("#questionList")
};

let latestReport = null;
const canUseApi = ["127.0.0.1", "localhost"].includes(window.location.hostname);

function setApiStatus(text, mode = "fallback") {
  els.apiStatus.textContent = text;
  els.apiStatus.classList.toggle("is-live", mode === "live");
  els.apiStatus.classList.toggle("is-fallback", mode === "fallback");
}

function setLoading(isLoading) {
  els.analyzeBtn.disabled = isLoading;
  els.analyzeBtn.classList.toggle("is-loading", isLoading);
  els.analyzeBtn.textContent = isLoading ? "生成中..." : "生成匹配报告";
  els.reportMeta.textContent = isLoading ? "正在调用分析服务" : els.reportMeta.textContent;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function hitCount(text, keywords) {
  const lower = text.toLowerCase();
  return keywords.reduce((count, keyword) => {
    return lower.includes(keyword.toLowerCase()) ? count + 1 : count;
  }, 0);
}

function analyzeTags(jd, resume) {
  return taxonomy.map((dimension) => {
    const tags = dimension.tags.map((tag) => {
      const jdHits = hitCount(jd, tag.keywords);
      const resumeHits = hitCount(resume, tag.keywords);
      return {
        ...tag,
        dimension: dimension.name,
        dimensionKey: dimension.key,
        weight: dimension.weight,
        required: jdHits > 0,
        supported: resumeHits > 0,
        jdHits,
        resumeHits
      };
    });
    return { ...dimension, tags };
  });
}

function scoreDimensions(dimensions) {
  let weighted = 0;
  let activeWeight = 0;

  const scores = dimensions.map((dimension) => {
    const requiredTags = dimension.tags.filter((tag) => tag.required);
    if (!requiredTags.length) {
      return { key: dimension.key, name: dimension.name, score: null, required: 0, matched: 0 };
    }
    const matched = requiredTags.filter((tag) => tag.supported).length;
    const score = Math.round((matched / requiredTags.length) * 100);
    weighted += score * dimension.weight;
    activeWeight += dimension.weight;
    return { key: dimension.key, name: dimension.name, score, required: requiredTags.length, matched };
  });

  return {
    scores,
    total: activeWeight ? Math.round(weighted / activeWeight) : 0
  };
}

function detectRisks(jd, resume, gaps) {
  const combined = `${jd}\n${resume}`;
  const risks = [];
  if (/1[3-9]\d{9}/.test(combined)) {
    risks.push({ level: "critical", text: "检测到手机号，建议上传或展示前脱敏。" });
  }
  if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(combined)) {
    risks.push({ level: "critical", text: "检测到邮箱，作品集演示时建议使用脱敏版本。" });
  }
  if (/\d+%|\d+\s*页|\d+\s*维|\d+\s*城/.test(resume)) {
    risks.push({ level: "normal", text: "检测到量化指标，简历使用前需确认来源和口径。" });
  }
  if (gaps.some((gap) => gap.dimensionKey === "ai")) {
    risks.push({ level: "normal", text: "AI 能力存在缺口，建议用个人 AI 产品项目补充 Prompt、评估和风控证据。" });
  }
  if (resume.length < 80) {
    risks.push({ level: "normal", text: "简历经历较短，系统只能做有限匹配，不建议直接生成强结论。" });
  }
  return risks;
}

function buildRewriteSuggestions(strengths, gaps) {
  const suggestions = [];
  const hasSaas = strengths.some((tag) => tag.name.includes("SaaS") || tag.name.includes("竞品") || tag.name.includes("用户反馈"));
  const hasData = strengths.some((tag) => tag.dimensionKey === "data");
  const needsAi = gaps.some((tag) => tag.dimensionKey === "ai");

  if (hasSaas) {
    suggestions.push({
      title: "B 端 SaaS 产品实习经历",
      status: "可直接使用",
      text: "围绕登录链路、说明组件和通讯录页面的用户效率问题，梳理用户反馈与竞品方案，输出功能优化建议并跟进上线反馈变化。",
      evidence: "基于已有产品实习、竞品分析和反馈闭环描述；未新增个人身份信息。"
    });
  }

  if (hasData) {
    suggestions.push({
      title: "数据建模分析项目",
      status: "可直接使用",
      text: "构建多维评价指标体系，使用 TOPSIS、聚类、Lasso 回归等方法完成城市发展水平评分与趋势判断，并将模型结果转化为策略建议，体现数据驱动决策能力。",
      evidence: "基于已有建模项目事实，不新增未知指标。"
    });
  }

  if (needsAi) {
    suggestions.push({
      title: "AI 产品项目补强",
      status: "需确认",
      text: "补充一个 AI 求职助手个人项目，重点呈现 JD 解析、能力标签映射、Prompt 约束、模型输出评估和隐私风控，弥补 LLM/RAG/模型评估实战不足。",
      evidence: "需要保留真实产物：PRD、流程图、Prompt、测试样例或原型截图。"
    });
  }

  if (!suggestions.length) {
    suggestions.push({
      title: "项目表达整理",
      status: "需确认",
      text: "为每段经历补充背景、任务、行动、结果，并标记所有量化结果来源，避免只有职责描述。",
      evidence: "当前输入缺少可直接映射的项目证据。"
    });
  }

  return suggestions;
}

function buildQuestions(strengths, gaps) {
  const questions = [
    {
      title: "项目深挖",
      text: "你在登录页迭代中是如何定位问题的？用户反馈、数据分析和方案优先级分别如何影响决策？"
    },
    {
      title: "竞品分析",
      text: "你做同类产品竞品分析时，哪些结论能直接转化为本产品的迭代机会？"
    },
    {
      title: "数据能力",
      text: "数据建模项目中，为什么选择 TOPSIS、聚类和回归方法？这些模型结果如何转化为业务建议？"
    },
    {
      title: "AI 产品理解",
      text: "如果让你把这个求职助手接入真实大模型，你会如何设计 Prompt、输出格式和质量评估指标？"
    },
    {
      title: "风险控制",
      text: "AI 改简历容易产生幻觉，你会如何在产品层面避免编造经历和虚假量化指标？"
    }
  ];

  if (gaps.some((tag) => tag.name.includes("RAG"))) {
    questions.push({
      title: "RAG 追问",
      text: "如果岗位要求 RAG，而你当前项目没有实现，你会如何设计一个最小可验证的知识库问答实验？"
    });
  }

  if (strengths.some((tag) => tag.dimensionKey === "collaboration")) {
    questions.push({
      title: "协作推进",
      text: "你如何与研发、设计或业务方对齐需求边界？遇到方案分歧时如何推进？"
    });
  }

  questions.push({
    title: "岗位匹配",
    text: "结合这个 JD，你认为自己最匹配的三项能力是什么？最需要补的一项是什么？"
  });

  return questions;
}

function analyzeLocally(jd, resume, source = "local") {
  const dimensions = analyzeTags(jd, resume);
  const { scores, total } = scoreDimensions(dimensions);
  const allTags = dimensions.flatMap((dimension) => dimension.tags);
  const requiredTags = allTags.filter((tag) => tag.required);
  const resumeTags = allTags.filter((tag) => tag.supported);
  const strengths = requiredTags.filter((tag) => tag.supported);
  const gaps = requiredTags.filter((tag) => !tag.supported);
  const risks = detectRisks(jd, resume, gaps);
  const rewrites = buildRewriteSuggestions(strengths, gaps);
  const questions = buildQuestions(strengths, gaps);

  latestReport = {
    generated_at: new Date().toISOString(),
    total_score: total,
    dimension_scores: scores,
    required_tags: requiredTags.map((tag) => tag.name),
    resume_tags: resumeTags.map((tag) => tag.name),
    strengths: strengths.map((tag) => tag.name),
    gaps: gaps.map((tag) => ({ name: tag.name, advice: tag.advice })),
    risks,
    rewrite_suggestions: rewrites,
    interview_questions: questions
  };

  renderReport(latestReport, { total, scores, requiredTags, resumeTags, strengths, gaps, risks, rewrites, questions, source });
}

async function analyzeWithApi(jd, resume) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jobDescription: jd,
      resumeText: resume
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "API 分析失败。");
  }

  return normalizeApiReport(payload.report, payload.model);
}

function normalizeApiReport(report, model) {
  const scores = report.dimension_scores.map((item) => ({
    key: item.key,
    name: item.name,
    score: item.score,
    required: 1,
    matched: item.score >= 60 ? 1 : 0,
    reason: item.reason
  }));
  const requiredTags = report.jd_tags.map((tag) => ({
    name: tag.name,
    dimension: tag.dimension,
    supported: tag.supported,
    evidence: tag.evidence
  }));
  const resumeTags = report.resume_tags.map((tag) => ({
    name: tag.name,
    dimension: tag.dimension,
    supported: true,
    evidence: tag.evidence
  }));
  const strengths = report.strengths.map((item) => ({
    name: item.name,
    evidence: item.evidence
  }));
  const gaps = report.gaps.map((item) => ({
    name: item.name,
    dimension: item.dimension,
    reason: item.reason,
    advice: item.advice
  }));
  const rewrites = report.rewrite_suggestions;
  const questions = report.interview_questions.map((item) => ({
    title: item.title,
    text: item.answer_guidance ? `${item.text}\n回答方向：${item.answer_guidance}` : item.text
  }));

  latestReport = {
    generated_at: new Date().toISOString(),
    source: "openai",
    model,
    ...report
  };

  return {
    total: report.total_score,
    scores,
    requiredTags,
    resumeTags,
    strengths,
    gaps,
    risks: report.risks,
    rewrites,
    questions,
    source: "openai",
    model
  };
}

async function analyze() {
  const jd = els.jdInput.value.trim();
  const resume = els.resumeInput.value.trim();
  if (!jd || !resume) {
    alert("请先输入岗位 JD 和简历/项目经历。");
    return;
  }

  setLoading(true);
  try {
    if (!canUseApi) {
      setApiStatus("演示模式", "fallback");
      analyzeLocally(jd, resume, "demo");
      return;
    }

    const apiReport = await analyzeWithApi(jd, resume);
    setApiStatus(`真实 LLM：${apiReport.model}`, "live");
    renderReport(latestReport, apiReport);
  } catch (error) {
    setApiStatus("本地规则", "fallback");
    analyzeLocally(jd, resume, "fallback");
    els.reportMeta.textContent = "当前未启用真实 LLM，已使用本地规则生成演示报告。";
  } finally {
    setLoading(false);
  }
}

function scoreLevel(score) {
  if (score >= 80) return "强匹配";
  if (score >= 60) return "可投递，需优化表达";
  if (score >= 40) return "建议补强后投递";
  return "匹配不足";
}

function renderReport(report, view) {
  els.emptyState.classList.add("is-hidden");
  els.report.classList.remove("is-hidden");
  els.downloadBtn.disabled = false;
  if (view.source === "openai") {
    els.reportMeta.textContent = `已由 OpenAI ${view.model} 生成 ${new Date().toLocaleString("zh-CN")}`;
  } else if (view.source === "demo") {
    els.reportMeta.textContent = `已由演示规则生成 ${new Date().toLocaleString("zh-CN")}`;
  } else {
    els.reportMeta.textContent = `已由本地规则生成 ${new Date().toLocaleString("zh-CN")}`;
  }

  els.scoreValue.textContent = `${view.total}`;
  els.scoreLevel.textContent = scoreLevel(view.total);
  els.strengthCount.textContent = view.strengths.length;
  els.gapCount.textContent = view.gaps.length;
  els.riskCount.textContent = view.risks.length;

  els.dimensionScores.innerHTML = view.scores.map((score) => {
    const value = score.score === null ? 0 : score.score;
    const label = score.score === null ? "无要求" : `${score.score}`;
    return `
      <div class="dimension-row">
        <strong>${escapeHtml(score.name)}</strong>
        <div class="bar" aria-label="${escapeHtml(score.name)} ${label}">
          <span style="width:${value}%"></span>
        </div>
        <span>${label}</span>
      </div>
    `;
  }).join("");

  els.riskList.innerHTML = view.risks.length
    ? view.risks.map((risk) => `<span class="risk-chip ${risk.level === "critical" ? "is-critical" : ""}">${escapeHtml(risk.text)}</span>`).join("")
    : `<span class="risk-chip">暂未发现明显隐私或事实风险。</span>`;

  els.requiredTags.innerHTML = view.requiredTags.map((tag) => {
    const matched = tag.supported ? "is-match" : "is-gap";
    return `<span class="tag ${matched}">${escapeHtml(tag.name)}</span>`;
  }).join("");

  els.resumeTags.innerHTML = view.resumeTags.length
    ? view.resumeTags.map((tag) => `<span class="tag is-match">${escapeHtml(tag.name)}</span>`).join("")
    : `<span class="tag is-gap">未识别到明显能力证据</span>`;

  els.gapList.innerHTML = view.gaps.length
    ? view.gaps.map((gap) => `
      <article class="item">
        <header>
          <strong>${escapeHtml(gap.name)}</strong>
          <span class="status-chip needs-check">待补强</span>
        </header>
        <p>${escapeHtml(gap.advice)}</p>
      </article>
    `).join("")
    : `<article class="item"><p>核心 JD 标签均有简历证据支撑，建议继续补充量化结果和面试案例。</p></article>`;

  els.rewriteList.innerHTML = view.rewrites.map((item) => `
    <article class="item">
      <header>
        <strong>${escapeHtml(item.title)}</strong>
        <span class="status-chip ${item.status === "需确认" ? "needs-check" : ""}">${escapeHtml(item.status)}</span>
      </header>
      <p>${escapeHtml(item.text)}</p>
      <p><strong>依据：</strong>${escapeHtml(item.evidence)}</p>
    </article>
  `).join("");

  els.questionList.innerHTML = view.questions.map((item) => `
    <article class="item">
      <header>
        <strong>${escapeHtml(item.title)}</strong>
      </header>
      <p>${escapeHtml(item.text)}</p>
    </article>
  `).join("");
}

function switchTab(tabName) {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.tab === tabName);
  });
  document.querySelectorAll(".tab-view").forEach((panel) => {
    panel.classList.toggle("is-hidden", panel.id !== `tab-${tabName}`);
  });
}

function downloadReport() {
  if (!latestReport) return;
  const blob = new Blob([JSON.stringify(latestReport, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ai-product-job-match-report.json";
  link.click();
  URL.revokeObjectURL(url);
}

els.sampleBtn.addEventListener("click", () => {
  els.jdInput.value = sampleJD;
  els.resumeInput.value = sampleResume;
});

els.clearBtn.addEventListener("click", () => {
  els.jdInput.value = "";
  els.resumeInput.value = "";
  latestReport = null;
  els.report.classList.add("is-hidden");
  els.emptyState.classList.remove("is-hidden");
  els.downloadBtn.disabled = true;
  els.reportMeta.textContent = "等待生成";
});

els.analyzeBtn.addEventListener("click", analyze);
els.downloadBtn.addEventListener("click", downloadReport);

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => switchTab(tab.dataset.tab));
});

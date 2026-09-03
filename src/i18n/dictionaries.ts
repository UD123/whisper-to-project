export type Lang = "en" | "zh";

export const en = {
  langName: "English",
  nav: {
    links: [
      { label: "Technology", href: "#technology" },
      { label: "Applications", href: "#use-cases" },
      { label: "Workflow", href: "#workflow" },
      { label: "Ecosystem", href: "#ecosystem" },
      { label: "Specs", href: "#specs" },
      { label: "Catalog", href: "#objects" },
      { label: "About", href: "#about" },
      { label: "FAQ", href: "#faq" },
    ],
    live: "Live 6DOF",
    docs: "Developer Docs",
    demo: "Request Demo",
    language: "Language",
  },
  hero: {
    badge: "Deeptech · Industrial Computer Vision",
    title: "3D Vision Simplified: 6DOF Object Pose Estimation via Standard 2D RGB",
    subtitle:
      "Transform any standard camera into a 3D measurement device. Detect exact 3D coordinates (X, Y, Z, Rx, Ry, Rz) under 30 ms without expensive, noisy 3D LiDAR or stereo sensors.",
    ctaPrimary: "Schedule Technical Demo",
    ctaSecondary: "Explore Specifications",
    stats: [
      ["Speed", "< 30 ms", "1 MPix · GPU"],
      ["Precision", "Sub-millimeter", "translation + rotation"],
      ["Cost", "Up to 80% lower", "vs 3D scanners"],
      ["Footprint", "Global", "Korea • Poland • China • Japan"],
    ] as [string, string, string][],
    viewport: "CAM_01 · RGB stream · 1080P",
    live: "live",
  },
  trust: [
    { value: "5+", label: "Active Industrial Pilots", sub: "Production environments" },
    { value: "< 30 ms", label: "Latency", sub: "NVIDIA GPU accelerated" },
    { value: "Global", label: "Deployment", sub: "China · Japan · Singapore" },
  ],
  technology: {
    eyebrow: "01 — Technology",
    title: "Comparison: Traditional 3D Vision vs. RobotAI",
    subtitle:
      "A direct comparison across the five most critical dimensions for production-grade robotic vision.",
    legacyTitle: "Traditional 3D Vision & LiDAR",
    modernTitle: "RobotAI 2D RGB Engine",
    rows: [
      {
        dimension: "Hardware Cost & CapEx",
        legacy: "Expensive industrial 3D sensors, LIDARs, and high-end processing servers.",
        modern:
          "Cost-Efficient Setup — works with standard RGB cameras (including compact USB options) and standard industrial PCs.",
      },
      {
        dimension: "Surface & Material Limitations",
        legacy:
          "Complete failure or severe noise on polished metal, reflective bolts, and translucent parts.",
        modern:
          "Material Agnostic — seamlessly handles shiny, reflective, and multi-texture parts without issues.",
      },
      {
        dimension: "Shadows, Edges & Occlusions",
        legacy:
          "Dense error margins on sharp contours and dead zones caused by active light emitters.",
        modern:
          "Direct 6DOF Output — instant XYZ and rotation vectors utilizing clear RGB contrast and visual edges.",
      },
      {
        dimension: "Setup Flexibility & Range",
        legacy: "Inflexible working distances and rigid calibration ranges.",
        modern:
          "Total Setup Flexibility — adjustable camera-to-object distances and compact footprint.",
      },
      {
        dimension: "Processing Overhead",
        legacy:
          "Heavy performance bottlenecks requiring complex point cloud segmentation algorithms.",
        modern:
          "Sub-30 ms Inference — lightweight processing delivering fast coordinates without point cloud overhead.",
      },
    ],
  },
  applications: {
    eyebrow: "02 — Applications",
    title: "Field-Proven Industrial Applications",
    subtitle:
      "Solving the “pick and place” problem where object positions and orientations are never fixed.",
    items: {
      bin_picking: {
        title: "Random Bin Picking",
        desc: "Small parts, reflective bolts, chaotic orientation in deep bins.",
      },
      machine_tending: {
        title: "Machine Tending",
        desc: "Exact positioning, CNC loading/unloading, press operation.",
      },
      object_localization: {
        title: "Single & Multiple Object 3D Localization",
        desc: "Polished metal, translucent plastic, small bolts, laminated items.",
      },
      palletizing: {
        title: "Palletizing & Depalletizing",
        desc: "Carton boxes, 4-object piles, dynamic warehouse logistics.",
      },
      assembly: {
        title: "Precise Positioning & Assembly",
        desc: "Connector insertion, electronic board alignment, trajectory tracking.",
      },
      agv_docking: {
        title: "AGV, Forklift & Pallet Docking",
        desc: "Pallet relative positioning under varying load conditions.",
      },
      agritech: {
        title: "AgriTech / Special Applications",
        desc: "Mushroom growth analysis, leaf detection, flower cutting point estimation.",
      },
    },
    ctaEyebrow: "Your part",
    ctaTitle: "Not on the list? Send us your component.",
    ctaDesc:
      "We run a pose-estimation evaluation on your own geometry and surface — reflective, translucent or deformable.",
    ctaButton: "Request Evaluation",
  },
  workflow: {
    eyebrow: "03 — Workflow",
    title: "3-Step Deployment Workflow",
    subtitle: "Connect any camera and industrial robot arm in 3 simple steps.",
    steps: [
      {
        n: "01",
        title: "Object Scanning",
        desc: "Scan your object from different positions and angles using a single RGB camera.",
      },
      {
        n: "02",
        title: "Model Generation",
        desc: "Annotate recorded image data and build the single AI object model.",
      },
      {
        n: "03",
        title: "Position Estimation",
        desc: "Real-time pose estimation detecting objects and streaming 6DOF vectors to the robot.",
      },
    ],
    mediaLabel: "OBJECT SCANNING · STEP 01/03",
    suiteEyebrow: "03.1 — Software suite",
    suiteTitle: "Modular Software Suite",
    modules: [
      {
        id: "MODULE 1",
        name: "Pose6D Data Acquisition & Calibration",
        platform: "Windows / Linux standalone application",
        fns: [
          "Camera connection",
          "Scan data acquisition",
          "Automated camera calibration",
          "Robot-Camera hand-eye calibration",
        ],
      },
      {
        id: "MODULE 2",
        name: "Label6D AI Object Modeler",
        platform: "Windows / Cloud application",
        fns: [
          "Simplified user data annotation",
          "AI model generation",
          "Standalone software or fully managed service",
        ],
      },
      {
        id: "MODULE 3",
        name: "Pose6D Runtime Engine",
        platform: "Windows / Linux high-performance application",
        fns: [
          "Live stream acquisition",
          "Real-time object 6DOF pose computation",
          "Direct industrial protocol output",
        ],
      },
    ],
  },
  ecosystem: {
    eyebrow: "04 — Ecosystem",
    title: "Universal Hardware & Protocol Compatibility",
    subtitle:
      "Zero vendor lock-in. Seamless integration with your existing industrial computer and robotic fleet.",
    groups: [
      "Camera interfaces",
      "Robot brands",
      "Communication protocols",
      "Computing hardware",
    ],
    computing: ["Windows industrial PC", "Linux industrial PC", "NVIDIA GPU (sub-30 ms)"],
    cameraExtra: ["Miniature USB RGB"],
  },
  specs: {
    eyebrow: "05 — Specifications",
    title: "Technical Specifications",
    subtitle: "Production-ready performance metrics for integration planning.",
    rows: [
      ["Inference Speed", "Sub-30 ms (NVIDIA GPU accelerated)"],
      ["Output Data", "Direct 6DOF Vector (XYZ + RxRyRz)"],
      [
        "Camera Compatibility",
        "Standard RGB, Industrial Cameras (Basler, IDS, Balluff, RealSense, USB RGB)",
      ],
      ["Supported Protocols", "TCP/IP, MODBUS, REST API, ROS, ROS2"],
      ["Robot Integration", "Universal Robots, Fanuc, Kuka, ABB, Yaskawa, and more."],
    ] as [string, string][],
  },
  catalog: {
    eyebrow: "06 — Catalog",
    title: "Trained Object Capability Catalog",
    subtitle: "Proven 3D pose detection across diverse geometry and surface physics.",
    categories: [
      {
        label: "Components & metal",
        items: [
          "Covers",
          "Rings",
          "Bolts",
          "Reflective knobs",
          "Metal housings",
          "Profiles",
          "Plates",
          "Connectors",
          "Flanges",
          "Tools",
        ],
      },
      {
        label: "Containers & packaging",
        items: ["Carton boxes", "Single boxes", "Packages", "Bottles", "Cups", "Trays", "Cases"],
      },
      {
        label: "Electronics & tech",
        items: ["Electronic boards", "PCB assemblies", "Phone housings", "Instruments"],
      },
      {
        label: "Complex materials",
        items: [
          "Reflective parts",
          "Translucent plastic",
          "Shiny polished metal",
          "Cloth / textiles",
          "Hangers",
        ],
      },
      {
        label: "Agri & organic",
        items: ["Agri Produce", "Mushrooms", "Leaves & flowers"],
      },
    ],
  },
  about: {
    eyebrow: "07 — About",
    title: "About RobotAI",
    body: "We are a deep-tech software company disrupting industrial automation. By replacing complex, expensive 3D hardware and lidars with high-performance RGB-based vision algorithms, we empower robotic systems with instant, material-agnostic 6DOF perception at a fraction of traditional costs.",
  },
  faq: {
    eyebrow: "08 — FAQ",
    title: "B2B FAQ",
    subtitle: "Common questions from engineering and procurement teams.",
    items: [
      {
        q: "Do we need to buy expensive new cameras or LIDARs?",
        a: "No. RobotAI is hardware-agnostic and works with standard industrial or compact USB RGB cameras you might already have.",
      },
      {
        q: "How long does integration take?",
        a: "Integration typically takes only a few days using standard industrial protocols (ROS, ROS2, Modbus, TCP/IP).",
      },
      {
        q: "How does the custom part evaluation work?",
        a: "You submit your part geometry and application type through our form. Our engine runs a pose-estimation evaluation on your specific components and we report back with the accuracy and performance metrics.",
      },
      {
        q: "What hardware is required for processing?",
        a: "Standard Windows or Linux industrial PCs equipped with an NVIDIA GPU for sub-30 ms inference.",
      },
    ],
  },
  demo: {
    eyebrow: "09 — Evaluation",
    title: "Test RobotAI with Your Manufacturing Parts",
    subtitle:
      "Send us your part geometry and application. We return a pose-estimation evaluation on your own components.",
    name: "Name",
    namePlaceholder: "Jane Kaplan",
    email: "Work Email",
    emailPlaceholder: "jane@factory.com",
    company: "Company",
    companyPlaceholder: "Precision Metal Works",
    application: "Application Type",
    applicationPlaceholder: "Select application",
    options: ["Bin Picking", "Machine Tending", "Assembly", "Other"],
    submit: "Request Custom Evaluation",
    submitted: "Request Sent ✓",
    toastTitle: "Request received",
    toastDesc: "Our engineering team replies within one business day.",
  },
  footer: {
    ctaTitle: "Ready to Upgrade Your Robotic Vision?",
    ctaPrimary: "Book a Demo",
    ctaSecondary: "Watch Real Technical Demos on YouTube (@sensor3d)",
    tagline:
      "6DOF object pose estimation from standard 2D RGB cameras. Built for industrial automation teams.",
    presence: "RobotAI Ltd. | Global presence: Korea • Poland • China • Japan",
    links: ["Usage Agreement", "Terms of Use", "Privacy Policy", "LinkedIn Profile"],
    rights: "© 2025-2026 RobotAI Ltd. All rights reserved.",
  },
};

export type Dict = typeof en;

export const zh: Dict = {
  langName: "简体中文",
  nav: {
    links: [
      { label: "技术", href: "#technology" },
      { label: "应用场景", href: "#use-cases" },
      { label: "工作流程", href: "#workflow" },
      { label: "生态兼容", href: "#ecosystem" },
      { label: "技术参数", href: "#specs" },
      { label: "物体目录", href: "#objects" },
      { label: "关于我们", href: "#about" },
      { label: "常见问题", href: "#faq" },
    ],
    live: "实时 6DOF",
    docs: "开发者文档",
    demo: "预约演示",
    language: "语言",
  },
  hero: {
    badge: "深科技 · 工业机器视觉",
    title: "简化 3D 视觉：基于标准 2D RGB 的 6DOF 物体位姿估计",
    subtitle:
      "将任意标准相机转变为 3D 测量设备，在 30 毫秒内输出精确的三维坐标（X、Y、Z、Rx、Ry、Rz），无需昂贵且噪声大的 3D 激光雷达或立体传感器。",
    ctaPrimary: "预约技术演示",
    ctaSecondary: "查看技术参数",
    stats: [
      ["速度", "< 30 毫秒", "1 MPix · GPU"],
      ["精度", "亚毫米级", "平移 + 旋转"],
      ["成本", "最高降低 80%", "相比传统 3D 扫描仪"],
      ["业务覆盖", "全球化", "韩国 • 波兰 • 中国 • 日本"],
    ],
    viewport: "CAM_01 · RGB 视频流 · 1080P",
    live: "实时",
  },
  trust: [
    { value: "5+", label: "在运工业试点项目", sub: "真实生产环境" },
    { value: "< 30 毫秒", label: "延迟", sub: "NVIDIA GPU 加速" },
    { value: "全球", label: "部署", sub: "中国 · 日本 · 新加坡" },
  ],
  technology: {
    eyebrow: "01 — 技术",
    title: "对比：传统 3D 视觉 vs. RobotAI",
    subtitle: "从五个对量产级机器人视觉最关键的维度进行直接对比。",
    legacyTitle: "传统 3D 视觉与激光雷达",
    modernTitle: "RobotAI 2D RGB 引擎",
    rows: [
      {
        dimension: "硬件成本与资本支出",
        legacy: "需要昂贵的工业 3D 传感器、激光雷达和高端处理服务器。",
        modern: "高性价比 —— 支持标准 RGB 相机（含微型 USB 相机）与通用工业电脑。",
      },
      {
        dimension: "表面与材质限制",
        legacy: "在抛光金属、高反光螺栓与半透明零件上极易失效或产生严重噪声。",
        modern: "不受材质限制 —— 可稳定识别高反光、镜面及多纹理零件。",
      },
      {
        dimension: "阴影、边缘与遮挡",
        legacy: "在锐利边缘处误差较大，且主动光源易产生视觉盲区。",
        modern: "直接输出 6DOF 姿态 —— 基于高对比度 RGB 图像与边缘特征，实时提取 XYZ 及旋转向量。",
      },
      {
        dimension: "部署灵活性与工作距离",
        legacy: "工作距离受限，标定缺乏弹性。",
        modern: "完全灵活部署 —— 相机与物体距离可调，占用空间小。",
      },
      {
        dimension: "算力开销",
        legacy: "性能瓶颈严重，依赖复杂的点云分割算法。",
        modern: "30 毫秒内完成推理 —— 算法轻量化，无需高算力点云处理即可实时获取坐标。",
      },
    ],
  },
  applications: {
    eyebrow: "02 — 应用场景",
    title: "经现场验证的工业应用",
    subtitle: "精准解决目标位置与朝向不固定时的「抓取与放置」难题。",
    items: {
      bin_picking: {
        title: "无序料箱抓取",
        desc: "深箱内散乱堆叠的小零件及高反光螺栓识别。",
      },
      machine_tending: {
        title: "机床上下料",
        desc: "高精度定位，适用于 CNC 机床上下料与冲压自动化。",
      },
      object_localization: {
        title: "单个与多个物体 3D 定位",
        desc: "适用于抛光金属、半透明塑料、微型螺栓及覆膜工件。",
      },
      palletizing: {
        title: "码垛与拆垛",
        desc: "纸箱与多物料堆叠，适配动态仓储物流场景。",
      },
      assembly: {
        title: "精密定位与装配",
        desc: "连接器插接、PCB 板定位与精细装配轨迹控制。",
      },
      agv_docking: {
        title: "AGV、叉车与托盘对接",
        desc: "支持不同载荷条件下的托盘精准相对定位。",
      },
      agritech: {
        title: "农业科技 / 特殊应用",
        desc: "农作物生长监测、叶片特征识别与农业自动化。",
      },
    },
    ctaEyebrow: "您的零件",
    ctaTitle: "未找到您的零件类型？欢迎寄样测试。",
    ctaDesc: "我们将针对您的特定几何形状与材质（反光、半透明或易变形件）提供专门的位姿估计评估报告。",
    ctaButton: "申请免费评估",
  },
  workflow: {
    eyebrow: "03 — 工作流程",
    title: "三步部署流程",
    subtitle: "仅需简单三步，即可轻松接入任意工业相机与机械臂。",
    steps: [
      {
        n: "01",
        title: "物体扫描",
        desc: "使用单台 RGB 相机从多角度采集目标物体图像。",
      },
      {
        n: "02",
        title: "模型生成",
        desc: "对采集的图像数据进行标注，生成统一的 AI 物体模型。",
      },
      {
        n: "03",
        title: "位姿估计",
        desc: "实时识别目标物体，并向机器人实时传输 6DOF 姿态数据。",
      },
    ],
    mediaLabel: "物体扫描 · 步骤 01/02",
    suiteEyebrow: "03.1 — 软件套件",
    suiteTitle: "模块化软件套件",
    modules: [
      {
        id: "模块 1",
        name: "Pose6D 数据采集与标定",
        platform: "Windows / Linux 独立应用",
        fns: ["相机连接", "扫描数据采集", "自动相机标定", "机器人-相机手眼标定"],
      },
      {
        id: "模块 2",
        name: "Label6D AI 物体建模器",
        platform: "Windows / 云端应用",
        fns: ["简化的数据标注", "AI 模型生成", "可独立部署或全托管服务"],
      },
      {
        id: "模块 3",
        name: "Pose6D 运行引擎",
        platform: "Windows / Linux 高性能应用",
        fns: ["实时视频流采集", "实时 6DOF 位姿计算", "直连工业协议输出"],
      },
    ],
  },
  ecosystem: {
    eyebrow: "04 — 生态兼容",
    title: "通用硬件与协议兼容性",
    subtitle: "无厂商绑定，可与您现有的工业电脑和机器人产线无缝集成。",
    groups: ["相机接口", "机器人品牌", "通信协议", "算力硬件"],
    computing: ["Windows 工业电脑", "Linux 工业电脑", "NVIDIA GPU（30 毫秒内）"],
    cameraExtra: ["微型 USB RGB 相机"],
  },
  specs: {
    eyebrow: "05 — 技术参数",
    title: "技术规格",
    subtitle: "面向集成规划的量产级性能指标。",
    rows: [
      ["推理速度", "30 毫秒以内（NVIDIA GPU 加速）"],
      ["输出数据", "直接输出 6DOF 向量（XYZ + RxRyRz）"],
      ["相机兼容性", "标准 RGB 与工业相机（Basler、IDS、Balluff、RealSense、USB RGB）"],
      ["支持协议", "TCP/IP、MODBUS、REST API、ROS、ROS2"],
      ["机器人集成", "Universal Robots、Fanuc、Kuka、ABB、Yaskawa 等。"],
    ],
  },
  catalog: {
    eyebrow: "06 — 物体目录",
    title: "已训练物体能力目录",
    subtitle: "在多样几何形状与表面物理特性上验证过的 3D 位姿检测能力。",
    categories: [
      {
        label: "零部件与金属件",
        items: [
          "盖板",
          "环件",
          "螺栓",
          "反光旋钮",
          "金属外壳",
          "型材",
          "板件",
          "连接器",
          "法兰",
          "工具",
        ],
      },
      {
        label: "容器与包装",
        items: ["纸箱", "单件箱体", "包裹", "瓶子", "杯子", "托盘", "箱包"],
      },
      {
        label: "电子与科技产品",
        items: ["电路板", "PCB 组件", "手机外壳", "仪器仪表"],
      },
      {
        label: "复杂材质",
        items: ["反光零件", "半透明塑料", "高亮抛光金属", "布料 / 纺织品", "衣架"],
      },
      {
        label: "农业与有机物",
        items: ["农产品", "蘑菇", "叶片与花卉"],
      },
    ],
  },
  about: {
    eyebrow: "07 — 关于我们",
    title: "关于 RobotAI",
    body: "我们是一家重塑工业自动化的深科技软件公司。通过高性能 RGB 视觉算法，我们为复杂昂贵的 3D 硬件与激光雷达提供高效替代路径，以远低于传统方案的成本，为机器人系统带来快速、不受工件材质约束的 6DOF 感知能力。",
  },
  faq: {
    eyebrow: "08 — 常见问题",
    title: "B2B 常见问题",
    subtitle: "来自工程与采购团队的高频问题。",
    items: [
      {
        q: "我们需要购买昂贵的新相机或激光雷达吗？",
        a: "不需要。RobotAI 与硬件无关，可直接使用您现有的标准工业相机或微型 USB RGB 相机。",
      },
      {
        q: "集成需要多长时间？",
        a: "使用标准工业协议（ROS、ROS2、Modbus、TCP/IP），集成通常只需要几天时间。",
      },
      {
        q: "定制零件评测流程是怎样的？",
        a: "您通过表单提交零件几何信息与应用类型，我们的引擎会针对您的具体零件运行位姿估计评测，并反馈精度与性能指标。",
      },
      {
        q: "处理端需要什么硬件？",
        a: "标准 Windows 或 Linux 工业电脑，配备 NVIDIA GPU 即可实现 30 毫秒以内的推理。",
      },
    ],
  },
  demo: {
    eyebrow: "09 — 评测",
    title: "用您的生产零件测试 RobotAI",
    subtitle: "把零件几何信息与应用场景发给我们，我们会返回针对您自己零件的位姿估计评测。",
    name: "姓名",
    namePlaceholder: "张伟",
    email: "企业邮箱",
    emailPlaceholder: "name@factory.com",
    company: "公司名称",
    companyPlaceholder: "精密金属制造有限公司",
    application: "应用类型",
    applicationPlaceholder: "请选择应用类型",
    options: ["无序料箱抓取", "机床上下料", "装配", "其他"],
    submit: "申请定制评测",
    submitted: "已提交 ✓",
    toastTitle: "已收到您的申请",
    toastDesc: "我们的工程团队将在一个工作日内回复。",
  },
  footer: {
    ctaTitle: "准备好升级您的机器人视觉了吗？",
    ctaPrimary: "预约演示",
    ctaSecondary: "在 YouTube 观看真实技术演示（@sensor3d）",
    tagline: "基于标准 2D RGB 相机的 6DOF 物体位姿估计，为工业自动化团队打造。",
    presence: "RobotAI Ltd. | 全球布局：韩国 • 波兰 • 中国 • 日本",
    links: ["使用协议", "服务条款", "隐私政策", "LinkedIn 主页"],
    rights: "© 2025-2026 RobotAI Ltd. 保留所有权利。",
  },
};

export const dictionaries: Record<Lang, Dict> = { en, zh };

import type { Guide, GuideStep } from "./guide";

/** Simplified Chinese version of the Pose6D getting-started guide. */
export const guideZh: Guide = {
  meta: {
    eyebrow: "技术文档",
    title: "Pose6D — 快速入门",
    subtitle: "3D 位姿估计的主要步骤：从软件安装到机器人实际取放。",
    download: "下载完整手册（PDF）",
  },

  instructions: {
    title: "操作说明",
    expand: "展开全部",
    collapse: "收起全部",
  },

  overview: {

    title: "概述",
    body: [
      "本页介绍使用 Pose6D 完成 6DOF 位姿估计的主要步骤，是完整手册的精简版本，所有参数均与完整文档一致。",
      "如需最新版完整手册，可随时向 RobotAI 索取。开始所需的全部内容都在本页，无需查阅任何外部文档。",
    ],
  },

  steps: {
    eyebrow: "共 11 步",
    title: "单一工件位姿估计的主要步骤",
    subtitle: "共十一个步骤。点击任一步骤可跳转至对应说明。",
    items: [
      {
        n: "01",
        title: "获取软件",
        detail: "下载免费的 POC 版本（仅 CPU）及其配套文档。",
        href: "#get-software",
      },
      {
        n: "02",
        title: "硬件要求与软件安装",
        detail: "准备工控机，安装 Pose6D，并使用随附的 USB 测试数据进行验证。",
        href: "#installation",
      },
      {
        n: "03",
        title: "确定现场配置",
        detail: "确定相机、工作距离以及工件在图像中的成像尺寸。",
        href: "#optics",
      },
      {
        n: "04",
        title: "采集图像数据",
        detail: "按照现场配置，从不同位置拍摄工件。",
        href: "#scanning",
      },
      {
        n: "05",
        title: "相机标定",
        detail: "使用打印的棋盘格标定板执行标定流程。",
        href: "#calibration",
      },
      {
        n: "06",
        title: "提供工件尺寸",
        detail: "测量工件并提供其真实尺寸信息。",
        href: "#measurements",
      },
      {
        n: "07",
        title: "上传工件数据",
        detail: "将图像、标定数据与尺寸数据发送给 RobotAI。",
        href: "#upload-data",
      },
      {
        n: "08",
        title: "RobotAI 生成模型",
        detail: "我们为您的工件训练模型，并将结果返回给您。",
        href: "#model",
      },
      {
        n: "09",
        title: "测试检测效果",
        detail: "按照 USB 示例模型相同的步骤验证检测结果。",
        href: "#test-detection",
      },
      {
        n: "10",
        title: "手眼标定",
        detail: "将检测结果转换到机器人坐标系中。",
        href: "#robot-calibration",
      },
      {
        n: "11",
        title: "机器人通信",
        detail: "将输出接入机器人控制器，通信接口灵活可配。",
        href: "#communication",
      },
    ] as GuideStep[],
    soon: "由 RobotAI 完成",
  },

  video: {
    eyebrow: "视频指南",
    title: "如何启动 Pose6D 并用 USB 工件进行测试",
    subtitle: "完整演示软件安装与首次检测运行的全过程。",
    label: "POSE6D · USB 快速上手",
    key: "usb-quickstart",
  },

  getSoftware: {
    eyebrow: "01 — 获取软件",
    title: "下载免费 POC 版本",
    subtitle: "概念验证版本免费提供，仅支持 CPU 运行 —— 无需 GPU。",
    bullets: [
      "Pose6D POC 版本（仅 CPU），适用于 Windows 10",
      "配套文档 —— 本页面即为简明版",
      "用于验证安装的 usb_test 示例数据（见第 02 节）",
    ],
    hint: "下载链接与 usb_test 压缩包由 RobotAI 按需提供给用户。",
    cta: "索取下载链接",
  },

  installation: {
    eyebrow: "02 — 硬件与软件安装",
    title: "约 15 分钟完成 Pose6D 安装与验证",
    subtitle: "本节内容均针对运行于 Windows 10 的免费 POC 版本（仅 CPU）。",
    requirementsTitle: "运行要求",
    requirements: [
      { k: "操作系统", v: "Windows 10", note: "POC 版本仅支持 Windows" },
      { k: "内存", v: "最低 8 GB", note: "内存越大，加载速度越快" },
      { k: "显卡", v: "无需 GPU", note: "CPU 版本运行速度低于 GPU 版本" },
      { k: "CUDA", v: "个别情况需要", note: "参见手册的故障排查章节" },
      {
        k: "相机驱动",
        v: "Windows 10 自带 USB 驱动",
        note: "其他相机需定制适配，请联系 RobotAI",
      },
    ],
    callout: {
      label: "重要提示",
      text: "在设计现场配置与选择相机时，工件在图像中至少应覆盖 250 × 250 像素，才能获得准确结果。",
    },
    diagramLabel: "安装示例 · 相机 → 工控机 → 机器人控制器",
    diagramCaption: "相机、RobotAI 工控机与机器人控制器之间的一种连接方式。",

    installTitle: "软件安装",
    installSteps: [
      {
        title: "下载安装包",
        body: "将 Pose6D-XXXX-cpu.exe 保存到计算机的文件夹中，XXXX 表示版本号。",
        path: "C:\\RobotAI\\SW",
        file: "Pose6D-XXXX-cpu.exe",
      },
      {
        title: "创建工件目录",
        body: "该文件夹用于存放您使用的所有工件数据。",
        path: "C:\\RobotAI\\Parts",
      },
      {
        title: "下载测试数据",
        body: "获取 usb_test.zip —— 用于验证安装的参考工件数据。",
        file: "usb_test.zip",
      },
      {
        title: "解压到工件目录",
        body: "解压后应得到一个 usb_test 文件夹，其结构如下。",
        path: "C:\\RobotAI\\Parts\\usb_test",
      },
    ],
    fileSoon: "如需请联系索取",
    structureLabel: "usb_test · 文件夹结构",
    structure: [
      { k: "cameras", v: "相机接口与参数" },
      { k: "labels", v: "用于模型训练的标注数据" },
      { k: "models", v: "运行时模型" },
      { k: "robots", v: "机器人接口与参数" },
      { k: "videos", v: "训练用采集数据" },
    ],

    verificationEyebrow: "第 02 节 · 第 2 部分（共 2 部分）",
    verificationTitle: "软件验证",
    verificationSubtitle: "两项检查：先使用随附的录制数据，再使用您自己的相机。",
    tabs: [
      {
        id: "recorded",
        name: "使用随附 USB 数据",
        intro: "该步骤用于确认安装本身是否正确，仅使用随软件提供的文件。",
        steps: [
          {
            body: "双击可执行文件运行软件。在 CPU 模式下加载需要一定时间。",
            path: "C:\\RobotAI\\SW\\Pose6D-XXXX-cpu.exe",
          },
          {
            body: "选择工作项目目录，并选中 usb_test。",
            menu: ["Project", "Select Object Directory"],
          },
          {
            body: "窗口保持白色并提示 “Config is OK”。",
            menu: ["Project", "Check Config File"],
          },
          {
            body: "选择 usb_test 视频目录中的 mp4 文件，将打开显示 USB 工件影像的窗口。",
            menu: ["Detect", "Run Video from File"],
            path: "C:\\RobotAI\\Parts\\usb_test\\videos",
          },
          {
            body: "按 q 键停止。如果视频播放流畅快速，说明安装成功。",
            result: true,
          },
        ],
      },
      {
        id: "own",
        name: "使用您自己的 USB 相机",
        intro:
          "该步骤演示在笔记本或 USB 相机上的检测效果。由于模型并不了解您的相机与光照条件，结果可靠性较低。可在工件后方放置一张白纸以改善背景干扰。",
        steps: [
          {
            body: "运行软件并等待主窗口出现。",
            path: "C:\\RobotAI\\SW\\Pose6D-XXXX-cpu.exe",
          },
          {
            body: "选择 usb_test 作为工作项目目录。",
            menu: ["Project", "Select Object Directory"],
          },
          {
            body: "必须出现 “Config is OK” 提示。",
            menu: ["Project", "Check Config File"],
          },
          {
            body: "根据您的计算机选择 Webcam 0 或 Webcam 1。",
            menu: ["Camera", "Select from List"],
          },
          { body: "相机随即被激活。", menu: ["Camera", "Connect"] },
          {
            body: "选择 320×240。若相机不支持该分辨率，可另选一个，或在 “Custom” 中手动输入。使用 320×240 以外的分辨率会降低检测可靠性。",
            menu: ["Camera", "Configure", "Resolution"],
          },
          {
            body: "将出现一个实时小窗口。请保持工件后方的白纸。",
            menu: ["Detect", "Run Video from Camera"],
          },
          { body: "按 q 键停止。", result: true },
        ],
      },
    ],
    dialogLabel: "PROJECT · SELECT OBJECT DIRECTORY",
    dialogCaption: "选择 usb_test 项目目录。",
  },

  downloads: {
    eyebrow: "文件",
    title: "文档下载",
    subtitle: "可在线打开或下载，全部文件均由本站提供。",
    items: [
      { id: "manual", name: "Pose6D — 用户手册（POC）", note: "完整手册，版本 0919" },
      { id: "checkerboard", name: "棋盘格标定图案", note: "请按 100% 比例打印，勿使用适应页面缩放" },
    ],
    open: "打开",
    close: "关闭",
    download: "下载",
  },

  nav: [
    { id: "overview", label: "概述" },
    { id: "main-steps", label: "主要步骤" },
    { id: "video", label: "视频指南" },
    { id: "get-software", label: "01 — 获取软件" },
    { id: "installation", label: "02 — 安装" },
    { id: "verification", label: "验证", sub: true },
    { id: "optics", label: "03 — 相机与光学" },
    { id: "scanning", label: "04 — 工件扫描" },
    { id: "calibration", label: "05 — 相机标定" },
    { id: "measurements", label: "06 — 工件测量" },
    { id: "upload-data", label: "07 — 上传数据" },
    { id: "model", label: "08 — 模型交付" },
    { id: "test-detection", label: "09 — 检测测试" },
    { id: "robot-calibration", label: "10 — 相机–机器人标定" },
    { id: "communication", label: "11 — 机器人通信" },
    { id: "downloads", label: "文档下载" },
  ],

  help: {
    title: "遇到问题？",
    body: "请把步骤编号和截图发给我们，我们会直接告诉您需要修改的具体设置。",
    cta: "联系 RobotAI",
  },
};

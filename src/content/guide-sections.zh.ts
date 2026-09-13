import type { GuideSection } from "./guide-sections";

/** Simplified Chinese version of sections 03–11. */
export const guideSectionsZh: GuideSection[] = [
  {
    id: "optics",
    n: "03",
    title: "相机与光学配置",
    summary: "选择相机、镜头与工作距离，确保工件在图像中足够大。",
    blocks: [
      {
        t: "note",
        label: "最关键的一条规则",
        text: "手册中给出两个数值：通用规则——工件在图像中至少覆盖 250 × 250 像素（见第 02 节）；POC 指导值——在约 1280 × 720 的图像中至少 200 × 200 像素，大致相当于视场的三分之一到四分之一。相机、镜头与工作距离均由此确定。",
      },
      {
        t: "shot",
        key: "setup-fov-diagram",
        label: "配置 · 工作距离与视场",
        caption: "工作距离、焦距与工件像素尺寸共同决定视场范围。",
      },
      { t: "p", text: "将相机连接到视觉工控机。Pose6D 支持以下类型的相机。" },
      {
        t: "table",
        head: ["序号", "相机", "支持情况"],
        rows: [
          [
            "1",
            "WebCam 0（笔记本内置）、WebCam 1 / WebCam 2（USB）",
            "支持基础 USB 相机功能。WebCam 2 用于 RealSense 的 RGB 数据流。",
          ],
          ["2", "IDS — uEye", "支持。已在 IDS US1007 与 IDS 3270 上测试。"],
          ["3", "Basler — GigE", "支持。"],
          ["4", "以太网 / 流式传输", "支持。"],
          ["5", "RealSense — RGB", "支持。"],
          ["6", "网络相机（IP）", "支持，图像通过网络传输。"],
          ["7", "Allied Vision", "支持。"],
          ["8", "其他标准", "可按需求定制。"],
        ],
      },
      { t: "note", label: "重要提示", text: "必须关闭相机的自动对焦与自动变焦功能。" },
      { t: "h", text: "连接 USB 网络摄像头" },
      {
        t: "steps",
        items: [
          {
            menu: ["Camera", "Select from List"],
            body: "双击 Webcam 0 或 Webcam 1 进行选择。可点击红色 X 或双击所选项关闭窗口。",
          },
          { menu: ["Camera", "Connect"], body: "连接到所选相机。" },
          {
            menu: ["Camera", "Configure", "Configure Resolution"],
            body: "从列表中选择分辨率，或自行输入，例如 320 列（X）与 240 行（Y）。",
          },
          {
            menu: ["Camera", "Configure", "Resolution", "Custom"],
            body: "应用自定义分辨率。控制台会提示：CM: Set Resolution done : 320 x 240。",
          },
          {
            menu: ["Camera", "Show Real Time"],
            body: "实时窗口打开即表示相机连接成功。按 q 键关闭。",
          },
        ],
      },
    ],
  },
  {
    id: "scanning",
    n: "04",
    title: "工件扫描与数据采集",
    summary: "从多个位置录制工件视频，作为 3D 模型的原始数据。",
    blocks: [
      { t: "h", text: "首先创建新工件" },
      {
        t: "steps",
        items: [
          {
            menu: ["Project", "Set Work Directory"],
            body: "将 Pose6D 指向您的工件目录。",
            path: "C:\\RobotAI\\Parts",
            shot: "ui-set-work-dir",
          },
          {
            body: "在参数框中输入要处理的工件名称——手册示例中为 “Tube24”。",
            shot: "ui-object-name",
          },
          {
            menu: ["Projects", "Create New Object"],
            body: "系统将创建以该名称命名的文件夹。",
            shot: "ui-create-object",
          },
          {
            menu: ["Projects", "Check Config File"],
            body: "检查一切是否就绪——窗口会提示 “Config is OK”。",
            shot: "ui-object-config-ok",
          },
          {
            body: "工件文件夹下会创建五个目录：cameras、labels、models、robots、videos。请确认 labels 目录中的示例 json 文件已生成，并按您的工件进行编辑。",
            shot: "ui-object-dirs",
          },
        ],
      },
      { t: "h", text: "录制数据" },
      {
        t: "steps",
        items: [
          { menu: ["Camera", "Select From List"], body: "选择相应的相机。" },
          { menu: ["Camera", "Connect"], body: "连接到相机。" },
          { menu: ["Camera", "Show Real Time"], body: "确认相机工作正常，按 q 键退出。" },
          {
            menu: ["Training", "Record Training Video"],
            body: "使用 a、t、f 三个按键进行录制。MP4 文件会写入 videos 文件夹。",
          },
        ],
      },
      { t: "h", text: "单一工件" },
      {
        t: "p",
        text: "固定相机——工件在静止相机前移动；移动相机——相机围绕静止工件移动。两种方式均可，按您的工作单元实际情况选择。",
      },
      {
        t: "videos",
        label: "扫描示例",
        items: [
          { name: "移动工件 — 示例 1", key: "scan-moving-object-1" },
          { name: "移动工件 — 示例 2", key: "scan-moving-object-2" },
          { name: "移动工件 — 示例 3", key: "scan-moving-object-3" },
          { name: "移动相机", key: "scan-moving-camera" },
        ],
      },
      { t: "h", text: "多工件 — 无序抓取 / 码垛" },
      {
        t: "videos",
        label: "多工件示例",
        items: [
          { name: "码垛数据准备", key: "scan-palletizing" },
          { name: "无序抓取 — 示例 1", key: "scan-bin-picking-1" },
          { name: "无序抓取 — 示例 2", key: "scan-bin-picking-2" },
        ],
      },
    ],
  },
  {
    id: "calibration",
    n: "05",
    title: "相机标定",
    summary: "在工作距离处使用棋盘格标定板完成相机标定。",
    blocks: [
      { t: "button", text: "下载棋盘格标定图案", url: "/media/checkerboardPattern-2.pdf", download: true },
      {
        t: "note",
        label: "最重要的一点",
        text: "标定板须保持在工作距离处移动，并且应占据画面的一半以上（50–90%）。",
      },
      { t: "p", text: "在已创建工件文件夹的前提下，在 Pose6D 中执行以下操作。" },
      {
        t: "steps",
        items: [
          { menu: ["Camera", "Select From List"], body: "选择相应的相机。" },
          { menu: ["Camera", "Connect"], body: "连接到相机。" },
          { menu: ["Camera", "Show Real Time"], body: "检查实时图像，按 q 键退出。" },
          { menu: ["Camera", "Square Size"], body: "输入所打印标定板单个方格的实际尺寸——控制台会确认该数值，并写入配置文件的 square_size 字段。", shot: "ui-square-size" },
          {
            menu: ["Camera", "Record Video for Calibration"],
            body: "使用 a、t 或 f 在不同位置采集 30–40 张图像，单张拍摄建议使用 a 或 t。文件会写入 cameras 文件夹。",
          },
        ],
      },
      {
        t: "p",
        text: "标定板有两种呈现方式：显示在手机屏幕上，或打印后粘贴到刚性平面上。可打印的图案见下方文档下载部分。",
      },
      {
        t: "shot",
        key: "checkerboard-print",
        label: "棋盘格标定板",
        caption: "精确测量单个方格尺寸，并通过 Camera → Square Size 输入。",
      },
      {
        t: "download",
        name: "棋盘格标定图案",
        note: "请按 100% 比例打印，勿使用适应页面缩放",
        url: "/media/checkerboardPattern-2.pdf",
        label: "下载",
      },
      {
        t: "videos",
        label: "标定示例",
        items: [{ name: "使用手机显示标定板", key: "calib-smartphone" }],
      },
      { t: "h", text: "标定结果" },
      {
        t: "steps",
        items: [
          {
            body: "录制结束时按 q 键（若视频过长）开始标定阶段，识别到的角点会绘制在标定板上。",
            shot: "calibration-screen",
          },
          {
            body: "相机将针对该特定分辨率完成标定，控制台会打印标定结果摘要。",
            shot: "calibration-console",
          },
          {
            menu: ["Project", "Configuration File"],
            body: "相机内参标定完成——相关数值已写入配置文件（square_size 与相机矩阵）。",
            shot: "config-square-size",
          },
        ],
      },
    ],
  },
  {
    id: "measurements",
    n: "06",
    title: "工件测量",
    summary: "提供工件真实尺寸，确保模型比例正确。",
    blocks: [
      { t: "p", text: "RobotAI 需要工件的真实尺寸，可通过以下两种方式之一提供。" },
      {
        t: "bullets",
        items: [
          "方式一 —— 提供工件的机械图纸。",
          "方式二 —— 使用卡尺或直尺手工测量，并附上标明测量位置的照片。",
        ],
      },
      {
        t: "shots",
        items: [
          { key: "measure-drawing", label: "方式一 · 图纸", caption: "标注尺寸的机械图纸。" },
          { key: "measure-caliper-1", label: "方式二 · 卡尺", caption: "手工测量，尺寸 1。" },
          { key: "measure-caliper-2", label: "方式二 · 卡尺", caption: "手工测量，尺寸 2。" },
        ],
      },
      {
        t: "p",
        text: "请将尺寸数据与图像、标定数据一并发送，RobotAI 随后生成模型并返回给您。",
      },
    ],
  },
  {
    id: "upload-data",
    n: "07",
    title: "上传工件数据",
    summary: "将图像、相机标定数据与工件尺寸一并发送给 RobotAI。",
    blocks: [
      {
        t: "p",
        text: "完成扫描、相机标定和测量后，将完整的工件数据打包发送给 RobotAI。",
      },
      {
        t: "bullets",
        items: [
          "从不同位置拍摄的工件图像（第 04 节）",
          "棋盘格标定流程生成的相机标定数据（第 05 节）",
          "工件尺寸信息 —— 图纸或实测尺寸（第 06 节）",
        ],
      },
      {
        t: "note",
        label: "无需特殊格式",
        text: "共享文件夹链接或 zip 压缩包均可。我们会在开始建模前检查数据完整性并与您确认。",
      },
    ],
  },
  {
    id: "model",
    n: "08",
    title: "RobotAI 构建模型",
    summary: "我们为您的工件训练检测模型并交付给您 —— 您无需安装任何内容。",
    blocks: [
      {
        t: "p",
        text: "此步骤在 RobotAI 完成。我们根据您上传的数据为工件创建模型，并将完成的模型分享给您。",
      },
      {
        t: "note",
        label: "保持沟通",
        text: "如果数据有缺失或不一致，我们会在开始前与您联系。您也可以随时通过下方演示申请表单联系团队。",
      },
    ],
  },
  {
    id: "test-detection",
    n: "09",
    title: "检测测试",
    summary: "用与 USB 测试数据完全相同的方式验证您的模型。",
    blocks: [
      {
        t: "p",
        text: "测试您自己的模型与第 02 节的软件验证流程相同 —— 加载项目目录，在录制视频或实时相机上运行检测，并检查输出的位姿。",
      },
      { t: "h", text: "安装 RobotAI 交付的模型" },
      {
        t: "steps",
        items: [
          {
            body: "将模型 zip 压缩包放入工件目录，压缩包名称必须与工件名称一致。",
            path: "C:\\RobotAI\\Parts",
          },
          {
            menu: ["Training", "Unzip Model Zip File"],
            body: "将模型解压到工件文件夹中。",
          },
        ],
      },
      { t: "h", text: "运行检测" },
      {
        t: "steps",
        items: [
          {
            menu: ["Project", "Select Object Directory"],
            body: "选择包含工件及 RobotAI 交付模型的文件夹。",
          },
          {
            menu: ["Detect", "Run Standalone from File"],
            body: "在工件的录制视频上进行测试。",
          },
          {
            menu: ["Detect", "Run Stand Alone with Camera"],
            body: "然后在实时相机上测试。按 q 停止——如果位姿正确跟随工件，则检测运行正常。",
            shot: "ui-detect-values",
          },
        ],
      },
      {
        t: "note",
        label: "许可证说明",
        text: "没有许可证时，工件上仅显示 3D 坐标轴。激活许可证后，还会显示位姿数值——平移 Tx、Ty、Tz（毫米）与旋转 Rx、Ry、Rz（度）。",
      },
    ],
  },
  {
    id: "robot-calibration",
    n: "10",
    title: "相机–机器人标定",
    summary: "手眼标定：将检测结果转换到机器人坐标系。",
    blocks: [
      {
        t: "p",
        text: "将棋盘格标定板固定在机器人工作空间内，采集 10–20 张相机图像及其对应的机器人位姿。",
      },
      {
        t: "steps",
        items: [
          { menu: ["Camera", "Connect"], body: "连接相机。" },
          {
            menu: ["Robot", "Camera Robot Parameters"],
            body: "在编辑器中打开 camera_robot_calibration.json，将 ChessBoardPose 设为当前机器人 TCP 位姿，将 ChessBoardSquareSize 设为方格实际尺寸。",
          },
          {
            body: "将机械臂移动到不同位置，记录图像以及六个机器人位姿数值 [Tx, Ty, Tz, Rx, Ry, Rz]——平移单位为毫米，旋转单位视机器人而定为度或弧度。",
          },
          {
            menu: ["Robot", "Record Image for Calibration"],
            body: "也可按 a 键。图像会自动编号，机器人位姿写入 camera_robot_calibration.json。若标定板显示不清晰，请手动删除该图像。",
          },
          { menu: ["Robot", "Select Robot Model"], body: "选择您使用的机器人型号。" },
          {
            menu: ["Robot", "Moving Camera Calibration"],
            body: "执行标定，结果写入 robotai_cfg.yaml。",
          },
        ],
      },
      {
        t: "note",
        label: "旋转幅度要小",
        text: "绕 TCP 的 X、Y、Z 轴旋转不超过 ±30°。先改变 Z，再调整 X 与 Y，确保标定板始终位于图像内。",
      },
      {
        t: "p",
        text: "每个视角都会得到一个标定板位置。由于标定板在机器人坐标系中并未移动，六个数值应当重复一致，控制台打印的标准差必须很小——以毫米和度为单位时应小于 1。随后确认 robotai_cfg.yaml 中的 cam_gripper_transform 与 cam_robot_transform 已更新。",
      },
      { t: "h", text: "可选验证" },
      {
        t: "steps",
        items: [
          { body: "在机器人基坐标系中确定棋盘格的四个角点 A、B、C、D。" },
          { body: "用机器人 TCP 逐点触碰并读取坐标。" },
          {
            body: "按顺序将 A、B、C、D 高精度写入 camera_robot_calibration.json 的 chessBoardCorners 字段。",
          },
        ],
      },
      { t: "h", text: "快速移动标定（1761 及以上版本）" },
      {
        t: "steps",
        items: [
          { body: "在 robotai_cfg.yaml 中设置 model_name: chess 以显示十字线。" },
          {
            body: "重复上述流程，但需从不同角度将中心十字对准标定板上的同一点。通常四张不同角度的图像即可。",
          },
          { menu: ["Robot", "Moving Camera Calibration"], body: "执行标定并查看控制台输出。" },
        ],
      },
      { t: "h", text: "高精度标定" },
      {
        t: "p",
        text: "如需更高精度，可在设定位置拍摄标定板，记录 Pose6D 显示的位姿，然后手动将机器人移动到目标点，从示教器读取坐标。以不同标定板姿态重复 4–6 次，并将这些数据对写入 camera_robot_calibration.json 的 errorInfo 字段。",
      },
      {
        t: "steps",
        items: [
          {
            menu: ["Robot", "Precise Camera Gripper Calibration"],
            body: "执行后检查 robotai_cfg.yaml 中的 cam_gripper_precise 已填入数值且不全为零。",
          },
        ],
      },
    ],
  },
  {
    id: "communication",
    n: "11",
    title: "机器人通信",
    summary: "Pose6D 作为 TCP 服务器：机器人请求位姿，返回六个数值。",
    blocks: [
      {
        t: "bullets",
        items: [
          "Pose6D 安装于 Windows 10/11。",
          "与机器人控制器之间为以太网连接。",
          "在 Windows 防火墙中放行端口 8480（或 5555，或自定义端口）。",
        ],
      },
      { t: "h", text: "本地测试连接" },
      {
        t: "steps",
        items: [
          { body: "运行 Pose6D-XXXX.exe 并选择一个工件。" },
          { menu: ["Camera", "Select from List"], body: "选择您的相机。" },
          { menu: ["Camera", "Connect"], body: "连接到相机。" },
          { menu: ["Robot", "Select Robot Model"], body: "选择机器人型号。" },
          {
            menu: ["Robot", "Configure Connection"],
            body: "先在命令行中输入 127.0.0.1:8480，然后执行该命令。",
          },
          {
            menu: ["Robot", "Select Comm Protocol"],
            body: "在列表中双击 <,mId,Name,Pose,Q,>。",
          },
          {
            menu: ["Detect", "Run TCP Server with Camera"],
            body: "启动 TCP 服务器并显示相机画面。如需启用棋盘格检测，请在该工件的 robotai_cfg.yaml 中设置 net_level: 1254。",
          },
          {
            body: "启动 Hercules TCP 客户端，连接 127.0.0.1 的 8480 端口，发送请求报文并查看响应。若未检测到目标，返回的位姿全为零。",
          },
        ],
      },
      {
        t: "note",
        label: "Hercules 的特殊之处",
        text: "Hercules 客户端要求首个同步字符输入两次——需发送 <<,1,1,0,0,0,0,0,0,1,>，尽管协议本身只需要一个 <。",
      },
      { t: "h", text: "报文格式 <,mId,Name,Pose,Q,>" },
      {
        t: "table",
        head: ["数值", "类型", "说明"],
        rows: [
          ["<", "Sync", "报文起始"],
          ["1", "Int", "报文编号"],
          ["1", "String", "请求的工件 ID / 名称"],
          ["Pose", "Array", "机器人位姿，6 个浮点数 Tx, Ty, Tz [mm], Rx, Ry, Rz [deg]，或全零"],
          ["Qual", "Float", "请求报文中为占位值"],
          [">", "Sync", "报文结束"],
        ],
      },
      { t: "code", label: "请求", lines: ["<,1,1,0,0,0,0,0,0,1,>"] },
      {
        t: "table",
        head: ["数值", "类型", "说明"],
        rows: [
          ["<", "Sync", "报文起始"],
          ["2", "Int", "报文编号"],
          ["1", "String", "工件 ID / 名称"],
          ["Pose", "Array", "6 个浮点数：Tx, Ty, Tz [mm], Rx, Ry, Rz [deg]"],
          ["Qual", "Float", "检测质量，0–1"],
          [">", "Sync", "报文结束"],
        ],
      },
      {
        t: "code",
        label: "响应",
        lines: ["<,2,1,79.743313,28.696728,-85.868947,-175.437383,-67.447617,32.168495,0.8,>"],
      },
      { t: "h", text: "报文头格式 ]N>" },
      {
        t: "table",
        head: ["数值", "类型", "说明"],
        rows: [
          ["]", "Sync", "报文头起始"],
          ["N", "Int", "报文字符数，不含报文头"],
          [">", "Sync", "报文头结束"],
          ["2", "Int", "报文编号"],
          ["Id", "Int", "工件 ID"],
          ["Pose", "Array", "6 个浮点数：Tx, Ty, Tz [mm], Rx, Ry, Rz [deg]"],
          ["Qual", "Float", "检测质量，0–1"],
        ],
      },
      {
        t: "code",
        label: "带报文头的响应",
        lines: ["]76>2,0,79.743313,28.696728,-85.868947,-175.437383,-67.447617,32.168495,0.000000"],
      },
      { t: "h", text: "修改 IP 地址与端口" },
      {
        t: "p",
        text: "打开与 Pose6D_XXXX.exe 同目录下的 pose6d_session.yaml，修改默认值：",
      },
      {
        t: "code",
        label: "pose6d_session.yaml",
        lines: [
          "robot_client_host: 192.168.1.100   # 机器人 / 客户端 IP",
          "robot_server_host: 192.168.1.10    # 运行 Pose6D 的工控机 IP",
          "robot_server_port: 8480",
        ],
      },
      {
        t: "note",
        label: "重要提示",
        text: "请确认 Windows 防火墙允许该配置——将 Pose6D_XXXX.exe 加入允许的应用程序列表。",
      },
    ],
  },
  {
    id: "activation",
    n: "A",
    title: "许可证激活与类型",
    summary: "激活流程以及许可证解锁的功能。",
    blocks: [
      {
        t: "p",
        text: "Pose6D 启动时，主窗口可能显示 “Requires Activation”。没有许可证软件仍可运行，但检测到的工件上仅显示 3D 坐标轴——位姿数值保持隐藏。",
      },
      { t: "shot", key: "ui-requires-activation", label: "POSE6D · 需要激活", caption: "启动后、激活前的主窗口。" },
      {
        t: "steps",
        items: [
          {
            body: "从 C:\\RobotAI\\SW 运行一次 Pose6D，同一目录下会生成许可证请求文件 pose6d_license.chk。",
            path: "C:\\RobotAI\\SW\\pose6d_license.chk",
          },
          {
            body: "将 pose6d_license.chk 连同您的公司名称发送给 RobotAI。",
          },
          {
            body: "RobotAI 会返回许可证文件，为特定机器、期限与功能组合启用软件。",
          },
        ],
      },
      {
        t: "note",
        label: "许可证的作用",
        text: "许可证类型影响机器人连接以及显示的数据内容。激活后，实时检测窗口会显示完整位姿——Tx、Ty、Tz（毫米）与 Rx、Ry、Rz（度）。",
      },
      { t: "shot", key: "ui-detect-values", label: "实时检测 · 已激活", caption: "USB 测试工件上显示的位姿数值。" },
    ],
  },
];

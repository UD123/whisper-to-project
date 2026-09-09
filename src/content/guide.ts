export type GuideStep = {
  n: string;
  title: string;
  detail: string;
  /** Anchor on this page, when the section already exists */
  href?: string;
};

export const guide = {
  meta: {
    eyebrow: "Documentation",
    title: "Pose6D — Getting Started",
    subtitle: "Main steps for 3D pose estimation, from installation to a working robot.",
    download: "Download full manual (PDF)",
  },

  instructions: {
    title: "Instructions",
    expand: "Expand all",
    collapse: "Collapse all",
  },

  overview: {

    title: "Overview",
    body: [
      "This page outlines the main steps to perform 6DOF pose estimation with Pose6D. It is the short version of the manual — every parameter here matches the full document.",
      "The latest revision of the complete manual can be requested from RobotAI at any time. Everything you need to start is on this page: no external documents required.",
    ],
  },

  steps: {
    eyebrow: "11 steps",
    title: "Main steps for a single-object pose estimation",
    subtitle: "Eleven steps. Click a step to jump to its instructions.",
    items: [
      {
        n: "01",
        title: "Get the software",
        detail: "Download the free POC version (CPU only) together with its documentation.",
        href: "#installation",
      },
      {
        n: "02",
        title: "Hardware requirements & installation",
        detail: "Prepare the PC, install Pose6D and verify it on the supplied USB test data.",
        href: "#installation",
      },
      {
        n: "03",
        title: "Define your setup",
        detail: "Camera, working distance and object size in the image.",
        href: "#optics",
      },
      {
        n: "04",
        title: "Collect image data",
        detail: "Record the object from different positions according to your setup.",
        href: "#scanning",
      },
      {
        n: "05",
        title: "Camera calibration",
        detail: "Run the calibration procedure with the printed checkerboard pattern.",
        href: "#calibration",
      },
      {
        n: "06",
        title: "Provide object dimensions",
        detail: "Measure the part and supply its size information.",
        href: "#measurements",
      },
      {
        n: "07",
        title: "Upload the object data",
        detail: "Send images, calibration and size data to RobotAI.",
      },
      {
        n: "08",
        title: "RobotAI builds the model",
        detail: "We train the model for your part and share it back with you.",
      },
      {
        n: "09",
        title: "Test detection",
        detail: "Verify results with the same steps used for the USB model.",
        href: "#verification",
      },
      {
        n: "10",
        title: "Hand-eye calibration",
        detail: "Transform the result into your robot coordinate frame.",
        href: "#robot-calibration",
      },
      {
        n: "11",
        title: "Robot communication",
        detail: "Connect the output to your controller — the interface is flexible.",
        href: "#communication",
      },
    ] as GuideStep[],
    soon: "RobotAI side",
  },

  video: {
    eyebrow: "Video guide",
    title: "How to start and test Pose6D with the USB object",
    subtitle: "A full walkthrough of the installation and the first detection run.",
    label: "POSE6D · USB QUICK START",
    key: "usb-quickstart",
  },

  installation: {
    eyebrow: "01 — Hardware & Software Installation",
    title: "Install Pose6D and verify it in about 15 minutes",
    subtitle:
      "Everything in this section refers to the free POC build (CPU only) running on Windows 10.",
    requirementsTitle: "Requirements",
    requirements: [
      { k: "Operating system", v: "Windows 10", note: "POC build is Windows-only" },
      { k: "Memory", v: "8 GB minimum", note: "More memory speeds up loading" },
      { k: "GPU", v: "Not required", note: "CPU build runs slower than the GPU version" },
      { k: "CUDA", v: "Occasionally required", note: "See the troubleshooting page of the manual" },
      { k: "Camera drivers", v: "USB built into Windows 10", note: "Other cameras need customization — contact RobotAI" },
    ],
    callout: {
      label: "Important",
      text: "In your setup and camera selection, the object must cover at least 250 × 250 pixels in the image to receive accurate results.",
    },
    diagramLabel: "INSTALLATION EXAMPLE · CAMERA → PC → ROBOT CONTROLLER",
    diagramCaption:
      "Possible connection between the camera, the RobotAI computer and the robot controller.",

    installTitle: "Software installation",
    installSteps: [
      {
        title: "Download the installer",
        body: "Save Pose6D-XXXX-cpu.exe into a folder on your computer. XXXX stands for the version number.",
        path: "C:\\RobotAI\\SW",
        file: "Pose6D-XXXX-cpu.exe",
      },
      {
        title: "Create a parts directory",
        body: "This folder will hold every object you work with.",
        path: "C:\\RobotAI\\Parts",
      },
      {
        title: "Download the test data",
        body: "Get usb_test.zip — the reference object used to verify the installation.",
        file: "usb_test.zip",
      },
      {
        title: "Unzip into the parts directory",
        body: "You should end up with a usb_test folder containing the structure below.",
        path: "C:\\RobotAI\\Parts\\usb_test",
      },
    ],
    fileSoon: "Link on request",
    structureLabel: "usb_test · FOLDER STRUCTURE",
    structure: [
      { k: "cameras", v: "Camera interfaces and parameters" },
      { k: "labels", v: "Labeled data used for model training" },
      { k: "models", v: "Run-time models" },
      { k: "robots", v: "Robot interfaces and parameters" },
      { k: "videos", v: "Data collected for training" },
    ],

    verificationEyebrow: "Section 01 · Part 2 of 2",
    verificationTitle: "Software verification",
    verificationSubtitle:
      "Two checks: first on the recorded data we ship, then on your own camera.",
    tabs: [
      {
        id: "recorded",
        name: "Recorded USB data",
        intro: "This confirms the installation itself. Nothing but the shipped files is used.",
        steps: [
          {
            body: "Run the software by double-clicking the executable. Loading takes a while on CPU.",
            path: "C:\\RobotAI\\SW\\Pose6D-XXXX-cpu.exe",
          },
          { body: "Choose the working project directory and select usb_test.", menu: ["Project", "Select Object Directory"] },
          { body: "The window stays white and reports “Config is OK”.", menu: ["Project", "Check Config File"] },
          {
            body: "Pick the mp4 file in the usb_test video directory. A window with the USB movie opens.",
            menu: ["Detect", "Run Video from File"],
            path: "C:\\RobotAI\\Parts\\usb_test\\videos",
          },
          { body: "Press q to stop. If the video runs fast, the installation is successful.", result: true },
        ],
      },
      {
        id: "own",
        name: "Your own USB camera",
        intro:
          "This shows USB detection on your laptop or USB camera. Results are less reliable — the model does not know your camera or lighting. Put a sheet of white paper behind the object to compensate for the background.",
        steps: [
          { body: "Run the software and wait for the main window.", path: "C:\\RobotAI\\SW\\Pose6D-XXXX-cpu.exe" },
          { body: "Select usb_test as the working project directory.", menu: ["Project", "Select Object Directory"] },
          { body: "The message “Config is OK” must appear.", menu: ["Project", "Check Config File"] },
          { body: "Select Webcam 0 or 1, depending on your computer.", menu: ["Camera", "Select from List"] },
          { body: "The camera is now activated.", menu: ["Camera", "Connect"] },
          {
            body: "Choose 320×240. If your camera does not support it, pick another one or type the resolution into “Custom”. Resolutions other than 320×240 make detection less reliable.",
            menu: ["Camera", "Configure", "Resolution"],
          },
          { body: "A small live window appears. Keep the white paper behind the object.", menu: ["Detect", "Run Video from Camera"] },
          { body: "Press q to stop.", result: true },
        ],
      },
    ],
    dialogLabel: "PROJECT · SELECT OBJECT DIRECTORY",
    dialogCaption: "Selecting the usb_test project directory.",
  },

  downloads: {
    eyebrow: "Files",
    title: "Documents",
    subtitle: "Open them here or download — everything is served from this site.",
    items: [
      { id: "manual", name: "Pose6D — User Guide (POC)", note: "Full manual, version 0919" },
      { id: "checkerboard", name: "Checkerboard calibration pattern", note: "Print at 100% scale, no fit-to-page" },
    ],
    open: "Open",
    close: "Close",
    download: "Download",
  },

  nav: [
    { id: "overview", label: "Overview" },
    { id: "main-steps", label: "Main steps" },
    { id: "video", label: "Video guide" },
    { id: "installation", label: "01 — Installation" },
    { id: "verification", label: "Verification", sub: true },
    { id: "optics", label: "02 — Camera & optics" },
    { id: "scanning", label: "03 — Object scanning" },
    { id: "calibration", label: "04 — Camera calibration" },
    { id: "measurements", label: "05 — Object measurements" },
    { id: "robot-calibration", label: "06 — Camera–robot calibration" },
    { id: "communication", label: "07 — Robot communication" },
    { id: "downloads", label: "Documents" },
  ],

  help: {
    title: "Stuck somewhere?",
    body: "Send us the step number and a screenshot — we answer with the exact setting to change.",
    cta: "Contact RobotAI",
  },
};

export type Guide = typeof guide;

import type { GuideShotKey } from "./guide-shots";

export type Block =
  | { t: "p"; text: string }
  | { t: "bullets"; items: string[] }
  | { t: "steps"; items: { menu?: string[]; body: string; path?: string; shot?: GuideShotKey }[] }
  | { t: "note"; label: string; text: string }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "videos"; label: string; items: { name: string; key: string }[] }
  | { t: "code"; label: string; lines: string[] }
  | { t: "shot"; key: GuideShotKey; label: string; caption?: string; className?: string }
  | { t: "shots"; items: { key: GuideShotKey; label: string; caption?: string; className?: string }[] }
  | { t: "download"; name: string; note: string; url: string; label: string }
  | { t: "button"; text: string; url: string; download?: boolean }
  | { t: "h"; text: string };

export type GuideSection = {
  id: string;
  n: string;
  title: string;
  summary: string;
  blocks: Block[];
};

/** Sections 03–11, transferred from the RobotAI How-To documents. */
export const guideSections: GuideSection[] = [
  {
    id: "optics",
    n: "03",
    title: "Camera & optics setup",
    summary: "Choose the camera, optics and working distance so the part is large enough in the image.",
    blocks: [
      {
        t: "note",
        label: "The one rule that matters",
        text: "The manual states two numbers: the general rule — the object must cover at least 250 × 250 pixels (section 02); and the POC guidance — at least 200 × 200 pixels in an image of about 1280 × 720, roughly one third to one quarter of the field of view. Camera, optics and working distance all follow from this.",
      },
      {
        t: "shot",
        key: "setup-fov-diagram",
        label: "SETUP · WORKING DISTANCE & FIELD OF VIEW",
        caption: "Working distance, focus and object size in pixels define the field of view.",
      },
      {
        t: "p",
        text: "Connect the camera to the vision computer. Pose6D supports the following camera types.",
      },
      {
        t: "table",
        head: ["#", "Camera", "Support"],
        rows: [
          [
            "1",
            "WebCam 0 (laptop built-in), WebCam 1 / WebCam 2 (USB)",
            "Basic USB camera functionality. WebCam 2 is used for the RealSense RGB stream.",
          ],
          ["2", "IDS — uEye", "Supported. Tested with IDS US1007 and IDS 3270."],
          ["3", "Basler — GigE", "Supported."],
          ["4", "Ethernet / streaming", "Supported."],
          ["5", "RealSense — RGB", "Supported."],
          ["6", "Camera over IP", "Supported — images sent over the network."],
          ["7", "Allied Vision", "Supported."],
          ["8", "Additional standards", "On request."],
        ],
      },
      {
        t: "note",
        label: "Important",
        text: "Auto-focus and auto-zoom must be switched off on the camera.",
      },
      { t: "h", text: "Connecting a USB webcam" },
      {
        t: "steps",
        items: [
          {
            menu: ["Camera", "Select from List"],
            body: "Double-click Webcam 0 or 1 to select it. Close the window with the red X or by double-clicking your choice.",
          },
          { menu: ["Camera", "Connect"], body: "Connect to the selected camera." },
          {
            menu: ["Camera", "Configure", "Configure Resolution"],
            body: "Pick a resolution from the list, or type your own — for example 320 columns (X) and 240 rows (Y).",
          },
          {
            menu: ["Camera", "Configure", "Resolution", "Custom"],
            body: "Apply the custom resolution. The console confirms: CM: Set Resolution done : 320 x 240.",
          },
          {
            menu: ["Camera", "Show Real Time"],
            body: "A live window opens — the camera is connected. Press q to close it.",
          },
        ],
      },
    ],
  },
  {
    id: "scanning",
    n: "04",
    title: "Object scanning & data acquisition",
    summary: "Record video of the part from many positions — this is the raw data for the 3D model.",
    blocks: [
      { t: "h", text: "Create a new object first" },
      {
        t: "steps",
        items: [
          {
            menu: ["Project", "Set Work Directory"],
            body: "Point Pose6D at your parts directory.",
            path: "C:\\RobotAI\\Parts",
            shot: "ui-set-work-dir",
          },
          {
            body: "Write the name of the object you want to handle in the parameter box — in the manual example it is “Tube24”.",
            shot: "ui-object-name",
          },
          {
            menu: ["Projects", "Create New Object"],
            body: "A folder with this name is created.",
            shot: "ui-create-object",
          },
          {
            menu: ["Projects", "Check Config File"],
            body: "Verifies that everything is in place — the window reports “Config is OK”.",
            shot: "ui-object-config-ok",
          },
          {
            body: "Five directories are created under the object folder: cameras, labels, models, robots, videos. Recheck that the example json file exists in labels and edit it for your object.",
            shot: "ui-object-dirs",
          },
        ],
      },
      { t: "h", text: "Recording the data" },
      {
        t: "steps",
        items: [
          { menu: ["Camera", "Select From List"], body: "Select the relevant camera." },
          { menu: ["Camera", "Connect"], body: "Connect to it." },
          { menu: ["Camera", "Show Real Time"], body: "Check that the camera works. Press q to quit." },
          {
            menu: ["Training", "Record Training Video"],
            body: "Record with the keys a, t and f. The MP4 files are written to the videos folder.",
          },
        ],
      },
      { t: "h", text: "Single object" },
      {
        t: "p",
        text: "Fixed camera — the part moves in front of a stationary camera. Moving camera — the camera travels around a stationary part. Both work; pick whichever matches your cell.",
      },
      {
        t: "videos",
        label: "Scanning examples",
        items: [
          { name: "Moving object — example 1", key: "scan-moving-object-1" },
          { name: "Moving object — example 2", key: "scan-moving-object-2" },
          { name: "Moving object — example 3", key: "scan-moving-object-3" },
          { name: "Moving camera", key: "scan-moving-camera" },
        ],
      },
      { t: "h", text: "Multiple objects — bin picking / palletizing" },
      {
        t: "videos",
        label: "Multi-object examples",
        items: [
          { name: "Preparing data for palletizing", key: "scan-palletizing" },
          { name: "Bin picking — example 1", key: "scan-bin-picking-1" },
          { name: "Bin picking — example 2", key: "scan-bin-picking-2" },
        ],
      },
    ],
  },
  {
    id: "calibration",
    n: "05",
    title: "Camera calibration",
    summary: "Calibrate the camera with the checkerboard pattern, held at the working distance.",
    blocks: [
      { t: "button", text: "Download checker board pattern", url: "/media/checkerboardPattern-2.pdf", download: true },
      {
        t: "note",
        label: "Most important",
        text: "Hold and move the pattern at the working distance. The pattern should fill at least half of the scene (50–90%).",
      },
      { t: "p", text: "With the object folder already created, run the following in Pose6D." },
      {
        t: "steps",
        items: [
          { menu: ["Camera", "Select From List"], body: "Select the relevant camera." },
          { menu: ["Camera", "Connect"], body: "Connect to it." },
          { menu: ["Camera", "Show Real Time"], body: "Check the live image. Press q to quit." },
          { menu: ["Camera", "Square Size"], body: "Enter the size of one square of your printed pattern — the console confirms the value, and it appears as the square_size field in the configuration file.", shot: "ui-square-size" },
          {
            menu: ["Camera", "Record Video for Calibration"],
            body: "Capture 30–40 images in different positions using a, t or f — prefer a or t for single shots. Files are written to the cameras folder.",
          },
        ],
      },
      {
        t: "p",
        text: "Two ways to present the pattern: display it on a smartphone screen, or print it and stick it on a rigid flat surface. The printable pattern is in the Documents section below.",
      },
      {
        t: "shot",
        key: "checkerboard-print",
        label: "CHECKERBOARD PATTERN",
        caption: "Measure one square precisely and enter it via Camera → Square Size.",
        className: "max-w-sm",
      },
      {
        t: "download",
        name: "Checkerboard calibration pattern",
        note: "Print at 100% scale, no fit-to-page",
        url: "/media/checkerboardPattern-2.pdf",
        label: "Download",
      },
      {
        t: "videos",
        label: "Calibration example",
        items: [{ name: "Pattern on a smartphone", key: "calib-smartphone" }],
      },
      { t: "h", text: "Result" },
      {
        t: "steps",
        items: [
          {
            body: "Press q at the end of the recording (if it is too long) to start the calibration stage. Detected corners are drawn over the pattern.",
            shot: "calibration-screen",
          },
          {
            body: "The camera is calibrated for this specific resolution. The console prints the calibration summary.",
            shot: "calibration-console",
          },
          {
            menu: ["Project", "Configuration File"],
            body: "The calibration of the internal camera parameters is complete — the values are written into the configuration file (square_size and the camera matrix).",
            shot: "config-square-size",
          },
        ],
      },
    ],
  },
  {
    id: "measurements",
    n: "06",
    title: "Object measurements",
    summary: "Supply the real dimensions of the part so the model is scaled correctly.",
    blocks: [
      {
        t: "p",
        text: "RobotAI needs the true size of your part. Provide it in one of two ways.",
      },
      {
        t: "bullets",
        items: [
          "Option 1 — send a mechanical drawing of the part.",
          "Option 2 — measure the part by hand (caliper or ruler) and send the dimensions with a photo showing where each was taken.",
        ],
      },
      {
        t: "shots",
        items: [
          { key: "measure-drawing", label: "OPTION 1 · DRAWING", caption: "A mechanical drawing with dimensions." },
          { key: "measure-caliper-1", label: "OPTION 2 · CALIPER", caption: "Hand measurement, dimension 1." },
          { key: "measure-caliper-2", label: "OPTION 2 · CALIPER", caption: "Hand measurement, dimension 2." },
        ],
      },
      {
        t: "p",
        text: "Send the measurements together with the images and calibration data — RobotAI then builds the model and returns it to you.",
      },
    ],
  },
  {
    id: "upload-data",
    n: "07",
    title: "Upload the object data",
    summary: "Send images, camera calibration and object size to RobotAI in one package.",
    blocks: [
      {
        t: "p",
        text: "Once scanning, camera calibration and measurements are done, pack the complete object data and send it to RobotAI.",
      },
      {
        t: "bullets",
        items: [
          "Images of the object recorded from different positions (section 04)",
          "Camera calibration data from the checkerboard procedure (section 05)",
          "Object size information — a drawing or measured dimensions (section 06)",
        ],
      },
      {
        t: "note",
        label: "No special format",
        text: "A shared folder link or a zip archive is fine. We check completeness and confirm before the model build starts.",
      },
    ],
  },
  {
    id: "model",
    n: "08",
    title: "RobotAI builds your model",
    summary: "We train the detection model for your part and share it back — nothing to install on your side.",
    blocks: [
      {
        t: "p",
        text: "This step happens at RobotAI. We create the model for your object from the data you uploaded and share the finished model with you.",
      },
      {
        t: "note",
        label: "Stay in touch",
        text: "If anything in the data is missing or inconsistent, we contact you before starting. You can reach the team at any point via the demo form below.",
      },
    ],
  },
  {
    id: "test-detection",
    n: "09",
    title: "Test the detection",
    summary: "Verify the model exactly the way you verified the USB test data.",
    blocks: [
      {
        t: "p",
        text: "Testing your own model follows the same procedure as the software verification in section 02 — load the project directory, run the detection on a recorded video or your live camera, and check the reported pose.",
      },
      { t: "h", text: "Install the model RobotAI sent you" },
      {
        t: "steps",
        items: [
          {
            body: "Place the model zip archive into your parts directory. The zip name must match the object name.",
            path: "C:\\RobotAI\\Parts",
          },
          {
            menu: ["Training", "Unzip Model Zip File"],
            body: "Unpacks the model into the object folder.",
          },
        ],
      },
      { t: "h", text: "Run the detection" },
      {
        t: "steps",
        items: [
          {
            menu: ["Project", "Select Object Directory"],
            body: "Choose the folder with your object and the model RobotAI shared with you.",
          },
          {
            menu: ["Detect", "Run Standalone from File"],
            body: "Test on a recorded video of your object.",
          },
          {
            menu: ["Detect", "Run Stand Alone with Camera"],
            body: "Then test on the live camera. Press q to stop — if the pose tracks the object, detection is working.",
            shot: "ui-detect-values",
          },
        ],
      },
      {
        t: "note",
        label: "License note",
        text: "Without a license only the 3D axis is shown over the object. With an active license you also see the numeric pose values — translations Tx, Ty, Tz in mm and rotations Rx, Ry, Rz in degrees.",
      },
    ],
  },
  {
    id: "robot-calibration",
    n: "10",
    title: "Camera–robot calibration",
    summary: "Hand-eye calibration: convert detections into your robot's coordinate frame.",
    blocks: [
      {
        t: "p",
        text: "Fix the chessboard pattern in the robot workspace and record 10–20 camera images together with the matching robot poses.",
      },
      {
        t: "steps",
        items: [
          { menu: ["Camera", "Connect"], body: "Connect to the camera." },
          {
            menu: ["Robot", "Camera Robot Parameters"],
            body: "Open camera_robot_calibration.json in the editor. Set ChessBoardPose to the current robot TCP pose and ChessBoardSquareSize to the real square size.",
          },
          {
            body: "Move the arm to different positions and record an image plus the six robot pose numbers [Tx, Ty, Tz, Rx, Ry, Rz] — translations in mm, rotations in degrees or radians depending on the robot.",
          },
          {
            menu: ["Robot", "Record Image for Calibration"],
            body: "Or press a. Images are numbered automatically and the robot pose is written to camera_robot_calibration.json. Delete an image manually if the pattern is not clearly visible.",
          },
          { menu: ["Robot", "Select Robot Model"], body: "Select the robot you are working with." },
          {
            menu: ["Robot", "Moving Camera Calibration"],
            body: "Run the calibration. The result is written into robotai_cfg.yaml.",
          },
        ],
      },
      {
        t: "note",
        label: "Keep rotations small",
        text: "Rotate around the X, Y and Z axes of the TCP by no more than ±30°. Change Z, then change X and Y so the pattern stays inside the image.",
      },
      {
        t: "p",
        text: "Each view yields a pattern position. Since the pattern does not move in robot coordinates, all six numbers should repeat, and the standard deviation printed in the console must be small — below 1 for millimetres and degrees. Then check that cam_gripper_transform and cam_robot_transform in robotai_cfg.yaml have been updated.",
      },
      { t: "h", text: "Optional verification" },
      {
        t: "steps",
        items: [
          { body: "Determine the four chessboard corners A, B, C, D in the robot base coordinate system." },
          { body: "Touch each point with the robot TCP and read the coordinates." },
          {
            body: "Write A, B, C, D with high precision into the chessBoardCorners field of camera_robot_calibration.json, in that order.",
          },
        ],
      },
      { t: "h", text: "Fast moving calibration (version 1761 and up)" },
      {
        t: "steps",
        items: [
          { body: "In robotai_cfg.yaml set model_name: chess to show the cross lines." },
          {
            body: "Repeat the procedure above, but aim the centre cross at the same spot on the board from different angles. Four images at different angles are often enough.",
          },
          { menu: ["Robot", "Moving Camera Calibration"], body: "Run the calibration and check the console output." },
        ],
      },
      { t: "h", text: "High-precision calibration" },
      {
        t: "p",
        text: "For fine precision, photograph the pattern at a defined position, record the pose shown by Pose6D, then move the robot manually to the target point and record the coordinates from the teach panel. Repeat 4–6 times with different pattern orientations and write the pairs into the errorInfo field of camera_robot_calibration.json.",
      },
      {
        t: "steps",
        items: [
          {
            menu: ["Robot", "Precise Camera Gripper Calibration"],
            body: "Run it, then check that cam_gripper_precise in robotai_cfg.yaml is filled in and does not contain zeros.",
          },
        ],
      },
    ],
  },
  {
    id: "communication",
    n: "11",
    title: "Robot communication",
    summary: "Pose6D acts as a TCP server; the robot asks for a pose and receives six numbers back.",
    blocks: [
      {
        t: "bullets",
        items: [
          "Pose6D installed on Windows 10/11.",
          "Ethernet connection to the robot controller.",
          "Port 8480 (or 5555, or your own) allowed through the Windows firewall.",
        ],
      },
      { t: "h", text: "Test the connection locally" },
      {
        t: "steps",
        items: [
          { body: "Run Pose6D-XXXX.exe and select an object." },
          { menu: ["Camera", "Select from List"], body: "Select your camera." },
          { menu: ["Camera", "Connect"], body: "Connect to it." },
          { menu: ["Robot", "Select Robot Model"], body: "Select your robot type." },
          {
            menu: ["Robot", "Configure Connection"],
            body: "Type 127.0.0.1:8480 into the command line first, then run this command.",
          },
          {
            menu: ["Robot", "Select Comm Protocol"],
            body: "Double-click <,mId,Name,Pose,Q,> in the list.",
          },
          {
            menu: ["Detect", "Run TCP Server with Camera"],
            body: "Starts the TCP server and shows the camera output. To enable chess-pattern detection set net_level: 1254 in the object's robotai_cfg.yaml.",
          },
          {
            body: "Start the Hercules TCP client, connect to 127.0.0.1 port 8480, send the request message and watch the response. If nothing is detected, the returned pose is all zeros.",
          },
        ],
      },
      {
        t: "note",
        label: "Hercules quirk",
        text: "The Hercules client requires the first sync character twice — send <<,1,1,0,0,0,0,0,0,1,> although the protocol itself needs only a single <.",
      },
      { t: "h", text: "Message format <,mId,Name,Pose,Q,>" },
      {
        t: "table",
        head: ["Value", "Type", "Description"],
        rows: [
          ["<", "Sync", "Message start"],
          ["1", "Int", "Message id"],
          ["1", "String", "Object id / name requested"],
          ["Pose", "Array", "Robot pose, 6 floats Tx, Ty, Tz [mm], Rx, Ry, Rz [deg] — or zeros"],
          ["Qual", "Float", "Dummy value in a request"],
          [">", "Sync", "Message stop"],
        ],
      },
      { t: "code", label: "Request", lines: ["<,1,1,0,0,0,0,0,0,1,>"] },
      {
        t: "table",
        head: ["Value", "Type", "Description"],
        rows: [
          ["<", "Sync", "Message start"],
          ["2", "Int", "Message id"],
          ["1", "String", "Object id / name"],
          ["Pose", "Array", "6 floats: Tx, Ty, Tz [mm], Rx, Ry, Rz [deg]"],
          ["Qual", "Float", "Detection quality, 0–1"],
          [">", "Sync", "Message stop"],
        ],
      },
      {
        t: "code",
        label: "Response",
        lines: ["<,2,1,79.743313,28.696728,-85.868947,-175.437383,-67.447617,32.168495,0.8,>"],
      },
      { t: "h", text: "Header format ]N>" },
      {
        t: "table",
        head: ["Value", "Type", "Description"],
        rows: [
          ["]", "Sync", "Header start"],
          ["N", "Int", "Number of characters in the message, header excluded"],
          [">", "Sync", "Header stop"],
          ["2", "Int", "Message id"],
          ["Id", "Int", "Object id"],
          ["Pose", "Array", "6 floats: Tx, Ty, Tz [mm], Rx, Ry, Rz [deg]"],
          ["Qual", "Float", "Detection quality, 0–1"],
        ],
      },
      {
        t: "code",
        label: "Response with header",
        lines: ["]76>2,0,79.743313,28.696728,-85.868947,-175.437383,-67.447617,32.168495,0.000000"],
      },
      { t: "h", text: "Changing the IP address and port" },
      {
        t: "p",
        text: "Open pose6d_session.yaml, stored next to Pose6D_XXXX.exe, and change the defaults:",
      },
      {
        t: "code",
        label: "pose6d_session.yaml",
        lines: [
          "robot_client_host: 192.168.1.100   # IP of your robot / client",
          "robot_server_host: 192.168.1.10    # IP of the PC running Pose6D",
          "robot_server_port: 8480",
        ],
      },
      {
        t: "note",
        label: "Important",
        text: "Make sure the Windows firewall allows this configuration — add Pose6D_XXXX.exe to the allowed applications list.",
      },
    ],
  },
  {
    id: "activation",
    n: "A",
    title: "License activation & license types",
    summary: "How activation works and what the license unlocks.",
    blocks: [
      {
        t: "p",
        text: "When Pose6D starts, the main window may show “Requires Activation”. Without a license the software runs, but only the 3D axis is displayed over the detected object — the numeric pose values stay hidden.",
        // shot below
      },
      { t: "shot", key: "ui-requires-activation", label: "POSE6D · REQUIRES ACTIVATION", caption: "Main window right after launch, before activation." },
      {
        t: "steps",
        items: [
          {
            body: "Run Pose6D once from C:\\RobotAI\\SW. A license request file pose6d_license.chk is created in the same directory.",
            path: "C:\\RobotAI\\SW\\pose6d_license.chk",
          },
          {
            body: "Send pose6d_license.chk to RobotAI together with your company name.",
          },
          {
            body: "RobotAI returns a license file that enables the software for specific machines, time period and feature set.",
          },
        ],
      },
      {
        t: "note",
        label: "What the license changes",
        text: "The license type affects the connection to robots and which data is shown. With an active license the live detection window displays the full pose — Tx, Ty, Tz in mm and Rx, Ry, Rz in degrees.",
      },
      { t: "shot", key: "ui-detect-values", label: "LIVE DETECTION · WITH LICENSE", caption: "Numeric pose values over the USB test object." },
    ],
  },
];

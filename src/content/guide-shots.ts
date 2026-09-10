import uiMainWindow from "@/assets/guide/shots/ui-main-window.png";
import uiSelectFolder from "@/assets/guide/shots/ui-select-folder.png";
import uiConfigOk from "@/assets/guide/shots/ui-config-ok.png";
import uiVideoFileDialog from "@/assets/guide/shots/ui-video-file-dialog.png";
import uiLiveUsb from "@/assets/guide/shots/ui-live-usb.png";
import uiCameraList from "@/assets/guide/shots/ui-camera-list.png";
import uiResolutionList from "@/assets/guide/shots/ui-resolution-list.png";
import uiLiveCamera from "@/assets/guide/shots/ui-live-camera.png";
import setupFovDiagram from "@/assets/guide/shots/setup-fov-diagram.jpg";
import uiSetWorkDir from "@/assets/guide/shots/ui-set-work-dir.png";
import uiObjectName from "@/assets/guide/shots/ui-object-name.png";
import uiCreateObject from "@/assets/guide/shots/ui-create-object.png";
import uiObjectConfigOk from "@/assets/guide/shots/ui-object-config-ok.png";
import uiObjectDirs from "@/assets/guide/shots/ui-object-dirs.png";
import checkerboardPrint from "@/assets/guide/shots/checkerboard-print.png";
import uiSquareSize from "@/assets/guide/shots/ui-square-size.png";
import calibrationScreen from "@/assets/guide/shots/calibration-screen.jpg";
import calibrationConsole from "@/assets/guide/shots/calibration-console.png";
import configSquareSize from "@/assets/guide/shots/config-square-size.png";
import measureDrawing from "@/assets/guide/shots/measure-drawing.jpg";
import measureCaliper1 from "@/assets/guide/shots/measure-caliper-1.jpg";
import measureCaliper2 from "@/assets/guide/shots/measure-caliper-2.jpg";
import measureCaliper3 from "@/assets/guide/shots/measure-caliper-3.jpg";
import uiDetectValues from "@/assets/guide/shots/ui-detect-values.png";
import uiRequiresActivation from "@/assets/guide/shots/ui-requires-activation.png";
import usbTestFolders from "@/assets/guide/shots/usb-test-folders.png";

/** Real screenshots extracted from the Pose6D user guide (POC, 0919). */
export const guideShots = {
  "ui-main-window": uiMainWindow,
  "ui-select-folder": uiSelectFolder,
  "ui-config-ok": uiConfigOk,
  "ui-video-file-dialog": uiVideoFileDialog,
  "ui-live-usb": uiLiveUsb,
  "ui-camera-list": uiCameraList,
  "ui-resolution-list": uiResolutionList,
  "ui-live-camera": uiLiveCamera,
  "setup-fov-diagram": setupFovDiagram,
  "ui-set-work-dir": uiSetWorkDir,
  "ui-object-name": uiObjectName,
  "ui-create-object": uiCreateObject,
  "ui-object-config-ok": uiObjectConfigOk,
  "ui-object-dirs": uiObjectDirs,
  "checkerboard-print": checkerboardPrint,
  "ui-square-size": uiSquareSize,
  "calibration-screen": calibrationScreen,
  "calibration-console": calibrationConsole,
  "config-square-size": configSquareSize,
  "measure-drawing": measureDrawing,
  "measure-caliper-1": measureCaliper1,
  "measure-caliper-2": measureCaliper2,
  "measure-caliper-3": measureCaliper3,
  "ui-detect-values": uiDetectValues,
  "ui-requires-activation": uiRequiresActivation,
  "usb-test-folders": usbTestFolders,
} as const;

export type GuideShotKey = keyof typeof guideShots;

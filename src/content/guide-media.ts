import usbQuickstart from "@/assets/guide/video/usb-quickstart.mp4.asset.json";
import scanMovingObject1 from "@/assets/guide/video/scan-moving-object-1.mp4.asset.json";
import scanMovingObject2 from "@/assets/guide/video/scan-moving-object-2.mp4.asset.json";
import scanMovingObject3 from "@/assets/guide/video/scan-moving-object-3.mp4.asset.json";
import scanMovingCamera from "@/assets/guide/video/scan-moving-camera.mp4.asset.json";
import scanPalletizing from "@/assets/guide/video/scan-palletizing.mp4.asset.json";
import scanBinPicking1 from "@/assets/guide/video/scan-bin-picking-1.mp4.asset.json";
import scanBinPicking2 from "@/assets/guide/video/scan-bin-picking-2.mp4.asset.json";
import calibSmartphone from "@/assets/guide/video/calib-smartphone.mp4.asset.json";

/** Self-hosted guide videos. Keys are referenced from the guide content files. */
export const guideVideo: Record<string, string> = {
  "usb-quickstart": usbQuickstart.url,
  "scan-moving-object-1": scanMovingObject1.url,
  "scan-moving-object-2": scanMovingObject2.url,
  "scan-moving-object-3": scanMovingObject3.url,
  "scan-moving-camera": scanMovingCamera.url,
  "scan-palletizing": scanPalletizing.url,
  "scan-bin-picking-1": scanBinPicking1.url,
  "scan-bin-picking-2": scanBinPicking2.url,
  "calib-smartphone": calibSmartphone.url,
};

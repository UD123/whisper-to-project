import usbQuickstart from "@/assets/guide/video/usb-quickstart.mp4.asset.json";
import scanMovingObject1 from "@/assets/guide/video/scan-moving-object-1.mp4.asset.json";
import scanMovingObject2 from "@/assets/guide/video/scan-moving-object-2.mp4.asset.json";
import scanMovingObject3 from "@/assets/guide/video/scan-moving-object-3.mp4.asset.json";
import scanMovingCamera from "@/assets/guide/video/scan-moving-camera.mp4.asset.json";
import scanPalletizing from "@/assets/guide/video/scan-palletizing.mp4.asset.json";
import scanBinPicking1 from "@/assets/guide/video/scan-bin-picking-1.mp4.asset.json";
import scanBinPicking2 from "@/assets/guide/video/scan-bin-picking-2.mp4.asset.json";
import calibSmartphone from "@/assets/guide/video/calib-smartphone.mp4.asset.json";

import usbQuickstartPoster from "@/assets/guide/posters/usb-quickstart.jpg";
import scanMovingObject1Poster from "@/assets/guide/posters/scan-moving-object-1.jpg";
import scanMovingObject2Poster from "@/assets/guide/posters/scan-moving-object-2.jpg";
import scanMovingObject3Poster from "@/assets/guide/posters/scan-moving-object-3.jpg";
import scanMovingCameraPoster from "@/assets/guide/posters/scan-moving-camera.jpg";
import scanPalletizingPoster from "@/assets/guide/posters/scan-palletizing.jpg";
import scanBinPicking1Poster from "@/assets/guide/posters/scan-bin-picking-1.jpg";
import scanBinPicking2Poster from "@/assets/guide/posters/scan-bin-picking-2.jpg";
import calibSmartphonePoster from "@/assets/guide/posters/calib-smartphone.jpg";

export type GuideVideoRef = { src: string; poster: string };

/** Self-hosted guide videos with poster frames. Keys are referenced from the guide content files. */
export const guideVideo: Record<string, GuideVideoRef> = {
  "usb-quickstart": { src: usbQuickstart.url, poster: usbQuickstartPoster },
  "scan-moving-object-1": { src: scanMovingObject1.url, poster: scanMovingObject1Poster },
  "scan-moving-object-2": { src: scanMovingObject2.url, poster: scanMovingObject2Poster },
  "scan-moving-object-3": { src: scanMovingObject3.url, poster: scanMovingObject3Poster },
  "scan-moving-camera": { src: scanMovingCamera.url, poster: scanMovingCameraPoster },
  "scan-palletizing": { src: scanPalletizing.url, poster: scanPalletizingPoster },
  "scan-bin-picking-1": { src: scanBinPicking1.url, poster: scanBinPicking1Poster },
  "scan-bin-picking-2": { src: scanBinPicking2.url, poster: scanBinPicking2Poster },
  "calib-smartphone": { src: calibSmartphone.url, poster: calibSmartphonePoster },
};

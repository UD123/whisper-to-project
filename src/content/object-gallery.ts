import balluffDetection from "@/assets/objects/detections/balluff-detection.jpg.asset.json";
import bottleDetection from "@/assets/objects/detections/bottle-detection.jpg.asset.json";
import boxesDetection from "@/assets/objects/detections/boxes-detection.jpeg.asset.json";
import closedCoverDetection from "@/assets/objects/detections/closed-cover-detection.jpg.asset.json";
import handToolDetection from "@/assets/objects/detections/hand-tool-detection.png.asset.json";
import mushroomDetection from "@/assets/objects/detections/mushroom-detection.jpg.asset.json";
import machinedPartsDetection from "@/assets/objects/detections/machined-parts-detection.jpg.asset.json";
import platesDetection from "@/assets/objects/detections/plates-detection.jpg.asset.json";
import reflectivePartsDetection from "@/assets/objects/detections/reflective-parts-detection.jpg.asset.json";
import ringsDetection from "@/assets/objects/detections/rings-detection.jpg.asset.json";

export type ObjectClip = {
  id: string;
  image: string;
  name: { en: string; zh: string };
  note: { en: string; zh: string };
};

export const objectClips: ObjectClip[] = [
  {
    id: "balluff-part",
    image: balluffDetection.url,
    name: { en: "Industrial component", zh: "工业零部件" },
    note: { en: "6DOF pose on a dark, low-contrast part", zh: "暗色低对比度零件的 6DOF 位姿" },
  },
  {
    id: "transparent-bottle",
    image: bottleDetection.url,
    name: { en: "Transparent bottle", zh: "透明瓶" },
    note: { en: "Pose estimation on transparent plastic", zh: "透明塑料件的位姿估计" },
  },
  {
    id: "cardboard-boxes",
    image: boxesDetection.url,
    name: { en: "Cardboard boxes", zh: "纸箱" },
    note: { en: "Multiple objects localized in one frame", zh: "单帧内定位多个物体" },
  },
  {
    id: "closed-covers",
    image: closedCoverDetection.url,
    name: { en: "Metal covers", zh: "金属盖板" },
    note: { en: "Random bin picking with overlapping parts", zh: "重叠零件的随机料箱抓取" },
  },
  {
    id: "hand-tool",
    image: handToolDetection.url,
    name: { en: "Hand tool", zh: "手持工具" },
    note: { en: "Stable pose while the object is handled", zh: "物体被手持时的稳定姿态" },
  },
  {
    id: "mushrooms",
    image: mushroomDetection.url,
    name: { en: "Mushrooms", zh: "蘑菇" },
    note: { en: "Soft products with natural variation", zh: "形态自然变化的柔软产品" },
  },
  {
    id: "machined-parts",
    image: machinedPartsDetection.url,
    name: { en: "Machined parts", zh: "机加工零件" },
    note: { en: "Localization in a dense, reflective bin", zh: "密集反光料箱中的定位" },
  },
  {
    id: "metal-plates",
    image: platesDetection.url,
    name: { en: "Metal plates", zh: "金属板件" },
    note: { en: "Multiple orientations detected together", zh: "同时检测多个方向" },
  },
  {
    id: "reflective-fittings",
    image: reflectivePartsDetection.url,
    name: { en: "Reflective fittings", zh: "反光接头" },
    note: { en: "6DOF poses on mirror-finish surfaces", zh: "镜面表面的 6DOF 位姿" },
  },
  {
    id: "rings",
    image: ringsDetection.url,
    name: { en: "Rings", zh: "环形零件" },
    note: { en: "Small overlapping parts localized at once", zh: "同时定位细小重叠零件" },
  },
];
import multiObjectPicking from "@/assets/objects/multi-object-picking.mp4.asset.json";
import hexPartsBin from "@/assets/objects/hex-parts-bin.mp4.asset.json";
import machineTendingTray from "@/assets/objects/machine-tending-tray.mp4.asset.json";
import plasticCups from "@/assets/objects/plastic-cups.mp4.asset.json";
import produceApples from "@/assets/objects/produce-apples.mp4.asset.json";
import cardboardBoxes from "@/assets/objects/cardboard-boxes.mp4.asset.json";
import pcbPrecision from "@/assets/objects/pcb-precision.mp4.asset.json";
import electronicsLine from "@/assets/objects/electronics-line.mp4.asset.json";
import ringAssembly from "@/assets/objects/ring-assembly.mp4.asset.json";
import garmentPicking from "@/assets/objects/garment-picking.mp4.asset.json";
import conveyorTracking from "@/assets/objects/conveyor-tracking.mp4.asset.json";
import robotCellKuka from "@/assets/objects/robot-cell-kuka.mp4.asset.json";
import dispensing from "@/assets/objects/dispensing.mp4.asset.json";
import furnitureAssembly from "@/assets/objects/furniture-assembly.mp4.asset.json";
import mushrooms from "@/assets/objects/mushrooms.mp4.asset.json";
import humanActivity from "@/assets/objects/human-activity.mp4.asset.json";

import multiObjectPickingPoster from "@/assets/objects/posters/multi-object-picking.jpg";
import hexPartsBinPoster from "@/assets/objects/posters/hex-parts-bin.jpg";
import machineTendingTrayPoster from "@/assets/objects/posters/machine-tending-tray.jpg";
import plasticCupsPoster from "@/assets/objects/posters/plastic-cups.jpg";
import produceApplesPoster from "@/assets/objects/posters/produce-apples.jpg";
import cardboardBoxesPoster from "@/assets/objects/posters/cardboard-boxes.jpg";
import pcbPrecisionPoster from "@/assets/objects/posters/pcb-precision.jpg";
import electronicsLinePoster from "@/assets/objects/posters/electronics-line.jpg";
import ringAssemblyPoster from "@/assets/objects/posters/ring-assembly.jpg";
import garmentPickingPoster from "@/assets/objects/posters/garment-picking.jpg";
import conveyorTrackingPoster from "@/assets/objects/posters/conveyor-tracking.jpg";
import robotCellKukaPoster from "@/assets/objects/posters/robot-cell-kuka.jpg";
import dispensingPoster from "@/assets/objects/posters/dispensing.jpg";
import furnitureAssemblyPoster from "@/assets/objects/posters/furniture-assembly.jpg";
import mushroomsPoster from "@/assets/objects/posters/mushrooms.jpg";
import humanActivityPoster from "@/assets/objects/posters/human-activity.jpg";

export type ObjectClip = {
  id: string;
  src: string;
  poster: string;
  /** Object family shown in the clip */
  name: { en: string; zh: string };
  /** What the vision system does with it */
  note: { en: string; zh: string };
};

/**
 * Short, silent example clips of detected objects. Posters are bundled with the
 * page; the MP4 itself is fetched only when a card is opened.
 */
export const objectClips: ObjectClip[] = [
  {
    id: "multi-object-picking",
    src: multiObjectPicking.url,
    poster: multiObjectPickingPoster,
    name: { en: "Mixed machined parts", zh: "混合机加工零件" },
    note: { en: "Multiple objects localized in one frame", zh: "单帧内定位多个物体" },
  },
  {
    id: "hex-parts-bin",
    src: hexPartsBin.url,
    poster: hexPartsBinPoster,
    name: { en: "Hex fittings in a bin", zh: "料箱中的六角接头" },
    note: { en: "Random bin picking on shiny metal", zh: "反光金属的随机料箱抓取" },
  },
  {
    id: "machine-tending-tray",
    src: machineTendingTray.url,
    poster: machineTendingTrayPoster,
    name: { en: "Metal blanks on a tray", zh: "托盘上的金属毛坯" },
    note: { en: "Machine tending, structured layout", zh: "机床上下料，规则排布" },
  },
  {
    id: "plastic-cups",
    src: plasticCups.url,
    poster: plasticCupsPoster,
    name: { en: "Plastic cups", zh: "塑料杯" },
    note: { en: "6DOF axes on loose plastic parts", zh: "散放塑料件的 6DOF 位姿" },
  },
  {
    id: "produce-apples",
    src: produceApples.url,
    poster: produceApplesPoster,
    name: { en: "Fresh produce", zh: "生鲜果蔬" },
    note: { en: "Organic shapes, no CAD model", zh: "无 CAD 模型的自然形状" },
  },
  {
    id: "cardboard-boxes",
    src: cardboardBoxes.url,
    poster: cardboardBoxesPoster,
    name: { en: "Cardboard boxes", zh: "纸箱" },
    note: { en: "Box detection and positioning", zh: "纸箱检测与定位" },
  },
  {
    id: "pcb-precision",
    src: pcbPrecision.url,
    poster: pcbPrecisionPoster,
    name: { en: "Printed circuit board", zh: "印刷电路板" },
    note: { en: "Precision placement on electronics", zh: "电子元件的精密定位" },
  },
  {
    id: "electronics-line",
    src: electronicsLine.url,
    poster: electronicsLinePoster,
    name: { en: "Electronics line", zh: "电子产品产线" },
    note: { en: "Deployed cell in production", zh: "已投产的工作单元" },
  },
  {
    id: "ring-assembly",
    src: ringAssembly.url,
    poster: ringAssemblyPoster,
    name: { en: "Rings and nuts", zh: "环件与螺母" },
    note: { en: "Small overlapping parts", zh: "细小且相互重叠的零件" },
  },
  {
    id: "garment-picking",
    src: garmentPicking.url,
    poster: garmentPickingPoster,
    name: { en: "Garments", zh: "服装" },
    note: { en: "Deformable, non-rigid objects", zh: "可变形的柔性物体" },
  },
  {
    id: "conveyor-tracking",
    src: conveyorTracking.url,
    poster: conveyorTrackingPoster,
    name: { en: "Parts on a conveyor", zh: "输送线上的零件" },
    note: { en: "Tracking while the scene moves", zh: "场景运动中的持续跟踪" },
  },
  {
    id: "robot-cell-kuka",
    src: robotCellKuka.url,
    poster: robotCellKukaPoster,
    name: { en: "Industrial robot cell", zh: "工业机器人工作站" },
    note: { en: "Vision-guided pick and place", zh: "视觉引导的取放作业" },
  },
  {
    id: "dispensing",
    src: dispensing.url,
    poster: dispensingPoster,
    name: { en: "Dispensing on a curved part", zh: "曲面零件点胶" },
    note: { en: "Precise path following, not pick and place", zh: "精确轨迹跟随，非取放作业" },
  },
  {
    id: "furniture-assembly",
    src: furnitureAssembly.url,
    poster: furnitureAssemblyPoster,
    name: { en: "Furniture assembly parts", zh: "家具装配件" },
    note: { en: "Dowels and fittings located on a panel", zh: "在板材上定位木销与连接件" },
  },
  {
    id: "mushrooms",
    src: mushrooms.url,
    poster: mushroomsPoster,
    name: { en: "Mushrooms", zh: "蘑菇" },
    note: { en: "Soft food products, high variability", zh: "柔软食品，形态差异大" },
  },
  {
    id: "human-activity",
    src: humanActivity.url,
    poster: humanActivityPoster,
    name: { en: "Human activity monitoring", zh: "人员作业监测" },
    note: { en: "Tracking hands and parts in a shared cell", zh: "人机共享工位中跟踪手与零件" },
  },
];

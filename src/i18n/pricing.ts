import type { Lang } from "./dictionaries";

export type PricingTier = {
  id: "demo" | "objects" | "perpetual";
  name: string;
  price: string;
  unit: string;
  desc: string;
  features: string[];
  cta: string;
  priceId?: string;
  href?: string;
  featured?: boolean;
};

export type PricingDict = {
  eyebrow: string;
  title: string;
  subtitle: string;
  tiers: PricingTier[];
  note: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  success: {
    eyebrow: string;
    title: string;
    body: string;
    back: string;
  };
};

const en: PricingDict = {
  eyebrow: "Licensing",
  title: "Pose6D License Options",
  subtitle:
    "Start with a free evaluation, license individual object models, or deploy a perpetual workstation license. All licenses include the Pose6D runtime, calibration tools and documentation.",
  tiers: [
    {
      id: "demo",
      name: "Demo",
      price: "$1",
      unit: "one-time evaluation",
      desc: "Full runtime with a sample object model for bench evaluation.",
      features: [
        "Pose6D runtime (Windows / Linux)",
        "Sample USB test object model",
        "Camera calibration toolset",
        "Full documentation and setup guide",
        "Evaluation use only",
      ],
      cta: "Buy Demo license",
      priceId: "pose6d_demo_onetime",
    },
    {
      id: "objects",
      name: "Objects",
      price: "$100",
      unit: "per object model",
      desc: "License one trained object model for production use. Buy as many as you need.",
      features: [
        "Everything in Demo",
        "One production object model",
        "Commercial production use",
        "Model retraining on request",
        "Email engineering support",
      ],
      cta: "Buy Objects license",
      priceId: "pose6d_objects_onetime",
      featured: true,
    },
    {
      id: "perpetual",
      name: "Perpetual",
      price: "$1,000",
      unit: "per workstation, one-time",
      desc: "Unlimited object models on one industrial workstation, with no expiry.",
      features: [
        "Everything in Objects",
        "Unlimited object models",
        "One industrial workstation",
        "No expiry, no renewal fees",
        "Priority integration support",
      ],
      cta: "Buy Perpetual license",
      priceId: "pose6d_perpetual_onetime",
    },
  ],
  note: "Prices in USD, excluding local taxes. Volume and integrator pricing available on request — contact info@robotai.info.",
  faqTitle: "Licensing questions",
  faq: [
    {
      q: "How is a license delivered?",
      a: "After checkout you receive a license key by email, together with the activation instructions from the user guide.",
    },
    {
      q: "Can I move a perpetual license to another workstation?",
      a: "Yes. Contact us and we re-issue the activation for the new machine.",
    },
    {
      q: "Do you support purchase orders?",
      a: "Yes — for POs, framework agreements or multi-site deployments, contact info@robotai.info.",
    },
  ],
  success: {
    eyebrow: "Order confirmed",
    title: "Thank you for your purchase",
    body: "Your payment was received. The license key and activation instructions are on their way to the email address used at checkout. If it does not arrive within one business day, contact info@robotai.info.",
    back: "Back to pricing",
  },
};

const zh: PricingDict = {
  eyebrow: "授权许可",
  title: "Pose6D 许可方案",
  subtitle:
    "先免费评测，再按物体模型购买许可，或直接部署永久工作站许可。所有许可均包含 Pose6D 运行时、标定工具与完整文档。",
  tiers: [
    {
      id: "demo",
      name: "评测版",
      price: "$1",
      unit: "一次性评测",
      desc: "完整运行时与示例物体模型，用于台架评测。",
      features: [
        "Pose6D 运行时（Windows / Linux）",
        "示例 USB 测试物体模型",
        "相机标定工具集",
        "完整文档与安装指南",
        "仅限评测用途",
      ],
      cta: "购买评测许可",
      priceId: "pose6d_demo_onetime",
    },
    {
      id: "objects",
      name: "物体许可",
      price: "$100",
      unit: "每个物体模型",
      desc: "为单个已训练物体模型购买生产许可，可按需购买多个。",
      features: [
        "包含评测版全部内容",
        "一个生产用物体模型",
        "可用于商业生产",
        "可申请模型再训练",
        "邮件技术支持",
      ],
      cta: "购买物体许可",
      priceId: "pose6d_objects_onetime",
      featured: true,
    },
    {
      id: "perpetual",
      name: "永久许可",
      price: "$1,000",
      unit: "每台工作站，一次性",
      desc: "单台工业工作站上不限数量的物体模型，永不过期。",
      features: [
        "包含物体许可全部内容",
        "不限物体模型数量",
        "一台工业工作站",
        "无有效期，无续费",
        "优先集成支持",
      ],
      cta: "购买永久许可",
      priceId: "pose6d_perpetual_onetime",
    },
  ],
  note: "价格以美元计，不含当地税费。批量与集成商价格请联系 info@robotai.info。",
  faqTitle: "许可常见问题",
  faq: [
    {
      q: "许可如何交付？",
      a: "完成付款后，许可密钥与激活说明将发送至您结账时使用的邮箱。",
    },
    {
      q: "永久许可可以更换工作站吗？",
      a: "可以。请联系我们，我们会为新设备重新签发激活信息。",
    },
    {
      q: "是否支持采购订单（PO）？",
      a: "支持。采购订单、框架协议或多站点部署请联系 info@robotai.info。",
    },
  ],
  success: {
    eyebrow: "订单已确认",
    title: "感谢您的购买",
    body: "我们已收到您的付款。许可密钥与激活说明将发送至结账时使用的邮箱。若一个工作日内未收到，请联系 info@robotai.info。",
    back: "返回价格页",
  },
};

export const pricingDict: Record<Lang, PricingDict> = { en, zh };

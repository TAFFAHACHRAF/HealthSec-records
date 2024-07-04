import { INavProductType } from "@/types";
import {
  PanelsTopLeft,
  PieChart,
  Sparkles,
  SquareKanban,
  Workflow,
} from "lucide-react";

export const navProducts: INavProductType[] = [
  {
    title: "Product Development Workflow",
    desc: "Robust platform for planning, wireframing, estimation, retrospectives, dependencies",
    icon: Workflow,
  },
  {
    title: "Workshop and Async Collaboration",
    desc: "Advance quickly with facilitation tools, Talktrack, and engaging interactive presentations.",
    icon: SquareKanban,
  },
  {
    title: "Diagramming and Process Mapping",
    desc: "Create flowcharts and journey maps easily with intelligent formatting and tools.",
    icon: PanelsTopLeft,
  },
  {
    title: "Whitepace Assist",
    desc: "Eliminate tedious tasks with auto-generated mindmaps, diagrams, code, and summaries.",
    icon: Sparkles,
  },
  {
    title: "Content and Visualization",
    desc: "Combine documents, designs, data, and more in Whitepace's integrated workspace.",
    icon: PieChart,
  },
];

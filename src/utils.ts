import { DialogExample } from "./custom/grid/character/dialogExample";
import { DialogExampleGrid } from "./types/characters";

export const dialogExamples = (
  examples: Partial<
    Record<
      keyof typeof DialogExample,
      Pick<DialogExampleGrid, "answer" | "hint">
    >
  >
) =>
  Object.entries(DialogExample).reduce((p, [key, value]) => ({
    ...p,
    [key]: {
      ...value,
      ...examples[key],
    },
  })) as unknown as typeof DialogExample;

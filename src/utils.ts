import { DialogExample } from "./custom/define/character/dialogExample";
import { DialogExampleDefineType } from "./types/characters";

export const dialogExamples = (
  examples: Partial<
    Record<
      keyof typeof DialogExample,
      Pick<DialogExampleDefineType, "answer" | "hint">
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

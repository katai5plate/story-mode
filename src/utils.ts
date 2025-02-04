import DIALOG_EXAMPLES from "./defines/characters/DIALOG_EXAMPLES";
import { DialogExample } from "./types/characters";

export const dialogExamples = (
  examples: Partial<
    Record<keyof typeof DIALOG_EXAMPLES, Pick<DialogExample, "answer" | "hint">>
  >
) =>
  Object.entries(DIALOG_EXAMPLES).reduce((p, [key, value]) => ({
    ...p,
    [key]: {
      ...value,
      ...examples[key],
    },
  })) as unknown as typeof DIALOG_EXAMPLES;

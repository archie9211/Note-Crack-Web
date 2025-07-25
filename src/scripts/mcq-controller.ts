// src/scripts/mcq-controller.ts

// Type for the embedded question data
interface Question {
      correct: number | number[];
}

function handleMCQInteraction(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const checkBtn = target.closest<HTMLButtonElement>(".check-answer-btn");
      if (!checkBtn || checkBtn.disabled) return;

      const container = checkBtn.closest<HTMLElement>(".mcq-container");
      if (!container) return;

      const questionDataEl = container.querySelector<HTMLScriptElement>(
            'script[type="application/json"]'
      );
      const optionsList =
            container.querySelector<HTMLUListElement>(".options-list");
      const explanationBox =
            container.querySelector<HTMLDivElement>(".explanation-box");
      const inputs = container.querySelectorAll<HTMLInputElement>("input");

      if (!questionDataEl?.textContent || !optionsList || !explanationBox)
            return;

      try {
            const question: Question = JSON.parse(questionDataEl.textContent);
            const correctAnswers = new Set(
                  Array.isArray(question.correct)
                        ? question.correct
                        : [question.correct]
            );
            const selectedInputs = Array.from(
                  container.querySelectorAll<HTMLInputElement>("input:checked")
            );
            const selectedIndices = new Set(
                  selectedInputs.map((input) => parseInt(input.value, 10))
            );

            const isFullyCorrect =
                  selectedIndices.size === correctAnswers.size &&
                  [...selectedIndices].every((index) =>
                        correctAnswers.has(index)
                  );

            explanationBox.classList.remove("hidden");
            explanationBox.classList.add(
                  isFullyCorrect ? "border-green-400" : "border-red-400",
                  isFullyCorrect ? "bg-green-50" : "bg-red-50",
                  isFullyCorrect
                        ? "dark:bg-green-900/50"
                        : "dark:bg-red-900/50",
                  isFullyCorrect ? "text-green-800" : "text-red-800",
                  isFullyCorrect ? "dark:text-green-200" : "dark:text-red-200"
            );

            checkBtn.disabled = true;
            inputs.forEach((input) => (input.disabled = true));

            optionsList.querySelectorAll("li").forEach((li, index) => {
                  const label =
                        li.querySelector<HTMLLabelElement>(".option-label");
                  if (!label) return;

                  const isCorrect = correctAnswers.has(index);
                  const isSelected = selectedIndices.has(index);

                  label.classList.remove(
                        "has-[:checked]:bg-blue-50",
                        "dark:has-[:checked]:bg-blue-900/50",
                        "has-[:checked]:border-blue-400"
                  );

                  if (isCorrect) {
                        label.classList.add(
                              "bg-green-100",
                              "dark:bg-green-900/50",
                              "border-green-400"
                        );
                  } else if (isSelected && !isCorrect) {
                        label.classList.add(
                              "bg-red-100",
                              "dark:bg-red-900/50",
                              "border-red-400"
                        );
                  } else {
                        label.classList.add("opacity-70");
                  }
            });
      } catch (error) {
            console.error("Failed to parse MCQ question data:", error);
      }
}

// Attach a single listener to the document for efficiency
document.addEventListener("click", handleMCQInteraction);

"use client";

type StepperProps = {
  currentStep: number;
};

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="mb-4 flex flex-col items-center sm:flex-row overflow-hidden rounded-lg border border-gray-200 ">
      {[1, 2, 3].map((step) => (
        <div
          className="relative flex flex-1 items-center w-full gap-3 px-6 py-4 border-b border-gray-200
  sm:border-b-0"
          key={step}
        >
          {currentStep > step ? (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white">
              ✓
            </div>
          ) : (
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 font-semibold ${
                currentStep === step
                  ? "border-indigo-600 text-indigo-600"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {step}
            </div>
          )}
          <span
            className={`font-semibold ${
              currentStep === step || currentStep > step
                ? "text-indigo-600"
                : "text-gray-400"
            }`}
          >
            Step {step}
          </span>
          {step !== 3 && (
            <>
            <div className="hidden sm:block pointer-events-none absolute top-1/2 right-4 h-10 w-10 -translate-y-1/2 rotate-45 border-t-2 border-r-2 border-gray-200" />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

interface StepHeaderProps {
    current: number;
  }
  
  export const StepsHeader = ({ current }: StepHeaderProps) => {
    const steps = ["Required Documents", "Optional Documents", "Submit"];
  
    return (
      <div className="flex justify-between mb-6">
        {steps.map((s, i) => (
          <div key={i} className="flex-1 text-center">
            <div
              className={`mx-auto h-3 w-3 rounded-full mb-2 ${
                current === i
                  ? "bg-blue-500"
                  : current > i
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            ></div>
            <p
              className={`text-sm font-semibold ${
                current === i ? "text-blue-500" : "text-gray-500"
              }`}
            >
              {s}
            </p>
          </div>
        ))}
      </div>
    );
  };
  
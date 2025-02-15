import React from 'react';
import { Check } from 'lucide-react';

interface BookingStepsProps {
  currentStep: number;
}

export function BookingSteps({ currentStep }: BookingStepsProps) {
  const steps = ['Select Flight', 'Choose Seat', 'Select Hotel', 'Payment'];

  return (
    <div className="w-full py-4">
      <div className="flex justify-center items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className={`ml-2 ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-20 h-0.5 mx-2 ${
                index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
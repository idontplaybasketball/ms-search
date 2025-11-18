
import React from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-700 last:border-b-0 py-4">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-brand-text-light">{title}</h3>
        <ChevronDownIcon className={`w-5 h-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;

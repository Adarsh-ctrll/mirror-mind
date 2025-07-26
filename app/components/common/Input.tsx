"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export default function Input({ label, id, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-lumos text-gray-800 mb-2">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full px-4 py-2 bg-parchment-light border border-yellow-700/30 rounded-md focus:ring-gryffindor focus:border-gryffindor text-gray-900 placeholder-gray-500 font-sans"
      />
    </div>
  );
}
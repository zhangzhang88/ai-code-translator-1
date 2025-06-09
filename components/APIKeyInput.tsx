interface Props {
  apiKey: string;
  onChange: (value: string) => void;
}

export const APIKeyInput: React.FC<Props> = ({ apiKey, onChange }) => {
  return (
    <input
      type="password"
      className="w-[280px] rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200 border border-gray-600 focus:border-violet-500 focus:outline-none"
      placeholder="Deepseek API Key"
      value={apiKey}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

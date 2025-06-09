interface Props {
  text: string;
  loading?: boolean;
  onChange?: (value: string) => void;
}

export const TextBlock: React.FC<Props> = ({
  text,
  loading = false,
  onChange = () => {},
}) => {
  return (
    <textarea
      className="min-h-[500px] w-full rounded-md bg-[#1A1B26] p-4 text-[15px] text-neutral-200 focus:outline-none focus:ring-1 focus:ring-violet-500"
      style={{ resize: 'none' }}
      value={text}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading}
      placeholder={loading ? "Translating..." : "Enter your code here..."}
    />
  );
};

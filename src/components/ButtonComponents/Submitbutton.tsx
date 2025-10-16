interface ISubmit {
  value: string;
  type: string;
  disabled?: boolean;
}
export const Submitbutton: React.FC<ISubmit> = ({ type, value, disabled }) => {
  return (
    <div>
      <input
        type={type}
        value={value}
        disabled={disabled ?? false}
        className={`bg-yellow-400 text-center rounded py-1 min-w-24 px-2 shadow-sm  text-white`}
      />
    </div>
  );
};

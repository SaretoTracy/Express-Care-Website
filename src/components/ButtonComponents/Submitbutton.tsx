
interface ISubmit {
  value: string;
  type: string;
}
export const Submitbutton = (props: ISubmit) => {
  return (
    <div>
      <input
        type={props.type}
        value={props.value}
        className={`bg-yellow-400 text-center rounded py-1 min-w-24 px-2 shadow-sm  text-white`}
      />
    </div>
  );
};

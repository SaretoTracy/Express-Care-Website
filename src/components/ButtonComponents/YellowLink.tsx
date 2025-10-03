
import { Link } from "react-router-dom";

interface IYellowbtn {
  btnPro: string;
  linkTo: string;
}
export const YellowLink = (props: IYellowbtn) => {
  return (
    <>
      <Link
        className={`bg-yellow-400 px-4 py-1 shadow-sm  rounded-md text-white`}
        to={props.linkTo}
        replace={true}
      >
        {props.btnPro}
      </Link>
    </>
  );
};

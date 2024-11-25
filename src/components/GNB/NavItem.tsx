import sprite from "../../assets/SVGsprite.svg";
import { useNavigate } from "react-router-dom";

type NavItemProps = { iconId: string; label: string; to: string };

const NavItem = ({ iconId, label, to }: NavItemProps) => {
  const navigate = useNavigate();

  const handleNavItemClick = () => {
    navigate(to);
  };
  return (
    <div className="flex gap-[15px] items-center px-[15px] py-[10px]">
      <svg width={30} height={30}>
        <use href={`${sprite}#${iconId}`}></use>
      </svg>
      <div onClick={handleNavItemClick}>{label}</div>
    </div>
  );
};

export default NavItem;

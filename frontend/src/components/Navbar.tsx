import type { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { StorageKeys } from "../utils/constants";
import LogoutIcon from "../assets/LogoutIcon";
import HomeIcon from "../assets/HomeIcon";
import ProfileIcon from "../assets/ProfileIcon";

interface NavBarProps {
  className?: string;
  icons?: () => JSX.Element[];
  selectedIcon: number;
}

export const DEFAULT_NAVBAR_ICONS = () => {
  const navigate = useNavigate();
  const goToLoginPage = () => navigate("/login");
  const goToHomePage = () => navigate("/home");
  const goToProfilePage = () => navigate("/profile");
  const logout = () => {
    localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
    goToLoginPage();
  };

  const iconProperties =
    "size-12 rounded-full fill-none stroke-cinemind-white stroke-1 bg-cinemind-dark outline-2 outline-cinemind-light";
  const iconViewBox = "-4 -4 32 32";

  return [
    <LogoutIcon
      className={iconProperties}
      viewBox={iconViewBox}
      onClick={logout}
    />,

    <HomeIcon
      className={iconProperties}
      viewBox={iconViewBox}
      onClick={goToHomePage}
    />,

    <ProfileIcon
      className={iconProperties}
      viewBox={iconViewBox}
      onClick={goToProfilePage}
    />
  ];
};

export default function NavBar({
  className = "",
  icons = () => [],
  selectedIcon = 0
}: NavBarProps) {
  return (
    <div className={className}>
      {icons().map((icon, index) => {
        return (
          <div
            key={index}
            className={selectedIcon == index ? "scale-200" : "cursor-pointer"}
          >
            {icon}
          </div>
        );
      })}
    </div>
  );
}

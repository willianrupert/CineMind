import { useNavigate } from "react-router-dom";
import HomeIcon from "../assets/HomeIcon";
import LogoutIcon from "../assets/LogoutIcon";
import ProfileIcon from "../assets/ProfileIcon";
import { StorageKeys } from "../utils/constants";

interface NavbarProps {
  selectedIcon: number;
}

export default function Navbar({ selectedIcon = 0 }: NavbarProps) {
  const navigate = useNavigate();
  const goToLoginPage = () => navigate("/login");
  const goToHomePage = () => navigate("/home");
  const goToProfilePage = () => navigate("/profile");

  const logout = () => {
    localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
    goToLoginPage();
  };

  return (
    <div
      className="
        flex bottom-4 gap-8 p-2 rounded-full overflow-visible relative
        row-start-10 row-span-1 col-start-2
        bg-cinemind-light
      "
    >
      <LogoutIcon
        className={`
          size-12 rounded-full fill-none stroke-cinemind-white stroke-1 
          bg-cinemind-dark outline-2 outline-cinemind-light ${selectedIcon == 0 ? "scale-200" : "cursor-pointer"}
        `}
        viewBox="-4 -4 32 32"
        onClick={logout}
      />
      <HomeIcon
        className={`
          size-12 rounded-full fill-none stroke-cinemind-white stroke-1 
          bg-cinemind-dark outline-2 outline-cinemind-light ${selectedIcon == 1 ? "scale-200" : "cursor-pointer"}
        `}
        viewBox="-4 -4 32 32"
        onClick={goToHomePage}
      />
      <ProfileIcon
        className={`
          size-12 rounded-full fill-none stroke-cinemind-white stroke-1 
          bg-cinemind-dark outline-2 outline-cinemind-light ${selectedIcon == 2 ? "scale-200" : "cursor-pointer"}
        `}
        viewBox="-4 -4 32 32"
        onClick={goToProfilePage}
      />
    </div>
  );
}

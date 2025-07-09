import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { observer } from "mobx-react-lite";
import userStore from "~/store/UserInfo";

const Header = () => {
  const navigate = useNavigate();

  const handleMyFiles = () => {
    if (!userStore.isLoggedIn) return;
    navigate("my_files");
  };

  const handleLogin = () => {
    if (!userStore.isLoggedIn) {
      navigate("/login");
    }

    userStore.clearUserInfo();
  };

  return (
    <div className="fixed left-0  right-0 h-20 flex items-center border-b-2 border-gray-200  px-96 justify-between z-10 bg-white">
      <Link to="/" className="font-extrabold text-2xl">
        ehs
      </Link>
      <div>
        <Button variant="default" className="mr-8" onClick={handleMyFiles}>
          My Files
        </Button>
        <Button onClick={handleLogin}>{userStore.isLoggedIn ? "Logout" : "Login"}</Button>
      </div>
    </div>
  );
};

export default observer(Header);

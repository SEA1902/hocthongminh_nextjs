import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Paper, Popover, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";

import Login from "@/components/Login";
import Register from "@/components/Register";
import styles from "./header.module.scss";
import { fetchLogout } from "@/app/features/users/usersApi";

function RightNavHeader() {
  const dispatch = useAppDispatch();

  const loginStatus = useAppSelector(
    (state: RootState) => state.users.loginStatus
  );
  const userInfor = useAppSelector((state: RootState) => state.users.userInfor);

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={styles.right_nav_header}>
      {loginStatus === "succeeded" ? (
        <div className={styles.app_bar_header_auth}>
          <Typography
            aria-describedby={id}
            className={styles.app_bar_header_auth_avatar}
            onClick={handlePopoverOpen}
          >
            <Image
              src={userInfor?.avatar ? userInfor.avatar : "/avatar.jpg"}
              alt=""
            ></Image>
          </Typography>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Paper>
              <Link href="/thong-tin-ca-nhan" className={styles.menu_user_item}>
                <PersonIcon
                  sx={{
                    marginRight: "7px",
                  }}
                />
                {userInfor?.name}
              </Link>
              <div className={styles.menu_user_item}>
                <SchoolIcon
                  sx={{
                    marginRight: "7px",
                  }}
                />
                Kết quả học tập
              </div>
              <div className={styles.menu_user_item} onClick={handleLogout}>
                <LogoutIcon
                  sx={{
                    marginRight: "7px",
                  }}
                />
                Đăng xuất
              </div>
            </Paper>
          </Popover>
        </div>
      ) : (
        <div className={styles.app_bar_header_auth}>
          <Button
            variant="contained"
            size="small"
            onClick={() => setOpenLogin(true)}
          >
            Đăng nhập
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setOpenRegister(true)}
          >
            Đăng ký
          </Button>
        </div>
      )}

      <Login openLogin={openLogin} setOpenLogin={setOpenLogin} />
      <Register openRegister={openRegister} setOpenRegister={setOpenRegister} />
    </div>
  );
}

export default RightNavHeader;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Button,
  Modal,
  Typography,
  Paper,
  DialogContent,
  Input,
  InputAdornment,
  Divider,
  Alert,
  Snackbar,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchLogin } from "@/app/features/users/usersApi";
import { RootState } from "@/app/store";

interface LoginProps {
  openLogin: boolean;
  setOpenLogin: (open: boolean) => void;
}
interface FormLogin {
  username: string;
  password: string;
}

function Login({ openLogin, setOpenLogin }: LoginProps) {
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(
    (state: RootState) => state.users.loginStatus
  );

  const [openAlert, setOpenAlert] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormLogin>();

  useEffect(() => {
    if (loginStatus === "failed") {
      setOpenAlert(true);
    } else if (loginStatus === "succeeded") {
      handleCloseModal();
    }
  }, [loginStatus, setOpenLogin]);

  const handleCloseModal = () => {
    reset();
    setOpenLogin(false);
  };

  const onSubmitLogin = async (data: FormLogin) => {
    await dispatch(
      fetchLogin({ username: data.username, password: data.password })
    );
  };

  return (
    <Modal
      open={openLogin}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        height: "100%",
        outline: "0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          margin: "0px",
          maxWidth: "600px",
          borderRadius: "20px",
          position: "absolute",
          top: "48px",
          maxHeight: "calc(100% - 64px)",
          overflowY: "auto",
        }}
      >
        <Snackbar
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          open={openAlert}
          autoHideDuration={4000}
          onClose={() => setOpenAlert(false)}
        >
          <Alert
            severity="error"
            sx={{ width: "100%" }}
            icon={<CloseIcon />}
            variant="filled"
          >
            Bạn đã nhập sai tài khoản hoặc mật khẩu!
          </Alert>
        </Snackbar>
        <div className="auth-form">
          <Typography
            variant="h6"
            component="div"
            sx={{
              margin: "0px",
              fontFamily: "inherit",
              fontWeight: "500",
              fontSize: "1.25rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                color: "var(--primaryColor)",
              }}
            >
              <div className="close-box" onClick={handleCloseModal}>
                <CloseIcon />
              </div>
            </div>
            <div className="title">Đăng nhập</div>
          </Typography>
          <DialogContent
            sx={{
              paddingTop: "0",
              overflowY: "auto",
              padding: "10px 12px",
            }}
          >
            <form onSubmit={handleSubmit(onSubmitLogin)}>
              <div className="auth-form-item">
                <div className="input-item">
                  <Input
                    id="username"
                    placeholder="Nhập tài khoản"
                    startAdornment={
                      <InputAdornment position="start">
                        <PersonOutlineIcon />
                      </InputAdornment>
                    }
                    disableUnderline={true}
                    fullWidth={true}
                    {...register("username", { required: true })}
                  />
                  {errors.username?.type === "required" && (
                    <div className="auth-error-msg">
                      Vui lòng nhập trường này!
                    </div>
                  )}
                </div>
              </div>
              <div className="auth-form-item">
                <div className="input-item">
                  <Input
                    id="input-username"
                    placeholder="Nhập mật khẩu"
                    type="password"
                    startAdornment={
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    }
                    disableUnderline={true}
                    fullWidth={true}
                    {...register("password", { required: true })}
                  />
                  {errors.password?.type === "required" && (
                    <div className="auth-error-msg">
                      Vui lòng nhập trường này!
                    </div>
                  )}
                </div>
              </div>
              <div className="auth-form-item">
                <span className="forgot-password">Quên mật khẩu</span>
              </div>
              <div className="auth-form-btn">
                <Button className="btn-submit" type="submit">
                  Đăng nhập
                </Button>
              </div>
              <div className="divider">
                <Divider>HOẶC</Divider>
              </div>
              <div className="auth-form-btn">
                <Button
                  className="btn-submit2"
                  startIcon={
                    <img
                      src="/images/icon/google-icon.svg"
                      alt=""
                      style={{ width: "25px" }}
                    />
                  }
                >
                  Đăng nhập vói Google
                </Button>
              </div>
              <div className="auth-form-nav">
                <span>Bạn chưa có tài khoản?</span>
                <span style={{ cursor: "pointer", color: "rgb(26, 218, 195)" }}>
                  {" "}
                  Đăng ký ngay
                </span>
              </div>
            </form>
          </DialogContent>
        </div>
      </Paper>
    </Modal>
  );
}

export default Login;

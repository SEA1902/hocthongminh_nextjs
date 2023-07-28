import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  DialogContent,
  Input,
  InputAdornment,
  Modal,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LockOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changePassword } from "@/app/features/users/usersApi";
import { RootState } from "@/app/store";

interface ChangePasswordProps {
  openChangePassword: boolean;
  setOpenChangePassword: (open: boolean) => void;
}
interface FormChangePassword {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ChangePassword = ({
  openChangePassword,
  setOpenChangePassword,
}: ChangePasswordProps) => {
  const dispatch = useAppDispatch();
  const { userInfor, changePasswordStatus } = useAppSelector(
    (state: RootState) => ({
      userInfor: state.users.userInfor,
      changePasswordStatus: state.users.changePasswordStatus,
    })
  );
  const [openAlert, setOpenAlert] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();

  useEffect(() => {
    if (
      changePasswordStatus === "failed" ||
      changePasswordStatus === "succeeded"
    ) {
      setOpenAlert(true);
    }
  }, [changePasswordStatus]);

  const onSubmitChangePassword = async (data: FormChangePassword) => {
    let changePasswordData = {
      userId: userInfor?.id === undefined ? "" : userInfor?.id,
      username: userInfor?.username === undefined ? "" : userInfor?.username,
      currentPassword: data?.currentPassword ? data.currentPassword : "",
      newPassword: data?.newPassword ? data.newPassword : "",
    };
    await dispatch(changePassword(changePasswordData));
    reset();
  };

  return (
    <Modal
      open={openChangePassword}
      onClose={() => {
        setOpenChangePassword(false);
      }}
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
          autoHideDuration={3000}
          onClose={() => setOpenAlert(false)}
        >
          <div>
            {changePasswordStatus === "failed" && (
              <Alert severity="error" sx={{ width: "100%" }} variant="filled">
                Bạn đã nhập sai mật khẩu hiện tại!
              </Alert>
            )}
            {changePasswordStatus === "succeeded" && (
              <Alert severity="success" sx={{ width: "100%" }} variant="filled">
                Cập nhật thành công!
              </Alert>
            )}
          </div>
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
              <div
                className="close-box"
                onClick={() => setOpenChangePassword(false)}
              >
                <CloseIcon />
              </div>
            </div>
            <div className="title">Đổi mật khẩu</div>
          </Typography>
          <DialogContent
            sx={{
              paddingTop: "0",
              overflowY: "auto",
              padding: "10px 12px",
            }}
          >
            <form onSubmit={handleSubmit(onSubmitChangePassword)}>
              <div className="auth-form-item">
                <div className="input-item">
                  <Input
                    id="currentPassword"
                    placeholder="Mật khẩu hiện tại"
                    type="password"
                    startAdornment={
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    }
                    disableUnderline={true}
                    fullWidth={true}
                    {...register("currentPassword")}
                  />
                </div>
              </div>
              <div className="auth-form-item">
                <div className="input-item">
                  <Input
                    id="newPassword"
                    placeholder="Mật khẩu mới"
                    type="password"
                    startAdornment={
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    }
                    disableUnderline={true}
                    fullWidth={true}
                    {...register("newPassword", {
                      minLength: {
                        value: 6,
                        message: "Mật khẩu phải có ít nhất 6 kí tự!",
                      },
                      validate: (value) =>
                        value !== getValues("currentPassword") ||
                        "Mật khẩu mới phải khác mật khẩu hiện tại!",
                    })}
                  />
                  {errors.newPassword && (
                    <div className="auth-error-msg">
                      {`${errors.newPassword.message}`}
                    </div>
                  )}
                </div>
              </div>
              <div className="auth-form-item">
                <div className="input-item">
                  <Input
                    id="confirmPassword"
                    placeholder="Xác nhận mật khẩu"
                    type="password"
                    autoComplete="confirmPassword"
                    startAdornment={
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    }
                    disableUnderline={true}
                    fullWidth={true}
                    {...register("confirmPassword", {
                      minLength: {
                        value: 6,
                        message: "Mật khẩu phải có ít nhất 6 kí tự!",
                      },
                      validate: (value) =>
                        value === getValues("newPassword") ||
                        "Xác nhận mật khẩu không đúng!",
                    })}
                  />
                  {errors.confirmPassword && (
                    <div className="auth-error-msg">
                      {`${errors.confirmPassword.message}`}
                    </div>
                  )}
                </div>
              </div>

              <div className="auth-form-btn">
                <Button className="btn-submit" type="submit">
                  Đổi mật khẩu
                </Button>
              </div>
            </form>
          </DialogContent>
        </div>
      </Paper>
    </Modal>
  );
};

export default ChangePassword;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Email, LocalPhoneOutlined, SchoolOutlined } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Button,
  Modal,
  Typography,
  Paper,
  DialogContent,
  InputAdornment,
  Divider,
  Grid,
  InputBase,
  FormControl,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { fetchRegister } from "@/app/features/users/usersApi";
interface RegisterProps {
  openRegister: boolean;
  setOpenRegister: (open: boolean) => void;
}

interface FormRegister {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
  phone: string;
  classNumber: number;
}

function Register({ openRegister, setOpenRegister }: RegisterProps) {
  const dispatch = useAppDispatch();
  const registerStatus = useAppSelector(
    (state: RootState) => state.users.registerStatus
  );

  const [openAlert, setOpenAlert] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm<FormRegister>();

  useEffect(() => {
    if (registerStatus === "failed") {
      setOpenAlert(true);
    } else if (registerStatus === "succeeded") {
      handleCloseModal();
    }
  }, [registerStatus, setOpenRegister]);

  const onSubmitRegister = async (data: FormRegister) => {
    await dispatch(fetchRegister(data));
  };

  const handleCloseModal = () => {
    reset();
    setOpenRegister(false);
  };

  return (
    <Modal
      open={openRegister}
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
            Tài khoản hoặc email đã tồn tại!
          </Alert>
        </Snackbar>
        <form className="auth-form" onSubmit={handleSubmit(onSubmitRegister)}>
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
            <div className="title">Tạo Tài Khoản</div>
          </Typography>
          <DialogContent
            sx={{
              paddingTop: "0",
              overflowY: "auto",
              padding: "10px 12px",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                {/* username */}
                <div className="auth-form-item">
                  <div className="input-item">
                    <InputBase
                      id="username"
                      placeholder="Nhập tài khoản"
                      autoComplete="username"
                      startAdornment={
                        <InputAdornment position="start">
                          <PersonOutlineIcon />
                        </InputAdornment>
                      }
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
                {/* name */}
                <div className="auth-form-item">
                  <div className="input-item">
                    <InputBase
                      id="name"
                      placeholder="Nhập tên"
                      autoComplete="name"
                      startAdornment={
                        <InputAdornment position="start">
                          <PersonOutlineIcon />
                        </InputAdornment>
                      }
                      fullWidth={true}
                      {...register("name", { required: true })}
                    />
                    {errors.name?.type === "required" && (
                      <div className="auth-error-msg">
                        Vui lòng nhập trường này!
                      </div>
                    )}
                  </div>
                </div>
                {/* password */}
                <div className="auth-form-item">
                  <div className="input-item">
                    <InputBase
                      id="password"
                      placeholder="Nhập mật khẩu"
                      type="password"
                      autoComplete="password"
                      startAdornment={
                        <InputAdornment position="start">
                          <LockOutlinedIcon />
                        </InputAdornment>
                      }
                      fullWidth={true}
                      {...register("password", {
                        required: true,
                        minLength: 6,
                      })}
                    />
                    {errors.password?.type === "required" && (
                      <div className="auth-error-msg">
                        Vui lòng nhập trường này!
                      </div>
                    )}
                    {errors.password?.type === "minLength" && (
                      <div className="auth-error-msg">
                        Mật khẩu phải có ít nhất 6 kí tự!
                      </div>
                    )}
                  </div>
                </div>
                {/* confirmPassword */}
                <div className="auth-form-item">
                  <div className="input-item">
                    <InputBase
                      id="confirmPassword"
                      placeholder="Nhập lại mật khẩu"
                      type="password"
                      autoComplete="confirmPassword"
                      startAdornment={
                        <InputAdornment position="start">
                          <LockOutlinedIcon />
                        </InputAdornment>
                      }
                      fullWidth={true}
                      {...register("confirmPassword", {
                        required: "Vui lòng nhập trường này!",
                        minLength: {
                          value: 6,
                          message: "Mật khẩu phải có ít nhất 6 kí tự!",
                        },
                        validate: (value) =>
                          value === getValues("password") ||
                          "Xác nhận mật khẩu không đúng!",
                      })}
                    />
                    {errors.confirmPassword && (
                      <div className="auth-error-msg">
                        {errors.confirmPassword.message}
                      </div>
                    )}
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                {/* email */}
                <div className="auth-form-item">
                  <div className="input-item">
                    <InputBase
                      id="email"
                      placeholder="Email"
                      autoComplete="email"
                      startAdornment={
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      }
                      fullWidth={true}
                      {...register("email", {
                        required: "Vui lòng nhập trường này!",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email không tồn tại!",
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="auth-error-msg">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </div>
                {/* phone */}
                <div className="auth-form-item">
                  <div className="input-item">
                    <InputBase
                      id="phone"
                      placeholder="Nhập số điện thoại của bạn"
                      autoComplete="phone"
                      startAdornment={
                        <InputAdornment position="start">
                          <LocalPhoneOutlined />
                        </InputAdornment>
                      }
                      fullWidth={true}
                      {...register("phone", {
                        pattern: {
                          value:
                            /^(\([0-9]{3}\)|[0-9]{3})[-. ]?[0-9]{3}[-. ]?[0-9]{4}$/,
                          message: "Số điện thoại không tồn tại!",
                        },
                      })}
                    />
                    {errors.phone && (
                      <div className="auth-error-msg">
                        {errors.phone.message}
                      </div>
                    )}
                  </div>
                </div>
                {/* className */}
                <div className="auth-form-item">
                  <div className="input-item">
                    <FormControl fullWidth variant="standard">
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Chọn lớp của bạn"
                        startAdornment={
                          <InputAdornment position="start">
                            <SchoolOutlined />
                          </InputAdornment>
                        }
                        {...register("classNumber", {
                          required: "Bạn phải chọn lớp!",
                        })}
                      >
                        <MenuItem
                          value={0}
                          sx={{ backgroundColor: "rgb(25 118 210 / 8%)" }}
                        >
                          <span style={{ color: "rgb(159, 159, 159)" }}>
                            Chọn lớp của bạn
                          </span>
                        </MenuItem>
                        <MenuItem value={6}>Lớp 6</MenuItem>
                        <MenuItem value={7}>Lớp 7</MenuItem>
                        <MenuItem value={8}>Lớp 8</MenuItem>
                        <MenuItem value={9}>Lớp 9</MenuItem>
                        <MenuItem value={10}>Lớp 10</MenuItem>
                        <MenuItem value={11}>Lớp 11</MenuItem>
                        <MenuItem value={12}>Lớp 12</MenuItem>
                      </Select>
                    </FormControl>
                    {errors.classNumber && (
                      <div className="auth-error-msg">
                        {errors.classNumber.message}
                      </div>
                    )}
                  </div>
                </div>
              </Grid>
            </Grid>
            <div className="auth-form-btn">
              <Button className="btn-submit" type="submit">
                Đăng ký ngay
              </Button>
            </div>
            <div className="divider">
              <Divider>HOẶC</Divider>
            </div>
            <div className="auth-form-btn">
              <Button
                className="btn-submit2"
                startIcon={
                  <Image
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
              <span>Bạn đã có tài khoản?</span>
              <span style={{ cursor: "pointer", color: "rgb(26, 218, 195)" }}>
                {" "}
                Đăng nhập ngay
              </span>
            </div>
          </DialogContent>
        </form>
      </Paper>
    </Modal>
  );
}

export default Register;

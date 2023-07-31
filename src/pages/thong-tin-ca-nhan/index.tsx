import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputBase,
  MenuItem,
  Paper,
  Popper,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
} from "@mui/material";

import {
  CameraAlt,
  ClassOutlined,
  EmailOutlined,
  Event,
  PersonOutline,
  SchoolOutlined,
} from "@mui/icons-material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { changeAvatar, updateUser } from "@/app/features/users/usersApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { UserInfor } from "@/types";
import ChangePassword from "@/components/ChangePassword";
import styles from "./profile.module.scss";

const Profile = () => {
  const dispatch = useAppDispatch();
  const userInfor = useAppSelector((state: RootState) => state.users.userInfor);
  const { loginStatus, updateStatus } = useAppSelector((state: RootState) => ({
    loginStatus: state.users.loginStatus,
    updateStatus: state.users.updateStatus,
  }));

  const [openAlert, setOpenAlert] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    reset,
  } = useForm<UserInfor>({
    defaultValues: userInfor,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openCalender = Boolean(anchorEl);
  const idPoperCalender = openCalender ? "simple-popper" : undefined;

  useEffect(() => {
    if (updateStatus === "failed" || updateStatus === "succeeded") {
      setOpenAlert(true);
    }
  }, [updateStatus]);

  const onSubmitUpdate = async (data: UserInfor) => {
    data.id = userInfor?.id === undefined ? "" : userInfor?.id;
    await dispatch(updateUser(data));
  };

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      let formData = new FormData();
      formData.append("avatar", event.target.files[0]);
      formData.append(
        "userId",
        userInfor?.id === undefined ? "" : userInfor?.id
      );
      dispatch(changeAvatar(formData));
    }
  };

  if (loginStatus === "succeeded") {
    return (
      <Container maxWidth="md">
        {/* alert */}
        <Snackbar
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          open={openAlert}
          autoHideDuration={3000}
          onClose={() => setOpenAlert(false)}
        >
          <div>
            {updateStatus === "failed" && (
              <Alert severity="error" sx={{ width: "100%" }} variant="filled">
                Cập nhật thất bại!
              </Alert>
            )}
            {updateStatus === "succeeded" && (
              <Alert severity="success" sx={{ width: "100%" }} variant="filled">
                Cập nhật thành công!
              </Alert>
            )}
          </div>
        </Snackbar>
        <div className={styles.profile_page}>
          <div className={styles.profile_page_title}>Thông tin cá nhân</div>
          <div className={styles.profile_page_box}>
            <form onSubmit={handleSubmit(onSubmitUpdate)}>
              <Grid container spacing={0}>
                {/* avatar */}
                <Grid item xs={12} md={4}>
                  <div className={styles.profile_page_box_avatar}>
                    <div style={{ position: "relative" }}>
                      <div className={styles.profile_image}>
                        <img src={userInfor?.avatar} alt="" />
                      </div>
                      <label className={styles.upload_button}>
                        <input
                          id="avatar"
                          autoComplete="avatar"
                          type="file"
                          accept=".png,.jpg"
                          onChange={handleChangeAvatar}
                          style={{
                            width: "0.1px",
                            height: "0.1px",
                            opacity: "0",
                            overflow: "hidden",
                            position: "absolute",
                          }}
                        />
                        <CameraAlt />
                      </label>
                    </div>
                  </div>
                  <div className={styles.profile_page_account}>
                    {userInfor?.username}
                  </div>
                </Grid>
                <Grid item xs={12} md={8}>
                  {/* thông tin */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <div className={styles.profile_page_box_item}>
                        <div className={styles.input_item}>
                          <InputBase
                            id="name"
                            autoComplete="name"
                            startAdornment={
                              <InputAdornment position="start">
                                <PersonOutline />
                              </InputAdornment>
                            }
                            fullWidth={true}
                            defaultValue={userInfor?.name}
                            {...register("name", { required: true })}
                          />
                          {errors.name?.type === "required" && (
                            <div className="auth-error-msg">
                              Vui lòng nhập trường này!
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={styles.profile_page_box_item}>
                        <div className={styles.input_item}>
                          <InputBase
                            id="birthday"
                            autoComplete="birthday"
                            placeholder="Chọn ngày sinh của bạn"
                            startAdornment={
                              <InputAdornment
                                position="start"
                                onClick={(e) =>
                                  setAnchorEl(anchorEl ? null : e.currentTarget)
                                }
                                sx={{
                                  cursor: "pointer",
                                }}
                              >
                                <Event />
                              </InputAdornment>
                            }
                            fullWidth={true}
                            defaultValue={userInfor?.birthday}
                            {...register("birthday")}
                            onClick={(e) =>
                              setAnchorEl(anchorEl ? null : e.currentTarget)
                            }
                          />
                          <Popper
                            id={idPoperCalender}
                            open={openCalender}
                            anchorEl={anchorEl}
                            placement="bottom"
                          >
                            <Paper>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar
                                  value={
                                    getValues("birthday")
                                      ? dayjs(
                                          getValues("birthday"),
                                          "DD/MM/YYYY"
                                        )
                                      : dayjs()
                                  }
                                  onChange={(newValue) =>
                                    setValue(
                                      "birthday",
                                      dayjs(newValue).format("DD/MM/YYYY")
                                    )
                                  }
                                />
                              </LocalizationProvider>
                            </Paper>
                          </Popper>
                        </div>
                      </div>
                      <div className={styles.profile_page_box_item}>
                        <div className={styles.input_item}>
                          <InputBase
                            id="school"
                            autoComplete="school"
                            placeholder="Nhập trường học của bạn"
                            startAdornment={
                              <InputAdornment position="start">
                                <SchoolOutlined />
                              </InputAdornment>
                            }
                            fullWidth={true}
                            defaultValue={userInfor?.school}
                            {...register("school")}
                          />
                        </div>
                      </div>
                      <div className={styles.profile_page_box_item}>
                        <div className={styles.input_item}>
                          <label>Giới tính</label>
                          <RadioGroup
                            id="sex"
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            defaultValue={userInfor?.sex}
                          >
                            <FormControlLabel
                              value={0}
                              control={<Radio />}
                              label="Female"
                              {...register("sex")}
                            />
                            <FormControlLabel
                              value={1}
                              control={<Radio />}
                              label="Male"
                              {...register("sex")}
                            />
                          </RadioGroup>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div className={styles.profile_page_box_item}>
                        <div className={styles.input_item}>
                          <InputBase
                            id="email"
                            autoComplete="email"
                            startAdornment={
                              <InputAdornment position="start">
                                <EmailOutlined />
                              </InputAdornment>
                            }
                            fullWidth={true}
                            defaultValue={userInfor?.email}
                            {...register("email", {
                              required: "Vui lòng nhập trường này!",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
                      <div className={styles.profile_page_box_item}>
                        <div className={styles.input_item}>
                          <InputBase
                            id="phone"
                            autoComplete="phone"
                            startAdornment={
                              <InputAdornment position="start">
                                <PersonOutline />
                              </InputAdornment>
                            }
                            fullWidth={true}
                            defaultValue={userInfor?.phone}
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
                      <div className={styles.profile_page_box_item}>
                        <div className={styles.input_item}>
                          <FormControl fullWidth variant="standard">
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Chọn lớp của bạn"
                              startAdornment={
                                <InputAdornment position="start">
                                  <ClassOutlined />
                                </InputAdornment>
                              }
                              defaultValue={userInfor?.classNumber}
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
                  {/* button */}
                  <div className={styles.button_change_password}>
                    <Button
                      size="medium"
                      onClick={() => setOpenChangePassword(true)}
                    >
                      Đổi mật khẩu
                    </Button>
                  </div>

                  <div className={styles.profile_page_box_button}>
                    <Button type="submit">Cập nhật</Button>
                  </div>
                </Grid>
              </Grid>
            </form>
            <ChangePassword
              openChangePassword={openChangePassword}
              setOpenChangePassword={setOpenChangePassword}
            />
          </div>
        </div>
      </Container>
    );
  } else {
    return (
      <Container>
        <div style={{ paddingTop: "100px", textAlign: "center" }}>
          <h2>Bạn phải đăng nhập để sử dụng chức năng này!</h2>
        </div>
      </Container>
    );
  }
};

export default Profile;




import { useEffect, useRef, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import appTheme from "../constants/colors";



export default function RetailerLogin() {
  const OTP_LENGTH = 6;

  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [error, setError] = useState(null);
  const [phone, setPhone] = useState("");
  const [viewState, setViewState] = useState("otpValidation");
  const { width } = useWindowDimensions();
  const isStacked = width < 900;
  const [hasResent, setHasResent] = useState(false);

  useEffect(() => {
    let timer = null;

    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      if (viewState === "otpValidation") {
        setError("OTP Expired. Please request a new one.");
      } else if (viewState === "accountLocked") {
        setError("Try again after cool down or contact Hero Support");
      } else if (viewState === "login") {
        setError("Mobile number not registered");
      }
    }

    let nextError = null;

    if (viewState === "accountLocked") {
      nextError = "Try again after cool down or contact Hero Support";
    } else if (timeLeft === 0) {
      if (viewState === "otpValidation") {
        nextError = "OTP Expired. Please request a new one.";
      } else if (viewState === "login") {
        nextError = "Mobile number not registered";
      }
    }

    setError(nextError);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, viewState]);

  const formatTime = (seconds) => {
    return `00:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle OTP Input
  const handleChange = (text, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    // Move to next input
    if (hasResent && timeLeft < 5) {
      setHasResent(false);
    }

    if (text && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace
  const handleBackspace = (text, index) => {
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Resend OTP
  const handleResend = () => {
    setTimeLeft(10);
    setOtp(new Array(OTP_LENGTH).fill(""));
    setHasResent(true);
    setError(null);
  };

  const viewStateChangeHandler = () => {
    setViewState("login");
    setError(null);
  };

  const actionButtonLabel =
    viewState === "login" ? "Send OTP" : "Verify OTP";

  return (
    <View style={[styles.container, isStacked && styles.containerStacked]}>
      {/* LEFT SIDE */}
      <View style={[styles.left, isStacked && styles.leftStacked]}>
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.logo}
        />
      </View>

      {/* RIGHT SIDE */}
      <View style={[styles.right, isStacked && styles.rightStacked]}>
        <View style={styles.innerContainer}>
          <View style={styles.viewContent}>
            {viewState === "login" && (
              <>
                <Text style={styles.heading}>Welcome Back !</Text>

                <Text style={styles.subHeading}>
                  Enter your registered mobile number to continue
                </Text>

                <View style={styles.fullWidth}>
                    <TextInput label="Mobile Number" value={phone} onChangeText={setPhone} />
                  
                </View>
              </>
            )}

            {viewState === "otpValidation" && (
              <>
                <Text style={styles.heading}>Enter OTP</Text>

                <View style={styles.phoneContainer}>
                  <Text style={styles.subHeading}>
                    Sent to +91 8645******
                  </Text>
                </View>

                <TouchableOpacity onPress={viewStateChangeHandler}>
                  <Text style={styles.changeNumber}>Change Number</Text>
                </TouchableOpacity>

                <View style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={(ref) => {
                        if (ref) inputRefs.current[index] = ref;
                      }}
                      value={digit}
                      onChangeText={(text) => handleChange(text, index)}
                      onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === "Backspace") {
                          handleBackspace(digit, index);
                        }
                      }}
                      keyboardType="number-pad"
                      maxLength={1}
                      style={[
                        styles.otpInput,
                        timeLeft < 6 &&
                          !hasResent && {
                            borderColor:
                              appTheme.COLORS.colorF03726,
                          },
                      ]}
                    />
                  ))}
                </View>

                <View style={styles.timerRow}>
                  <Text style={styles.expireText}>
                    {timeLeft === 0 ? " OTP Expired" : " Expires in"}{" "}
                    <Text style={styles.timer}>
                      {formatTime(timeLeft)}
                    </Text>
                  </Text>

                  <TouchableOpacity
                    disabled={timeLeft !== 0}
                    onPress={handleResend}
                  >
                    <Text
                      style={[
                        styles.resendText,
                        { opacity: timeLeft === 0 ? 1 : 0.5 },
                      ]}
                    >
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {viewState === "accountLocked" && (
              <>
                <View style={styles.fullWidth}>
                  <Text style={styles.heading}>Account Locked</Text>

                  <Text style={styles.subHeading}>
                    Too Many Failed Attempts. Your Account has been
                    locked for security reasons.
                  </Text>

                  <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>
                      {formatTime(timeLeft)}
                    </Text>
                  </View>

                  <Text style={styles.timeRemainingText}>
                    {" "}
                    Time Remaining to unlock
                  </Text>
                </View>
              </>
            )}

            <View style={styles.errorMargin}>
              {error && (
                <View style={styles.errorContainer}>
                  

                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {viewState !== "accountLocked" && (
                <Pressable style={styles.button} onPress={() => {}}>
                  <Text style={styles.buttonText}>
                    {actionButtonLabel}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 80,
    paddingVertical: 60,
    gap: 30,
  },

  containerStacked: {
    flexDirection: "column",
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 16,
  },

  left: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },

  leftStacked: {
    width: "100%",
    minHeight: 180,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  logo: {
    width: 200,
    height: 60,
    resizeMode: "contain",
  },

  right: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
    backgroundColor: "#fff",
  },

  rightStacked: {
    width: "100%",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },

  innerContainer: {
    width: "100%",
    maxWidth: 420,
    minHeight: 520,
    padding: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  viewContent: {
    width: "100%",
  },

  fullWidth: {
    width: "100%",
    marginTop: 30,
  },

  heading: {
    fontSize: 26,
    marginBottom: 10,
    textAlign: "left",
    fontFamily: appTheme.FONT_FAMILY.ArchivoBold,
    color: appTheme.COLORS.color1E1E1E,
  },

  subHeading: {
    fontSize: appTheme.SIZES.fontSizeS,
    fontFamily: appTheme.FONT_FAMILY.archivoRegular,
    color: appTheme.COLORS.color1E1E1E,
  },

  timerContainer: {
    marginTop: 50,
    backgroundColor: appTheme.COLORS.colorFFFFFF,
    borderRadius: 8,
    borderColor: appTheme.COLORS.colorDEDEDE,
    borderWidth: 1,
    width: 80,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  timerText: {
    fontSize: 20,
    fontFamily: appTheme.FONT_FAMILY.archivoRegular,
    color: appTheme.COLORS.color1E1E1E,
  },

  timeRemainingText: {
    paddingTop: 8,
    fontSize: appTheme.SIZES.fontSizeXS,
    fontFamily: appTheme.FONT_FAMILY.archivoRegular,
    color: appTheme.COLORS.color1E1E1E,
  },

  errorContainer: {
    width: "100%",
    padding: 12,
    flexDirection: "row",
    borderRadius: 8,
    borderColor: appTheme.COLORS.colorF03726,
    borderWidth: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 1,
  },

  errorMargin: {
    marginTop: 50,
    marginBottom: 2,
  },

  errorText: {
    fontSize: appTheme.SIZES.fontSizeXS,
    fontFamily: appTheme.FONT_FAMILY.archivoRegular,
    color: appTheme.COLORS.color000000,
  },

  phoneContainer: {
    padding: 8,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
    borderRadius: 8,
    backgroundColor: appTheme.COLORS.colorF4F8FC,
  },

  changeNumber: {
    fontSize: appTheme.SIZES.fontSizeXS,
    color: appTheme.COLORS.color1E1E1E,
    textDecorationLine: "underline",
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
    gap: 10,
  },

  otpInput: {
    width: 45,
    height: 42,
    borderWidth: 1,
    borderColor: appTheme.COLORS.color888888,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: appTheme.COLORS.colorFFFFFF,
  },

  timerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    alignItems: "center",
  },

  expireText: {
    fontSize: appTheme.SIZES.fontSizeXS,
    color: appTheme.COLORS.color1E1E1E,
  },

  timer: {
    color: "red",
    fontWeight: "600",
  },

  resendText: {
    fontSize: 12,
    color: appTheme.COLORS.color545454,
    textDecorationLine: "underline",
  },

  verifyButton: {
    marginTop: 6,
    backgroundColor: "#9E9E9E",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  verifyText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  button: {
    backgroundColor: appTheme.COLORS.color1E1E1E,
    padding: 16,
    borderRadius: 8,
    marginTop: 4,
    alignItems: "center",
  },

  buttonText: {
    color: appTheme.COLORS.colorFFFFFF,
    fontSize: 18,
    fontFamily: appTheme.FONT_FAMILY.ArchivoBold,
  },
});
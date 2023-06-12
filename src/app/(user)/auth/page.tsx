"use client";
import { useEffect, useState } from "react";
import SendOtpForm from "@/app/(user)/auth/SendOtpForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOtp, getOtp } from "@/services/AuthServices";
import toast from "react-hot-toast";
import CheckOtpForm from "@/app/(user)/auth/CheckOtpForm";
import { useRouter } from "next/navigation";

const RESEND_TIME = 90;

const AuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState();
  const [time, setTime] = useState(RESEND_TIME);
  const queryClient = useQueryClient();

  const router = useRouter();

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((s) => s - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);
  const { data: otpMessage, mutateAsync: mutateGetOtp } = useMutation({
    mutationFn: getOtp,
  });
  const { mutateAsync: mutateCheckOtp } = useMutation({
    mutationFn: checkOtp,
  });

  const phoneHandler = (e: any) => {
    setPhoneNumber(e.target.value);
  };

  const sendOtpHandler = async (e: any) => {
    e.preventDefault();
    try {
      const data = await mutateGetOtp(phoneNumber);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setStep(2);
      setTime(RESEND_TIME);
    }
  };
  const checkOtpHandler = async (e: any) => {
    e.preventDefault();
    try {
      const { message, user } = await mutateCheckOtp({ phoneNumber, otp });
      toast.success(message);
      if (user.isActive) {
        router.push("/");
        queryClient.invalidateQueries({ queryKey: ["getUser"] });
      } else {
        router.push("/complete-profile");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const backHandler = () => {
    setStep((s) => s - 1);
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SendOtpForm
            PhoneNumber={phoneNumber}
            onChange={phoneHandler}
            onSubmit={sendOtpHandler}
          />
        );
      case 2:
        return (
          <CheckOtpForm
            onSubmit={checkOtpHandler}
            otp={otp}
            setOtp={setOtp}
            time={time}
            onBack={backHandler}
            onResendOtp={sendOtpHandler}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">{renderStep()}</div>
    </div>
  );
};

export default AuthScreen;

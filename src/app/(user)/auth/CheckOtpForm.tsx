import OtpInput from "react-otp-input";

const CheckOtpForm = ({
  onSubmit,
  otp,
  setOtp,
  time,
  onBack,
  onResendOtp,
}: any) => {
  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-4">
        <button onClick={onBack}>برگشت</button>
        <div>
          {time ? (
            <p> تا ارسال مجدد کد{time}</p>
          ) : (
            <button onClick={onResendOtp}>ارسال مجدد کد؟</button>
          )}
        </div>
        <p>کد تایید را وارد کنید</p>
        <OtpInput
          value={otp}
          onChange={setOtp}
          inputStyle={{
            width: "2.5rem",
            padding: "0.5rem 0.2rem",
            border: "1px solid rgb(var(--color-primary-300))",
            borderRadius: ".5rem",
          }}
          containerStyle="flex gap-x-2 justify-center"
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <span></span>}
        />
        <button type={"submit"} className="btn btn--primary w-full">
          تایید
        </button>
      </form>
    </div>
  );
};

export default CheckOtpForm;

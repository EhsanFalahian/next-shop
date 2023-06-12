import TextField from "@/common/TextField";

const SendOtpForm = ({ PhoneNumber, onChange, onSubmit }: any) => {
  return (
    <div className="">
      <form className="space-y-8" onSubmit={onSubmit}>
        <TextField
          value={PhoneNumber}
          name={"PhoneNumber"}
          label={"شماره موبایل"}
          id={"phoneNumber"}
          onchange={onChange}
        />
        <button type={"submit"} className="btn btn--primary w-full">
          ارسال کد تایید
        </button>
      </form>
    </div>
  );
};

export default SendOtpForm;

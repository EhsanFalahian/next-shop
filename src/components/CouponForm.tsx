import TextField from "@/common/TextField";
import RadioInput from "@/common/RadioInput";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";
import Loading from "@/common/Loading";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const CouponForm = ({
  formData,
  handleChange,
  type,
  setType,
  products,
  setProduct,
  handleSubmit,
  expireDate,
  setExpireDate,
  isLoading,
  defaultValue = "",
}) => {
  return (
    <form className="max-w-sm space-y-4" onSubmit={handleSubmit}>
      <TextField
        value={formData.code}
        label="کد"
        name="code"
        onchange={handleChange}
      />
      <TextField
        value={formData.amount}
        label="مقدار"
        name="amount"
        onchange={handleChange}
      />
      <TextField
        value={formData.usageLimit}
        label="ظرفیت"
        name="usageLimit"
        onchange={handleChange}
      />
      <div>
        <RadioInput
          id="percent"
          label="درصد"
          name="type"
          value="percent"
          onChange={(e) => setType(e.target.value)}
          checked={type === "percent"}
        />
        <RadioInput
          id="fixedProduct_type"
          label="قیمت ثابت"
          name="type"
          value="fixedProduct"
          onChange={(e) => setType(e.target.value)}
          checked={type === "fixedProduct"}
        />
      </div>
      <Select
        isMulti
        onChange={setProduct}
        options={products}
        getOptionLabel={(option) => option.title}
        getOptionValue={(option) => option._id}
        defaultValue={defaultValue}
      />
      <DatePicker
        value={expireDate}
        onChange={setExpireDate}
        calendar={persian}
        locale={persian_fa}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <button type={"submit"} className="btn btn--primary w-full">
          تایید
        </button>
      )}
    </form>
  );
};
export default CouponForm;

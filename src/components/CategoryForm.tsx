import TextField from "@/common/TextField";

const categoriesFormData = [
  {
    id: 1,
    label: "عنوان",
    name: "title",
  },
  {
    id: 2,
    label: "عنوان انگلیسی",
    name: "englishTitle",
  },
  {
    id: 3,
    label: "توضیحات",
    name: "description",
  },
  {
    id: 4,
    label: "نوع",
    name: "type",
  },
];

const CategoryForm = ({ onSubmit, categoryData, categoryDataOnChange }) => {
  return (
    <div className="max-w-sm">
      <form className="space-y-4" onSubmit={onSubmit}>
        {categoriesFormData.map((item) => (
          <TextField
            key={item.id}
            value={categoryData[item.name]}
            onchange={categoryDataOnChange}
            label={item.label}
            name={item.name}
          />
        ))}
        <button type={"submit"} className="btn btn--primary w-full mt-8">
          تایید
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;

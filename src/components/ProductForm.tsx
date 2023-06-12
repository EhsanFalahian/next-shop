import TextField from "@/common/TextField";
import { TagsInput } from "react-tag-input-component";
import Select from "react-select";

const productsFormData = [
  {
    id: 1,
    label: "عنوان",
    name: "title",
  },
  {
    id: 2,
    label: "توضیحات",
    name: "description",
  },
  {
    id: 3,
    label: "اسلاگ",
    name: "slug",
  },
  {
    id: 4,
    label: "برند",
    name: "brand",
  },
  {
    id: 5,
    label: "قیمت",
    name: "price",
  },
  {
    id: 6,
    label: "تخفیف",
    name: "discount",
  },
  {
    id: 7,
    label: "قیمت روی تخفیف",
    name: "offPrice",
  },
  {
    id: 8,
    label: "موجودی",
    name: "countInStock",
  },
  {
    id: 9,
    label: "لینک عکس محصول",
    name: "imageLink",
  },
];

const ProductForm = ({
  onSubmit,
  productData,
  productDataChange,
  tags,
  setTags,
  setSelectedCategory,
  categories,
  selectedValue = "",
}) => {
  return (
    <div className="max-w-sm">
      <form onSubmit={onSubmit}>
        {productsFormData.map((item) => {
          return (
            <TextField
              key={item.id}
              label={item.label}
              name={item.name}
              value={productData[item.name]}
              onchange={productDataChange}
            />
          );
        })}
        <div>
          <label htmlFor="tags">تگ محصولات</label>
          <TagsInput id="tags" value={tags} onChange={setTags} name="tags" />
        </div>
        <div>
          <label htmlFor="category">دسته بندی</label>
          <Select
            id="category"
            onChange={setSelectedCategory}
            options={categories}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option._id}
            defaultValue={selectedValue}
          />
        </div>
        <button type={"submit"} className="btn btn--primary w-full mt-8">
          تایید
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

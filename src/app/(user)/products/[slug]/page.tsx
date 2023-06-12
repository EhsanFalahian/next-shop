import { getProductDetail, getProducts } from "@/services/ProductServices";
import AddToCart from "@/app/(user)/products/[slug]/AddToCart";
import {
  persianNumberWithCommas,
  ToPersianNumber,
} from "@/utils/toPersianNumber";
export const dynamic = "force-static";
export const dynamicParams = false;
const Page = async ({ params }) => {
  const { slug } = params;
  const { product } = await getProductDetail(slug);
  return (
    <div>
      <h1 className="font-bold text-xl mb-6">{product.title}</h1>
      <p className="mb-6">{product.description}</p>
      <p className="mb-6">
        قیمت محصول:{" "}
        <span className={`${product.discount ? "line-through" : "font-bold"}`}>
          {persianNumberWithCommas(product.price)}
        </span>
      </p>
      {!!product.discount && (
        <div className="flex items-center gap-x-2 mb-6">
          <p className="text-xl font-bold">
            قیمت با تخفیف :{persianNumberWithCommas(product.offPrice)}
          </p>
          <div className="py-0.5 px-2 items-center bg-rose-500 rounded-xl text-white text-sm">
            {ToPersianNumber(product.discount)} %
          </div>
        </div>
      )}
      <AddToCart product={product} />
    </div>
  );
};

export default Page;

export async function generateStaticParams() {
  const { products } = await getProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

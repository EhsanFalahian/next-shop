import { getCategories } from "@/services/CategoryServices";
import { getProducts } from "@/services/ProductServices";
import CategorySidebar from "@/app/(user)/products/CategorySidebar";
import queryString from "query-string";
import { ToLocalDate } from "@/utils/toLocalDate";
import Link from "next/link";
import AddToCart from "@/app/(user)/products/[slug]/AddToCart";
import { cookies } from "next/headers";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import LikeProduct from "@/app/(user)/products/LikeProduct";
import { toStringCookies } from "@/utils/toStringCookies";

export const dynamic = "force-dynamic";

const Product = async ({ searchParams }) => {
  const { categories } = await getCategories();
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);
  const { products } = await getProducts(
    queryString.stringify(searchParams),
    strCookies
  );

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">صفحه محصولات</h1>
      <div className="grid grid-cols-4">
        <CategorySidebar categories={categories} />
        <div className="col-span-3 grid grid-cols-4 gap-4">
          {products.map((product: any) => (
            <div
              className="shadow-md col-span-1 p-4 rounded border"
              key={product._id}
            >
              <h2 className="font-bold mb-4">{product.title}</h2>
              <div className="mb-4">
                <span>تاریخ ساختن :</span>
                <span className="font-bold">
                  {ToLocalDate(product.createdAt)}
                </span>
              </div>
              <Link
                className="text-primary-800 font-bold"
                href={`/products/${product.slug}`}
              >
                مشاهده جزییات
              </Link>
              <LikeProduct product={product} />
              <AddToCart product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;

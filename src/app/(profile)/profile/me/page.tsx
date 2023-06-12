"use client";
import { useGetUser } from "@/hooks/useAuth";
import { IncludeObj } from "@/utils/objectUtils";
import TextField from "@/common/TextField";
import { useEffect, useState } from "react";
import Loading from "@/common/Loading";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/services/AuthServices";
import toast from "react-hot-toast";

const MePage = () => {
  const { data, isLoading } = useGetUser();
  const { isLoading: isUpdating, mutateAsync } = useMutation({
    mutationFn: updateProfile,
  });
  const { user } = data || {};
  const includesKey = ["biography", "name", "email", "phoneNumber"];
  const [formData, setFormData] = useState<any>({});
  useEffect(() => {
    setFormData(IncludeObj(user, includesKey));
  }, [user]);

  const updateHandler = async (e: any) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync(formData);
      toast.success(message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <h1>اطلاعات کاربری</h1>
      <form onSubmit={updateHandler} className="max-w-sm">
        {Object.keys(IncludeObj(user, includesKey)).map((key) => {
          return (
            <TextField
              value={formData[key] || ""}
              name={key}
              label={key}
              key={key}
              id={key}
              onchange={(e: any) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          );
        })}
        <div className="mt-8">
          {isUpdating ? (
            <Loading />
          ) : (
            <button type={"submit"} className="btn btn--primary w-full">
              آپدیت پروفایل
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MePage;

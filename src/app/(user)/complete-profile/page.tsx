"use client";
import TextField from "@/common/TextField";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeProfile, getOtp } from "@/services/AuthServices";

const CompleteProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: completeProfile,
  });
  const completeProfileHandler = async (e: any) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({ name, email });
      toast.success(message);
      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">
        <form className="space-y-8" onSubmit={completeProfileHandler}>
          <TextField
            name="email"
            label="نام و  نام خانوادگی"
            id={"name"}
            value={name}
            onchange={(e: any) => setName(e.target.value)}
          />
          <TextField
            name="name"
            label="ایمیل"
            id={"email"}
            value={email}
            onchange={(e: any) => setEmail(e.target.value)}
          />
          <button type={"submit"} className="btn btn--primary w-full">
            تایید
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;

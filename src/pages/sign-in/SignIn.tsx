import React from "react";
import Facebook from "@/assets/faceboook.svg";
import Google from "@/assets/google.svg";
import { Form, Input } from "antd";
import { PatternFormat } from "react-number-format";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full container mx-auto mt-12 relative flex items-center justify-center">
      <div className="absolute top-0 left-0">
        <button
          className="bg-slate-200 dark:bg-[#111] w-16 h-16 rounded-[12px] cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <LeftOutlined style={{ fontSize: 18, color: "red" }} />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-[32px] leading-[38px] font-medium">Sign In</h2>
        <p className="text-[16px] leading-[24px] text-[#777777] mt-4 mb-8">
          Enter your phone number to log in or sign up.
        </p>

        <Form
          name="basic"
          autoComplete="off"
          layout="inline"
          className="w-full flex flex-col gap-5 justify-center items-center"
        >
          <Form.Item
            name="number"
            rules={[
              { required: true, message: "Telefon raqamni kiriting!" },
              {
                validator: (_, value) =>
                  /^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(value || "")
                    ? Promise.resolve()
                    : Promise.reject("Telefon raqamni to'liq kiriting!"),
              },
            ]}
          >
            <div className="relative">
              <img
                src="https://flagcdn.com/w20/uz.png"
                alt="uzb-flag"
                className="absolute z-10 left-4 rounded-full w-6 h-6 top-1/2 -translate-y-1/2"
              />

              <PatternFormat
                format="+998 ## ### ## ##"
                allowEmptyFormatting
                mask="_"
                customInput={Input}
                style={{
                  backgroundColor: "var(--card-bg)",
                  border: "none",
                  color: "var(--card-text)",
                  width: "380px",
                  height: "64px",
                  borderRadius: "12px",
                  paddingLeft: "52px",
                }}
              />
            </div>
          </Form.Item>

          <Form.Item label={null} className="w-full flex justify-center">
            <button
              className="cursor-pointer text-[16px] dark:text-white  leading-5 font-medium px-[140px] py-4 bg-[#C61F1F] rounded-[12px] w-[380px]"
              //   htmlType="submit"
            >
              Registration
            </button>
          </Form.Item>
        </Form>

        {/* <form
          action=""
          className="flex flex-col items-center justify-center gap-6"
        >
          <input
            type="text"
            placeholder="Phone number"
            className="dark:bg-[#111] bg-slate-200 w-[380px] h-16 rounded-[12px] py-5 px-4"
          />
          <button className="cursor-pointer text-[16px] leading-5 font-medium px-[140px] py-4 bg-[#C61F1F] rounded-[12px] w-[380px]">
            Registration
          </button>
        </form> */}

        <p className="text-[16px] leading-[24px] text-[#777777] my-6">or</p>

        <div className="flex items-center justify-center gap-2">
          <button className="cursor-pointer px-10 py-5 dark:bg-[#111] bg-slate-200 rounded-[12px] w-[186px] flex items-center justify-center gap-2">
            <img src={Facebook} alt="Facebook" />
            <h4 className="text-[16px] leading-5 font-medium">Facebook</h4>
          </button>
          <button className="cursor-pointer px-10 py-5 dark:bg-[#111] bg-slate-200 rounded-[12px] w-[186px] flex items-center justify-center gap-2">
            <img src={Google} alt="Google" />
            <h4 className="text-[16px] leading-5 font-medium">Google</h4>
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SignIn);

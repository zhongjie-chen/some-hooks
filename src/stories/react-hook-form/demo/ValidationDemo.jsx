import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Input,
  InputNumber,
} from "antd";
import "antd/dist/antd.css";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

/**
 * 可以拿到错误的状态，自定义错误的展示。
 * antd不好自定义错误的展示。
 *（比如两个字段 【扩展科目】【学科类科目】 在展示逻辑上都属于【教学科目】，要把这两个一个必填的校验，错误展示都放在教学科目上）
 *
 */
const ValidationDemo = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm({
    mode: "onChange",
  });
  return (
    <div>
      <Divider />
      <div>
        <Controller
          name="name"
          control={control}
          rules={{
            required: "name必填",
            minLength: { value: 2, message: "最小长度2" },
            maxLength: { value: 10, message: "最大长度10" },
          }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="姓名，最小2个字符串，最大10个字符串"
            />
          )}
        />
        <ErrorMessage errors={errors} name="name" />
      </div>
      <div>
        <Controller
          name="age"
          control={control}
          rules={{
            required: "年龄必填",
            min: { value: 3, message: "最小年龄3岁" },
            max: { value: 10, message: "最大年龄10岁" },
          }}
          render={({ field }) => (
            <InputNumber {...field} placeholder="年龄3-10岁" />
          )}
        />
        <ErrorMessage errors={errors} name="age" />
      </div>
      <div>
        <span>年龄范围：</span>
        <Controller
          name="minAge"
          control={control}
          render={({ field }) => (
            <InputNumber
              {...field}
              onChange={(e) => {
                field.onChange(e);
                trigger("maxAge");
              }}
            />
          )}
        />
        <span>-</span>
        <Controller
          name="maxAge"
          control={control}
          render={({ field }) => <InputNumber {...field} />}
          rules={{
            validate: () =>
              Number(getValues("minAge")) <= Number(getValues("maxAge")) ||
              "最大年龄不能小于最小年龄",
          }}
        />
      </div>
      <ErrorMessage errors={errors} name="minAge" />
      <ErrorMessage errors={errors} name="maxAge" />
      <div>
        <Button
          onClick={handleSubmit(
            (data) => {
              console.log({ data });
            },
            (errors) => {
              console.error({ errors });
            }
          )}
        >
          提交
        </Button>
      </div>
    </div>
  );
};

export default ValidationDemo;

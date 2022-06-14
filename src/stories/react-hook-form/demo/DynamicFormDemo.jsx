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
import { Controller, useFieldArray, useForm } from "react-hook-form";

/**
 *  纯粹hook实现动态表单
 *  
 *  这个写一遍后续可以默写出来，
 *  antd需要每次看文档（上面大量需要注意的事项，以及实现某种功能的特殊写法，坑）。
 */
const DynamicFormDemo = () => {
  const { control, handleSubmit, watch } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "teachers",
    }
  );
  return (
    <div>
      <Divider />
      <div>
        {fields.map((item, index) => {
          return (
            <div key={item.id}>
              <div>
                <span>名字{index}：</span>
                <Controller
                  name={`teachers.${index}.name`}
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </div>
              <div>
                <span>年龄{index}：</span>
                <Controller
                  name={`teachers.${index}.age`}
                  control={control}
                  render={({ field }) => <InputNumber {...field} />}
                />
              </div>
              <Button
                onClick={() => {
                  remove(index);
                }}
              >
                删除
              </Button>
              <Divider />
            </div>
          );
        })}
      </div>
      <Button
        style={{ marginTop: 20 }}
        onClick={() => {
          append({});
        }}
      >
        新增
      </Button>
      <div style={{ marginTop: 20 }}>
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

export default DynamicFormDemo;

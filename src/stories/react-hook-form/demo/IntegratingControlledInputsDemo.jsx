import { Button, Checkbox, DatePicker, Divider, Input } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { Controller, useForm } from "react-hook-form";

/**
 * 相对于antd更加专业、扩展性更强。
 *
 * antd FormItem有些场景不好满足：比如表单嵌套，不需要栅格布局等。
 *
 * antd FormItem做的事情过多。
 *
 * react-hook-form 纯表单逻辑，无UI组件依赖，可以做到多端统一使用，更加自由。
 *
 */
const IntegratingControlledInputsDemo = () => {
  const { control, handleSubmit, watch } = useForm();
  const watchName = watch("name");
  return (
    <div>
      <Divider />
      <div>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={(e) => {
                /**
               * 
                    var getEventValue = (event) => isObject(event) && event.target
                        ? isCheckBoxInput(event.target)
                            ? event.target.checked
                            : event.target.value
                        : event;
               */
                field.onChange(e);
              }}
              onBlur={field.onBlur}
            />
          )}
        />
        <p>watchName: {watchName}</p>
      </div>
      <div>
        <Controller
          name="checkbox"
          control={control}
          render={({ field }) => <Checkbox {...field} />}
        />
      </div>
      <div>
        <Controller
          name="checkboxGroup"
          control={control}
          render={({ field }) => (
            <Checkbox.Group
              options={[
                { label: "Apple", value: "Apple" },
                { label: "Pear", value: "Pear" },
                { label: "Orange", value: "Orange" },
              ]}
              {...field}
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="datePicker"
          control={control}
          render={({ field }) => <DatePicker {...field} />}
        />
      </div>
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

export default IntegratingControlledInputsDemo;

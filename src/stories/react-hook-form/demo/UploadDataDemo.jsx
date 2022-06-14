import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Input,
  InputNumber,
  message,
  Upload,
} from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useFormState } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const UploadDataDemo = () => {
  const {
    control,
    handleSubmit,
    formState: { isDirty, dirtyFields, touchedFields },
  } = useForm({
    defaultValues: {},
  });
  console.log("rendering....");
  return (
    <div>
      <Divider />
      {/* 方式一、 这种写法需要在数据提交和初始化的时候做转换 */}
      <Controller
        control={control}
        name="url"
        render={({ field }) => {
          console.log("url1 rendering....");
          const props = {
            name: "file",
            action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
            headers: {
              authorization: "authorization-text",
            },
            onChange(info) {
              field.onChange(info.fileList);
              if (info.file.status !== "uploading") {
              }
              if (info.file.status === "done") {
                console.log(info);
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
            onRemove(file) {},
          };
          props.fileList = field.value;
          return (
            <p>
              上传文件1：
              <Upload {...props}>
                <Button>Click to Upload</Button>
              </Upload>
            </p>
          );
        }}
      />
      {/* 方式二、 封装Upload组件，既保留原有的上传逻辑，也能结合表单组件 */}
      <Controller
        control={control}
        name="url2"
        render={({ field }) => {
          console.log("url2 rendering....");
          const props = {
            name: "file",
            action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
            headers: {
              authorization: "authorization-text",
            },
          };
          return (
            <p>
              上传文件2：
              <UploadV2 {...props} {...field}>
                <Button>Click to Upload</Button>
              </UploadV2>
            </p>
          );
        }}
        defaultValue={[
          "https://pics3.baidu.com/feed/3801213fb80e7bec8fd5f0c1321378319b506b4e.jpeg?token=437624ca412993dbb9a1501015dab392",
        ]}
      />
      {/* 方式三、 恶心的数据转换，resources:[ {url: 'http://xxx', type: 4, ... } ] */}
      <Controller
        control={control}
        name="scope.resources"
        render={({ field }) => {
          console.log("url2 rendering....");
          const props = {
            name: "file",
            action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
            headers: {
              authorization: "authorization-text",
            },
          };
          return (
            <p>
              上传文件3：
              <UploadV2
                {...props}
                /**
                 * 以下转换逻辑可单独抽离
                 */
                onChange={(v) => {
                  field.onChange(v.map((x) => ({ url: x, type: 4 })));
                }}
                value={(field.value || []).map((x) => x.url)}
              >
                <Button>Click to Upload</Button>
              </UploadV2>
            </p>
          );
        }}
      />
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

function UploadV2({ value, onChange, ...props }) {
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (value) {
      setFileList(
        value.map((x, i) => ({
          uid: i + x,
          name: x,
          status: "done",
          url: x,
        }))
      );
    }
    console.log(value);
  }, [value]);
  return (
    <Upload
      fileList={fileList}
      onChange={(info) => {
        setFileList(info.fileList);
        if (info.file.status !== "uploading") {
        }
        if (info.file.status === "done") {
          console.log(info);
          onChange(info.fileList.map((x) => x.url || x.response.url));
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      }}
      onRemove={(file) => {
        // TODO
      }}
      {...props}
    />
  );
}

export default UploadDataDemo;

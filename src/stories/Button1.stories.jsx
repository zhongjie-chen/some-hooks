import React from "react";

// import { Button } from './Button';
const Button = () => {
  return <div>123</div>;
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Hooks",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
  },
};

const Template = (args) => <Button {...args} />;

export const UseUpdate = <Button />;
// Primary.args = {
//   primary: true,
//   label: "Button",
// };

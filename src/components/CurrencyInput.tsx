import { InputNumber, InputNumberProps } from "antd";
import * as React from "react";

interface CurrencyInputProps extends InputNumberProps {
  currency?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  currency,
  ...props
}) => {
  return (
    <InputNumber
      placeholder="Enter amount"
      min={0}
      className="w-full"
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {...props}
    />
  );
};

export default CurrencyInput;

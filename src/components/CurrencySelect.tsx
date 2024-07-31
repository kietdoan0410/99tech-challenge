import { Flex, Select, SelectProps, Space } from "antd";
import * as React from "react";
import currencyIcons from "../assets/currencyIcons";

interface CurrencySelectProps extends SelectProps {}

const CurrencySelect: React.FC<CurrencySelectProps> = (props) => {
  return (
    <Select
      placeholder="Choose token"
      className="w-full"
      fieldNames={{ label: "currency", value: "currency" }}
      labelRender={(labelProps) => (
        <Flex gap={8}>
          <img src={currencyIcons[props.value]} alt="" />{labelProps.label}
        </Flex>
      )}
      optionRender={(option) => (
        <Flex gap={8}>
          <img src={currencyIcons[option.data.currency as string]} alt="" />
          {option.data.currency}
        </Flex>
      )}
      {...props}
    />
  );
};

export default CurrencySelect;

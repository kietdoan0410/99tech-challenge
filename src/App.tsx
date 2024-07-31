import { useMemoizedFn, useRequest } from "ahooks";
import {
  Button,
  Form,
  Input,
  Result,
  Skeleton,
  Typography,
  message,
  notification,
} from "antd";
import React, { useEffect, useMemo } from "react";
import "tailwindcss/tailwind.css";
import CurrencyInput from "./components/CurrencyInput";
import CurrencySelect from "./components/CurrencySelect";
import { fetchTokenInfo, mockService } from "./service/fetchTokenInfo";

const { Title, Text } = Typography;

const App: React.FC = () => {
  const [form] = Form.useForm();
  const {
    data: currencies = [],
    error,
    loading: fetchingCurrencies,
  } = useRequest(fetchTokenInfo, {});

  const getPrice = useMemoizedFn((currency: string): number | undefined => {
    const entry = currencies?.find((item) => item.currency === currency);
    return entry?.price;
  });

  const inputAmount = Form.useWatch("inputAmount", form);
  const inputToken = Form.useWatch("inputToken", form);
  const outputToken = Form.useWatch("outputToken", form);

  const convertedAmount = useMemo(() => {
    if (inputAmount !== undefined && inputToken && outputToken) {
      const inputTokenPrice = getPrice(inputToken);
      const outputTokenPrice = getPrice(outputToken);

      if (inputTokenPrice && outputTokenPrice) {
        return ((inputAmount * inputTokenPrice) / outputTokenPrice).toFixed(2);
      }
    }

    return undefined;
  }, [inputAmount, inputToken, outputToken, getPrice]);

  useEffect(() => {
    form.setFieldValue("outputAmount", convertedAmount);
  }, [convertedAmount, form]);

  const { run: handleSubmit, loading: isSubmitting } = useRequest(mockService, {
    manual: true,
    onSuccess: (...args) => {
      notification.success({
        message: "Swap Successful",
        description: `Swapped ${inputAmount} ${inputToken} to ${convertedAmount} ${outputToken}.`,
      });
      form.resetFields();
    },
    onError: () => {
      notification.error({
        message: "Swap Failed",
        description:
          "Please check your input to make sure you put right information",
      });
    },
  });

  if (fetchingCurrencies) {
    return <Skeleton active />;
  }
  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
      />
    );
  }

  return (
    <div className="bg-page-bg bg-cover bg-center h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto p-6 bg-box-bg rounded-lg shadow-xl w-2/12">
        <Title level={1} className=" gradient-text font-oxanium">
          Currency Swap
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={() => message.warning("Please fill the form")}
          className="gap-2 flex flex-col"
        >
          <Text className=" text-3xl font-bold text-primary font-oxanium">
            Trade
          </Text>
          <Form.Item
            label={
              <Text className="text-sm font-medium text-secondary font-mono">
                Token Name
              </Text>
            }
            rootClassName=""
            name="inputToken"
            rules={[
              {
                required: true,
                message: "Please select or insert an input token",
              },
            ]}
            className="text-sm font-medium text-secondary font-mono"
          >
            <CurrencySelect options={currencies} />
          </Form.Item>
          <Form.Item
            label={
              <Text className="text-sm font-medium text-secondary font-mono">
                Amount to trade
              </Text>
            }
            name="inputAmount"
            rules={[
              { required: true, message: "Please enter a positive amount" },
            ]}
            initialValue={0}
          >
            <CurrencyInput currency={inputToken} />
          </Form.Item>
          <Text className="text-3xl font-bold  text-primary font-oxanium">
            For
          </Text>
          <Form.Item
            label={
              <Text className="text-sm font-medium text-secondary font-mono">
                Token Name
              </Text>
            }
            name="outputToken"
            rules={[
              {
                required: true,
                message: "Please select or insert an output token",
              },
            ]}
          >
            <CurrencySelect options={currencies} />
          </Form.Item>
          <Form.Item
            label={
              <Text className="text-sm font-medium text-secondary font-mono">
                Amount to receive
              </Text>
            }
            name="outputAmount"
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="w-full bg-custom-gradient"
              htmlType="submit"
              loading={isSubmitting}
            >
              Swap
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default App;

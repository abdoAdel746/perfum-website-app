import * as React from "react";
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  required,
  useRecordContext,
  ImageField,
  NumberInput,
  RadioButtonGroupInput,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";
const PreviewImage = ({ record, source }) => {
  return <ImageField record={record} source={source} />;
};
export const Product_create = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput
        label="product name"
        source="product_name"
        validate={required()}
      />
      <TextInput
        label="product image link"
        source="product_image"
        defaultValue="/public/assets/images/products/1/"
        fullWidth
        validate={required()}
      />
      <TextInput
        label="product image background link"
        source="product_image_background"
        defaultValue="/public/assets/images/products/1/"
        fullWidth
        validate={required()}
      />
      <TextInput
        label="product image category link"
        source="product_image_category"
        defaultValue="/public/assets/images/products/1/"
        fullWidth
        validate={required()}
      />
      <TextInput
        label="product description"
        source="product_description"
        multiline
        fullWidth
        validate={required()}
      />
      <NumberInput
        label="product price in usd"
        source="price"
        validate={[required()]}
      />
      <NumberInput
        label="product stoke"
        source="stoke"
        validate={[required()]}
      />
      <NumberInput
        label="product discount"
        source="discount"
        min="0"
        max="100"
        validate={[required()]}
      />
      <NumberInput
        label="product sold count"
        source="sold"
        defaultValue="0"
        validate={[required()]}
      />

      <NumberInput
        max="1"
        min="0"
        label="is new arrival ?"
        source="isNewArrival"
        validate={[required()]}
      />
      <NumberInput
        max="1"
        min="0"
        defaultValue="0"
        label="is recent view?"
        source="recentview"
        validate={[required()]}
      />

      <NumberInput
        max="1"
        min="0"
        defaultValue="0"
        label="is Trending?"
        source="Trending"
        validate={[required()]}
      />

      <NumberInput
        max="1"
        min="0"
        defaultValue="0"
        label="is Recomended?"
        source="isRecomended"
        validate={[required()]}
      />

      <NumberInput
        max="1"
        min="0"
        defaultValue="0"
        label="is Featured?"
        source="isFeatured"
        validate={[required()]}
      />

      <RadioButtonGroupInput
        source="arrival"
        choices={[
          { id: "new", name: "new" },
          { id: "old", name: "old" },
        ]}
        validate={[required()]}
      />
      <RadioButtonGroupInput
        source="trend"
        choices={[
          { id: "yes", name: "yes" },
          { id: "no", name: "no" },
        ]}
        validate={[required()]}
      />
      <RadioButtonGroupInput
        source="color"
        choices={[
          { id: "gold", name: "gold" },
          { id: "orange", name: "orange" },
          { id: "blue", name: "blue" },
        ]}
        validate={[required()]}
      />
      <RadioButtonGroupInput
        source="category"
        choices={[
          { id: "EnchantingFlorals", name: "EnchantingFlorals" },
          { id: "TimelessElegance", name: "TimelessElegance" },
          { id: "OrientalAllure", name: "OrientalAllure" },
          { id: "FreshSerenity", name: "FreshSerenity" },
          { id: "ModernSpice", name: "ModernSpice" },
          { id: "MysticalWoods", name: "MysticalWoods" },
        ]}
        validate={[required()]}
      />
      <RadioButtonGroupInput
        source="brand"
        choices={[
          { id: "LuxeAura", name: "LuxeAura" },
          { id: "OpulentoScents", name: "OpulentoScents" },
          { id: "EtherealElegance", name: "EtherealElegance" },
          { id: "VelvetWhisper", name: "VelvetWhisper" },
          { id: "CelestiaFragrance", name: "CelestiaFragrance" },
        ]}
        validate={[required()]}
      />
    </SimpleForm>
  </Create>
);
const Productitle = () => {
  const record = useRecordContext();
  return <span>{record ? `${record.product_name}` : ""}</span>;
};

export const ProductEdid = (props) => (
  <Edit title={<Productitle />} {...props}>
    <SimpleForm>
      <TextInput disabled label="product Id" source="id" />
      <TextInput
        multiline
        label="product name"
        source="product_name"
        validate={required()}
      />
      <TextInput
        label="product description"
        source="product_description"
        multiline
        fullWidth
        validate={required()}
      />
      <ImageField
        label="product image"
        source="product_image"
        title="product image"
        target="_blank"
      />
      <NumberInput
        label="product price in usd"
        source="price"
        validate={[required()]}
      />
      <NumberInput
        label="product stoke"
        source="stoke"
        validate={[required()]}
      />
      <NumberInput
        label="product discount"
        source="discount"
        min="0"
        max="100"
        validate={[required()]}
      />
      <NumberInput
        max="1"
        min="0"
        label="is new arrival ?"
        source="isNewArrival"
      />
      <RadioButtonGroupInput
        source="category"
        choices={[
          { id: "EnchantingFlorals", name: "EnchantingFlorals" },
          { id: "TimelessElegance", name: "TimelessElegance" },
          { id: "OrientalAllure", name: "OrientalAllure" },
          { id: "FreshSerenity", name: "FreshSerenity" },
          { id: "ModernSpice", name: "ModernSpice" },
          { id: "MysticalWoods", name: "MysticalWoods" },
        ]}
      />
      <RadioButtonGroupInput
        source="brand"
        choices={[
          { id: "LuxeAura", name: "LuxeAura" },
          { id: "OpulentoScents", name: "OpulentoScents" },
          { id: "EtherealElegance", name: "EtherealElegance" },
          { id: "VelvetWhisper", name: "VelvetWhisper" },
          { id: "CelestiaFragrance", name: "CelestiaFragrance" },
        ]}
      />
    </SimpleForm>
  </Edit>
);

export const OrderEdit = (props) => (
  <Edit title="order id" {...props}>
    <SimpleForm>
      <TextInput disabled label="order id" source="orderId" />
      <RadioButtonGroupInput
        source="delivered"
        abel="order status"
        choices={[
          { id: "yes", name: "yes" },
          { id: "no", name: "no" },
        ]}
      />
    </SimpleForm>
  </Edit>
);

export const emailEdit = (props) => (
  <Edit title="email id" {...props}>
    <SimpleForm>
      <TextInput disabled label="email id" source="id" />
      <TextInput label="sender name" source="to_namef" />
      <TextInput label="sender message" source="message" />
    </SimpleForm>
  </Edit>
);

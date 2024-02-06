import React from "react";
import jsonServerProvider from "ra-data-json-server";
import {
  Admin,
  Resource,
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  ReferenceManyCount,
  BooleanField,
  combineDataProviders,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ReferenceManyField,
  FunctionField,
  required,
  ChipField,
} from "react-admin";
import "./admin.scss";
import { superDataProvider } from "./dataproviders";
import { Product_create, ProductEdid, OrderEdit, emailEdit } from "./Product_e";
import { Helmet } from "react-helmet-async";
import authProvider from "./authProvider";

const ItemsList = (props) => (
  <List {...props}>
    <Datagrid
      rowClick="edit"
      sx={{
        "& .column-title": {
          maxWidth: "16em",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
        "& .column-commentable": {
          maxWidth: "4em",
        },
      }}
    >
      <TextField source="id" sx={{ color: "text.disabled" }} />
      <TextField validate={required()} source="product_name" />
      <ChipField source="category" />

      <TextField source="price" />
      <TextField source="stoke" />
      <TextField source="sold" />
    </Datagrid>
  </List>
);

const orderList = (props) => (
  <List {...props}>
    <Datagrid
      rowClick="edit"
      sx={{
        "& .column-title": {
          maxWidth: "16em",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
        "& .column-commentable": {
          maxWidth: "4em",
        },
      }}
    >
      <TextField source="id" sx={{ color: "text.disabled" }} />
      <TextField label="order id" source="orderId" />
      <TextField source="usern_email" />
      <TextField source="usern_name" />
      <TextField label="numeber of products" source="items.length" />
      <TextField source="totalPrice" />
      <TextField source="paymentDate" />
      <TextField label="delevry status" source="delivered" />
    </Datagrid>
  </List>
);

const renderEmailName = () => (
  <span>
    <TextField source="to_namef" /> <TextField source="to_namel" />
  </span>
);

const emailList = (props) => (
  <List {...props}>
    <Datagrid
      rowClick="edit"
      sx={{
        "& .column-title": {
          maxWidth: "16em",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
        "& .column-commentable": {
          maxWidth: "4em",
        },
      }}
    >
      <TextField source="id" sx={{ color: "text.disabled" }} />
      <FunctionField source="to_namef" label="Name" render={renderEmailName} />

      {/* <TextField label="sender name" source="to_namef" /> */}
      <EmailField label="sender email" source="recipient" />
      <TextField label="sender message" source="message" />
    </Datagrid>
  </List>
);

export const Admin_page = () => {
  const dataProvider = jsonServerProvider("http://localhost:8000");

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin page</title>
      </Helmet>
      <Admin
        basename="/admin"
        authProvider={authProvider}
        dataProvider={dataProvider}
      >
        {/* <Resource name="users" list={UserList} /> */}
        <Resource
          name="items"
          create={Product_create}
          edit={ProductEdid}
          list={ItemsList}
        />

        <Resource
          name="orders"
          // create={Product_create}
          edit={OrderEdit}
          list={orderList}
        />
        <Resource
          name="emails"
          // create={Product_create}
          edit={emailEdit}
          list={emailList}
        />
      </Admin>
    </>
  );
};

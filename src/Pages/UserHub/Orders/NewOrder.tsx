import { useState } from "react";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../../../Components/Button";
import { Heading, Text } from "../../../Components/Typography";
import { Input } from "../../../Components/Inputfield";
import Select from "../../../Components/Select";

const storeOptions = [
  { label: "Shein", value: "shein" },
  { label: "Zara", value: "zara" },
  { label: "Fashion Nova", value: "fashion-nova" },
  { label: "Other", value: "other" },
];

const NewOrder = () => {
  const [itemLinks, setItemLinks] = useState([""]);
  const [useSavedAddress, setUseSavedAddress] = useState(true);

  const initialValues = {
    store: "",
    itemLinks: [""],
    address: "",
    useSavedAddress: true,
  };
const validationSchema = Yup.object().shape({
  store: Yup.string().required("Please select a store"),
  itemLinks: Yup.array().of(
    Yup.string().url("Invalid URL").required("Please enter a valid item link")
  ),
  useSavedAddress: Yup.boolean(),
  address: Yup.string().when("useSavedAddress", {
    is: false,
    then: (schema) => schema.required("Please enter your delivery address"),
  }),
});



  const addItem = () => {
    setItemLinks([...itemLinks, ""]);
  };
const handlePaste = (
  e: React.ClipboardEvent<HTMLInputElement>,
  index: number
) => {
  const pastedText = e.clipboardData.getData("text");

  if (pastedText.trim()) {
    // Set current index value

    // Only add new input if this is the last input and it's not empty
    if (index === itemLinks.length - 1) {
    }
  }

  e.preventDefault(); // prevent the default paste into input
};

const handleSubmit = ()=>{

}
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, setFieldValue, touched, errors }) => (
        <Form>
          {/* Step 1: Store */}
          <div className="space-y-2">
            <Heading size="lg" weight="bold">
             Select Store
            </Heading>
            <Select
              name="store"
              options={storeOptions}
              value={values.store}
              onChange={(e) => setFieldValue("store", e.target.value)}
              placeholder="Choose a store"
            />
            {touched.store && errors.store && (
              <Text size="sm" className="text-red-500">
                {errors.store}
              </Text>
            )}
          </div>

          {/* Step 2: Item Links */}
          <div className="space-y-4">
            <Heading size="lg" weight="bold">
             Paste Item Links
            </Heading>
            {values.itemLinks.map((link, index) => (
              <Input
                key={index}
                placeholder={`Item link ${index + 1}`}
                value={link}
                onPaste={(e) => handlePaste(e, index)}
                onChange={(e) => {
                  const newItemLinks = [...values.itemLinks];
                  newItemLinks[index] = e.target.value;
                  setFieldValue("itemLinks", newItemLinks);
                }}
                name={`itemLinks[${index}]`}
              />
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setFieldValue("itemLinks", [...values.itemLinks, ""])
              }
            >
              + Add Item
            </Button>
          </div>

          {/* Step 3: Delivery Info */}
          <div className="space-y-3">
            <Heading size="lg" weight="bold">
               Delivery Info
            </Heading>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={values.useSavedAddress}
                onChange={() => {
                  setFieldValue("useSavedAddress", !values.useSavedAddress);
                  if (!values.useSavedAddress) setFieldValue("address", "");
                }}
              />
              <Text>Use saved address</Text>
            </label>

            {!values.useSavedAddress && (
              <Input
                name="address"
                label="Delivery Address"
                placeholder="Enter your delivery address"
                value={values.address}
                onChange={(e) => setFieldValue("address", e.target.value)}
              />
            )}
            {!values.useSavedAddress && touched.address && errors.address && (
              <Text size="sm" className="text-red-500">
                {errors.address}
              </Text>
            )}
          </div>

          {/* Step 4: Payment CTA */}
          <div className="pt-4">
            <Button variant="primary" type="submit" disabled={isSubmitting}>
             Proceed to Pay
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewOrder;



import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "../../../Components/Button";
import CheckoutFormSection from "./CheckoutForm";
import { Outlet, useNavigate } from 'react-router-dom';

const initialCheckout = {
  store: "",
  itemLink: "",
  address: "",
  useSavedAddress: true,
  fullName: "",
  phone: "",
  email: "",
  state: "",
  lga: "",
};

const validationSchema = Yup.object({
  checkouts: Yup.array().of(
    Yup.object({
      store: Yup.string().required("Select a store"),
      itemLink: Yup.string()
        .required("Paste a valid cart link")
        .test(
          "match-store",
          "Link doesn't match the selected store",
          function (value) {
            const store = this.parent.store;
            const storeDomains: Record<string, string[]> = {
              shein: ["shein.com"],
              zara: ["zara.com"],
              "fashion-nova": ["fashionnova.com"],
              other: [],
            };
            if (!value || !store || store === "other") return true;
            return storeDomains[store]?.some((domain) =>
              value.includes(domain)
            );
          }
        ),
      useSavedAddress: Yup.boolean(),
      fullName: Yup.string().when("useSavedAddress", {
        is: false,
        then: (schema) => schema.required("Enter full name"),
      }),
      phone: Yup.string().when("useSavedAddress", {
        is: false,
        then: (schema) => schema.required("Enter phone number"),
      }),
      email: Yup.string()
        .email("Invalid email")
        .when("useSavedAddress", {
          is: false,
          then: (schema) => schema.required("Enter email"),
        }),
      state: Yup.string().when("useSavedAddress", {
        is: false,
        then: (schema) => schema.required("Select state"),
      }),
      lga: Yup.string().when("useSavedAddress", {
        is: false,
        then: (schema) => schema.required("Select LGA"),
      }),
      address: Yup.string().when("useSavedAddress", {
        is: false,
        then: (schema) => schema.required("Enter address"),
      }),
    })
  ),
});

const NewOrder = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
const handleProceed = () => {
  setLoading(true);

  setTimeout(() => {
    setLoading(false);
    navigate("payment");
  }, 2000); // 2 seconds
};


  return (
    <div className="px-0 md:px-20">
      <Formik
        initialValues={{ checkouts: [initialCheckout] }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Submitted checkouts:", values);
        }}
      >
        {({ values, setFieldValue, isValid }) => (
          <Form>
            {values.checkouts.map((_, index) => (
              <CheckoutFormSection
                key={index}
                index={index}
                checkouts={values.checkouts}
                setFieldValue={setFieldValue}
              />
            ))}

            <div className="pt-4 space-x-4">
              <Button
                type="button"
                variant="primary"
                disabled={!isValid || loading}
                onClick={handleProceed}
                loading={loading}
              >
                Proceed to Pay
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  setFieldValue("checkouts", [
                    ...values.checkouts,
                    initialCheckout,
                  ])
                }
              >
                Add Another Checkout
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};


export default NewOrder;

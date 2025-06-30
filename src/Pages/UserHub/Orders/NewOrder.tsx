import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "../../../Components/Button";
import CheckoutFormSection from "./CheckoutForm";
import {  useNavigate } from 'react-router-dom';
import { storeOptions } from "./ordersHelpers";
import { Heading, Text } from "../../../Components/Typography";
import { AnimatedSection } from "../../LandingPage/LandingPageMain";


const initialCheckout = {
  store: "", // <- important
   checkouts: [
    {
  itemLink: "",
  color: "",
  size: "",
  quantity: 1,
  useSavedAddress: true,
  fullName: "",
  phone: "",
  email: "",
  state: "",
  lga: "",
  address: "",
    }
   ]
};




const validationSchema = Yup.object({
  checkouts: Yup.array().of(
    Yup.object({
      store: Yup.string().required("Select a store"),
      itemLink: Yup.string()
        .trim()
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
      color: Yup.string().required("Required"),
      size: Yup.string().required("Required"),
      quantity: Yup.number().min(1).required("Required"),
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
      localStorage.removeItem("cart2pay_quote_start");
      setLoading(false);
      navigate("payment");
    }, 2000);
  };

  // Create new item that inherits store from first item
  const createNewItem = (existingCheckouts:any) => {
    const firstItemStore =
      existingCheckouts.length > 0 ? existingCheckouts[0].store : "";
    return {
      ...initialCheckout,
      store: firstItemStore, // Inherit store from first item
    };
  };

  return (
           
 <AnimatedSection>
    <div className="px-0 md:px-20">
      
      <Formik
        initialValues={{ checkouts: [initialCheckout] }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Submitted checkouts:", values);
        }}
      >
        {({ values, setFieldValue, isValid, touched }) => (
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
                disabled={isValid || loading }
                onClick={handleProceed}
                loading={loading}
              >
                Proceed
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  const newItem = createNewItem(values.checkouts);
                  setFieldValue("checkouts", [...values.checkouts, newItem]);
                }}
                disabled={!values.checkouts[0]?.store}
              >
                Add Another Item
              </Button>
            </div>

            {/* Show store constraint message */}
            {values.checkouts.length > 1 && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Text size="sm" color="subtle">
                  All items must be from the same store (
                  {storeOptions.find(
                    (option) => option.value === values.checkouts[0]?.store
                  )?.label || "selected store"}
                  ) 
                </Text>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
            </AnimatedSection>

  );
};


export default NewOrder;

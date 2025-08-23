import { useEffect, useRef, useState } from "react";
import { Formik, Form, FieldArray, useFormikContext } from "formik";
import * as Yup from "yup";
import { Button } from "../../../Components/Button";
import { Heading, Text } from "../../../Components/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { colorOptions, sizeOptions, storeOptions } from "./ordersHelpers";
import Select from "../../../Components/Select";
import Modal from "../../../Components/Modal";
import { Input } from "../../../Components/Inputfield";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/state";
import { CreateOrderPayload } from "../../../redux/features/orderManagement/types";
import {
  triggerCreateOrder,
  triggerGetAddreses,
} from "../../../redux/features/orderManagement/orderManagementThunk";
import toast from "react-hot-toast";
import {
  clearFormData,
  resetCreateOrderState,
  updateFormData,
} from "../../../redux/features/orderManagement/orderManagementSlice";
import TextLoader from "../../../Components/TextLoader";
import { triggerGetUserProfile } from "../../../redux/features/UserAccountManagement/userAccountManagementThunk";
import { capitalizeFirstLetter } from "../../../utils";

const initialItem = {
  store: "",
  itemLink: "",
  size: "",
  color: "",
  quantity: "",
  customSize: "",
  customColor: "",
};

const validationSchema = Yup.object({
  store: Yup.string().required("Select a store"),
  items: Yup.array()
    .of(
      Yup.object({
        itemLink: Yup.string()
          .trim()
          .required("Paste a valid cart link")
          .test(
            "match-store",
            "Link doesn't match the selected store",
            function (value) {
              const { store } = this.options.context || {};
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
        quantity: Yup.number()
          .required("Quantity is required")
          .min(1, "Must be at least 1"),
      })
    )
    .min(1, "At least one item is required"),
});

export const NewOrder = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createOrder, addresses, formDataInState } = useSelector(
    (state: RootState) => state.order_management
  );

  const { getUserProfileData } = useSelector(
    (state: RootState) => state.user_account_management
  );
  const dispatch: AppDispatch = useDispatch();
  const selectedAddress = addresses?.data?.results?.find(
    (addr: any) => addr.isDefault === true
  );
  const deliveryFields = {
    fullName:
      `${selectedAddress?.firstName} ${selectedAddress?.lastName}` || "",
    phone: selectedAddress?.phone || "",
    email: selectedAddress?.email || "",
    state: selectedAddress?.state || "",
    lga: selectedAddress?.lga || "",
    address: selectedAddress?.street || "",
  };

  const userData = getUserProfileData.data?.results?.data;

  const handleCreateOrder = (values: any) => {
    const payload: CreateOrderPayload = {
      store: values.store,
      state: selectedAddress?.state,
      lga: selectedAddress?.lga,
      street: selectedAddress?.street,
      first_name: selectedAddress?.firstName,
      last_name: selectedAddress?.lastName,
      phone: selectedAddress?.phone,
      email: userData?.email,
      details: values.items.map((item: any) => ({
        link: item.itemLink,
        variant: {
          size: item.customSize || item.size,
          color: item.customColor || item.color,
          quantity: Number(item.quantity),
        },
      })),
    };

    dispatch(triggerCreateOrder(payload));
  };
  useEffect(() => {
    dispatch(triggerGetAddreses({}));
  }, [dispatch]);
  useEffect(() => {
    dispatch(triggerGetUserProfile({}));
  }, [dispatch]);
  useEffect(() => {
    if (!createOrder.error && createOrder.statusCode === 201) {
      toast.success(createOrder.message);
      dispatch(clearFormData());
      setTimeout(() => {
        localStorage.removeItem("cart2pay_quote_start");
        navigate("/dashboard/orders");
      }, 2000);
    } else if (createOrder.error) {
      toast.error(createOrder.message);
      console.log("order", createOrder.data);
    }
    dispatch(resetCreateOrderState());
  }, [
    createOrder.data,
    createOrder.error,
    createOrder.message,
    createOrder.statusCode,
    dispatch,
    navigate,
  ]);

  const handleNavigation = (formValues: any) => {
    dispatch(updateFormData(formValues));
    navigate("address");
  };

  const persistedData = formDataInState;
  console.log("pd", persistedData);

  return (
    <div className="px-0 md:px-20">
      <Heading size="md" weight="semibold">
        Personal shopper
      </Heading>
      <Formik
        // initialValues={{
        //   store: "",
        //   items: [initialItem],
        //   ...deliveryFields,
        //   ...persistedData,
        // }}
        initialValues={{
          store: persistedData.store || "",
          items: persistedData.items || [initialItem],
          ...deliveryFields,
          ...persistedData,
        }}
        validationSchema={validationSchema}
        onSubmit={handleCreateOrder}
        enableReinitialize={true}
  validateOnChange={true}
  validateOnBlur={true}
      >
        {({ values, setFieldValue, isValid }: any) => (
          <Form>
            <div className="space-y-2 mb-3 pt-8">
              <Heading size="md" weight="light">
                Select Store
              </Heading>
              <Select
                name="store"
                options={storeOptions}
                value={values.store}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFieldValue("store", e.target.value)
                }
                placeholder="Choose a store"
              />
            </div>
            <FieldArray name="items">
              {({ remove, push }) => (
                <>
                  <div className="mb-8 bg-white rounded-xl shadow p-6 space-y-10 text-accent">
                    {values.items.map((item: any, index: any) => (
                      <div className="space-y-2" key={index}>
                        <Heading size="md" weight="semibold">
                          {index + 1}. Product details
                        </Heading>
                        <Text size="sm" color="subtle">
                          If you're providing a cart link, you don't need to
                          fill in the variant fields.
                        </Text>

                        <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
                          <div className="w-full md:basis-1/3">
                            <Text size="md" weight="semibold" className="mb-2">
                              Product/Cart Url
                            </Text>
                            <Input
                              name={`items[${index}].itemLink`}
                              value={item.itemLink}
                              placeholder="Url"
                            />
                          </div>

                          <div className="w-full md:basis-2/3">
                            <Text size="md" weight="semibold" className="mb-2">
                              Variants
                            </Text>
                            <div className="flex flex-col md:flex-row gap-4">
                              {/* Size */}
                              <div className="w-full md:w-1/3">
                                {item.size !== "other" ? (
                                  <Select
                                    name={`items[${index}].size`}
                                    options={sizeOptions}
                                    value={item.size}
                                    onChange={(
                                      e: React.ChangeEvent<HTMLSelectElement>
                                    ) =>
                                      setFieldValue(
                                        `items[${index}].size`,
                                        e.target.value
                                      )
                                    }
                                    placeholder="Size"
                                  />
                                ) : (
                                  <div className="space-y-2">
                                    <Input
                                      name={`items[${index}].customSize`}
                                      placeholder="Enter custom size"
                                      value={item.customSize}
                                      onChange={(e) =>
                                        setFieldValue(
                                          `items[${index}].customSize`,
                                          e.target.value
                                        )
                                      }
                                    />
                                    <button
                                      type="button"
                                      className="text-xs text-blue-500 underline"
                                      onClick={() =>
                                        setFieldValue(
                                          `items[${index}].size`,
                                          ""
                                        )
                                      }
                                    >
                                      Back to size options
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* Color */}
                              <div className="w-full md:w-1/3">
                                {item.color !== "other" ? (
                                  <Select
                                    name={`items[${index}].color`}
                                    options={colorOptions}
                                    value={item.color}
                                    onChange={(
                                      e: React.ChangeEvent<HTMLSelectElement>
                                    ) =>
                                      setFieldValue(
                                        `items[${index}].color`,
                                        e.target.value
                                      )
                                    }
                                    placeholder="Color"
                                  />
                                ) : (
                                  <div className="space-y-2">
                                    <Input
                                      name={`items[${index}].customColor`}
                                      placeholder="Enter custom color"
                                      value={item.customColor}
                                      onChange={(e) =>
                                        setFieldValue(
                                          `items[${index}].customColor`,
                                          e.target.value
                                        )
                                      }
                                    />
                                    <button
                                      type="button"
                                      className="text-xs text-blue-500 underline"
                                      onClick={() =>
                                        setFieldValue(
                                          `items[${index}].color`,
                                          ""
                                        )
                                      }
                                    >
                                      Back to color options
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* Quantity */}
                              <div className="w-full md:w-1/3">
                                <Input
                                  name={`items[${index}].quantity`}
                                  type="number"
                                  placeholder="Quantity"
                                  value={item.quantity}
                                  onChange={(e: any) =>
                                    setFieldValue(
                                      `items[${index}].quantity`,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {values.items.length > 1 && (
                          <div className="flex justify-end">
                            <Button
                              variant="primary"
                              type="button"
                              onClick={() => setIsModalOpen(true)}
                            >
                              Remove Item
                            </Button>
                          </div>
                        )}
                        <Modal
                          isOpen={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                        >
                          <Text size="lg" weight="bold" color="subtle">
                            Are you sure you want to remove this item?
                          </Text>

                          <div className="flex justify-center gap-2 pt-4">
                            <Button
                              variant="secondary"
                              onClick={() => setIsModalOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => {
                                remove(index);
                                setIsModalOpen(false);
                              }}
                            >
                              Yes
                            </Button>
                          </div>
                        </Modal>
                      </div>
                    ))}
                  </div>

                  <div className="pb-8">
                    <Button
                      type="submit"
                      variant="secondary"
                      onClick={() => push(initialItem)}
                    >
                      Add Another Item
                    </Button>
                  </div>
                </>
              )}
            </FieldArray>

            {/* Delivery Info */}
            <div className="space-y-4 mb-8 bg-white rounded-xl shadow p-6 text-accent">
              <Heading size="md" weight="semibold">
                Customer's delivery address
              </Heading>

              {addresses?.data?.results?.length === 0 && !addresses.loading ? (
                // First-time user — no addresses yet
                <Button
                  type="submit"
                  variant="primary"
                  onClick={() => handleNavigation(values)}
                >
                  Add Address
                </Button>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <Text size="md" weight="semibold">
                      First name
                    </Text>
                    <span className="font-light">
                      {selectedAddress?.firstName ? (
                        capitalizeFirstLetter(selectedAddress.firstName)
                      ) : (
                        <TextLoader />
                      )}
                    </span>

                    <Text size="md" weight="semibold">
                      Last name
                    </Text>
                    <span className="font-light">
                      {selectedAddress?.lastName ? (
                        capitalizeFirstLetter(selectedAddress.lastName)
                      ) : (
                        <TextLoader />
                      )}
                    </span>

                    <Text size="md" weight="semibold">
                      State
                    </Text>
                    <span className="font-light">
                      {selectedAddress?.state ? (
                        capitalizeFirstLetter(selectedAddress.state)
                      ) : (
                        <TextLoader />
                      )}
                    </span>

                    <Text size="md" weight="semibold">
                      Lga
                    </Text>
                    <span className="font-light">
                      {selectedAddress?.lga ? (
                        capitalizeFirstLetter(selectedAddress.lga)
                      ) : (
                        <TextLoader />
                      )}
                    </span>

                    <Text size="md" weight="semibold">
                      Street
                    </Text>
                    <span className="font-light">
                      {selectedAddress?.street ? (
                        selectedAddress.street
                      ) : (
                        <TextLoader />
                      )}
                    </span>

                    <Text size="md" weight="semibold">
                      Phone number
                    </Text>
                    <span className="font-light">
                      {selectedAddress?.phone ? (
                        selectedAddress.phone
                      ) : (
                        <TextLoader />
                      )}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="text-xs text-blue-500 underline"
                    onClick={() => handleNavigation(values)}
                  >
                    Change Address
                  </button>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 space-x-4">
              <Button
                type="submit"
                variant="primary"
                disabled={
                  !isValid ||
                  !values.store ||
                  !deliveryFields.address ||
                  !deliveryFields.fullName ||
                  !deliveryFields.state ||
                  !deliveryFields.lga ||
                  !deliveryFields.phone ||
                  !values.items.every(
                    (item: { itemLink: string }) => item.itemLink
                  )
                  //  ||
                  // !values.items.every(
                  //   (item: { quantity: number }) => item.quantity
                  // )
                }
                loading={createOrder.loading}
              >
                Proceed
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewOrder;

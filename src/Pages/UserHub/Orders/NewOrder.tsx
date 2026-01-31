import { useEffect, useRef, useState } from "react";
import { Formik, Form, FieldArray, FormikProps } from "formik";
import * as Yup from "yup";
import { Button } from "../../../Components/Button";
import { Heading, Text } from "../../../Components/Typography";
import { useNavigate } from "react-router-dom";
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
  clearTAndC,
  resetCreateOrderState,
  updateFormData,
  updateTAndC,
} from "../../../redux/features/orderManagement/orderManagementSlice";
import TextLoader from "../../../Components/TextLoader";
import { capitalizeFirstLetter } from "../../../utils";
import Lottie from "lottie-react";
import success from "../../../Animations/success.json";
import {

  MapPinIcon,
  PlusIcon,
  Trash2,
} from "lucide-react";

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
          .required("Enter a valid product link")
          .test(
            "match-store",
            "Link doesn't match the selected store",
            function (value) {
              const { store } = this.options.context || {};
              const storeDomains: Record<string, string[]> = {
                shein: ["shein.com"],
                zara: ["zara.com"],
                "fashion-nova": ["fashionnova.com"],
                primark: ["www.primark.com"],
                asos: ["asos.com"],
              };

              if (!value || !store || store === "other") return true;
              return storeDomains[store]?.some((domain) =>
                value.includes(domain),
              );
            },
          ),
        quantity: Yup.number()
          .required("Quantity is required")
          .min(1, "Must be at least 1"),
      }),
    )
    .min(1, "At least one item is required"),
});

export const NewOrder = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [hasConsented, setHasConsented] = useState(false);
  const formikRef = useRef<FormikProps<any>>(null);
  const [formKey, setFormKey] = useState(Math.random());
  const [itemToRemove, setItemToRemove] = useState<number | null>(null); // Add this

  const { createOrder, addresses, formDataInState, tAndCInState } = useSelector(
    (state: RootState) => state.order_management,
  );
  const dispatch: AppDispatch = useDispatch();
  const selectedAddress = addresses?.data?.results?.find(
    (addr: any) => addr.isDefault === true,
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

  const handleCreateOrder = (values: any) => {
    const payload: CreateOrderPayload = {
      store: values.store,
      state: selectedAddress?.state,
      lga: selectedAddress?.lga,
      street: selectedAddress?.street,
      first_name: selectedAddress?.firstName,
      last_name: selectedAddress?.lastName,
      phone: selectedAddress?.phone,
      details: values.items.map((item: any) => ({
        link: item.itemLink,
        variant: {
          size: item.customSize || item.size,
          color: item.customColor || item.color,
          quantity: Number(item.quantity),
        },
      })),
      tax_duty_acknowledged: hasConsented,
    };

    dispatch(triggerCreateOrder(payload));
  };
  useEffect(() => {
    dispatch(triggerGetAddreses({}));
  }, [dispatch]);

  useEffect(() => {
    if (!createOrder.error && createOrder.statusCode === 201) {
      const orderId = createOrder.data?.results?._id;
      if (orderId) {
        setCreatedOrderId(orderId);
      }
      setHasConsented(false);
      setIsConfirmModalOpen(false);
      dispatch(clearTAndC());
      dispatch(clearFormData());
      setFormKey(Math.random());
      setIsCreateOrderModalOpen(true);
    } else if (createOrder.error) {
      toast.error(createOrder.message);
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

  const handleTandC = (values: any) => {
    const consentData = {
      modalState: isConfirmModalOpen,
      consentState: hasConsented,
    };
    dispatch(updateTAndC(consentData));
    dispatch(updateFormData(values));
    navigate("/terms-of-service#tax-and-duty", {
      state: { acceptTerms: true },
    });
  };

  useEffect(() => {
    if (tAndCInState?.modalState || tAndCInState?.consentState) {
      setIsConfirmModalOpen(tAndCInState.modalState);
      setHasConsented(tAndCInState.consentState);
    }
  }, [tAndCInState]);

  const persistedData = formDataInState;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="px-4 md:px-20 py-4">
          <Heading size="lg" weight="bold" className="text-gray-900">
            Personal Shopper
          </Heading>
          <Text size="md" className="mt-1" >
            Send your shopping request in 3 simple steps
          </Text>
        </div>
      </div>

      <div className="px-4 md:px-20 py-8">
        <Formik
          key={formKey}
          initialValues={{
            store: persistedData.store || "",
            items: persistedData.items || [initialItem],
            ...deliveryFields,
            ...persistedData,
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreateOrder}
          enableReinitialize={false}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, setFieldValue, isValid }: any) => (
            <Form>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content - Left Side */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Step 1: Select Store */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-highlight flex items-center justify-center">
                        1
                      </div>
                      <div>
                        <Heading size="md" weight="semibold">
                          Select Store
                        </Heading>
                        <Text size="md" color="subtle">
                          Choose where you'd like to shop
                        </Text>
                      </div>
                    </div>

                    <Select
                      name="store"
                      options={storeOptions}
                      value={values.store}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setFieldValue("store", e.target.value)
                      }
                      placeholder="Choose a store"
                      className="w-full"
                    />
                  </div>

                  {/* Step 2: Add Products */}
                  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-highlight flex items-center justify-center">
                        <span className="text-secondary font-bold">2</span>
                      </div>
                      <div>
                        <Heading size="md" weight="semibold">
                          Add Products
                        </Heading>
                        <Text size="md" color="subtle">
                          Add items you'd like to shop
                        </Text>
                      </div>
                    </div>

                    <FieldArray name="items">
                      {({ remove, push }) => (
                        <>
                          <div className="space-y-4">
                            {values.items.map((item: any, index: any) => (
                              <div
                                key={index}
                                className="bg-gray-50 rounded-xl p-5 border border-gray-200  transition-colors"
                              >
                                {/* Product Header */}
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <Text size="sm" weight="semibold">
                                      Product {index + 1}
                                    </Text>
                                  </div>

                                  {values.items.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setItemToRemove(index);
                                        setIsModalOpen(true);
                                      }}
                                      className="text-error_light hover:text-error p-2 rounded-lg hover:bg-red-50 transition-colors"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </button>
                                  )}
                                </div>

                                {/* Product URL */}
                                <div className="mb-4">
                                  <Text
                                    size="sm"
                                    weight="medium"
                                    className="mb-2 text-gray-700"
                                  >
                                    Link
                                  </Text>
                                  <Input
                                    name={`items[${index}].itemLink`}
                                    value={item.itemLink}
                                    placeholder="https://store.com/product-link"
                                    className="w-full"
                                  />
                                  <Text
                                    size="xs"
                                    color="subtle"
                                    className="mt-1"
                                  >
                                    Paste the product or cart link from the
                                    store
                                  </Text>
                                </div>

                                {/* Variants Section */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  {/* Size */}
                                  <div>
                                    <Text
                                      size="sm"
                                      weight="medium"
                                      className="mb-2 text-gray-700"
                                    >
                                      Size
                                    </Text>
                                    {item.size !== "other" ? (
                                      <Select
                                        name={`items[${index}].size`}
                                        options={sizeOptions}
                                        value={item.size}
                                        onChange={(
                                          e: React.ChangeEvent<HTMLSelectElement>,
                                        ) =>
                                          setFieldValue(
                                            `items[${index}].size`,
                                            e.target.value,
                                          )
                                        }
                                        placeholder="Select size"
                                      />
                                    ) : (
                                      <div className="space-y-2">
                                        <Input
                                          name={`items[${index}].customSize`}
                                          placeholder="Custom size"
                                          value={item.customSize}
                                          onChange={(e) =>
                                            setFieldValue(
                                              `items[${index}].customSize`,
                                              e.target.value,
                                            )
                                          }
                                        />
                                        <button
                                          type="button"
                                          className="text-xs text-primary hover:underline"
                                          onClick={() =>
                                            setFieldValue(
                                              `items[${index}].size`,
                                              "",
                                            )
                                          }
                                        >
                                          ← Back to options
                                        </button>
                                      </div>
                                    )}
                                  </div>

                                  {/* Color */}
                                  <div>
                                    <Text
                                      size="sm"
                                      weight="medium"
                                      className="mb-2 text-gray-700"
                                    >
                                      Color
                                    </Text>
                                    {item.color !== "other" ? (
                                      <Select
                                        name={`items[${index}].color`}
                                        options={colorOptions}
                                        value={item.color}
                                        onChange={(
                                          e: React.ChangeEvent<HTMLSelectElement>,
                                        ) =>
                                          setFieldValue(
                                            `items[${index}].color`,
                                            e.target.value,
                                          )
                                        }
                                        placeholder="Select color"
                                      />
                                    ) : (
                                      <div className="space-y-2">
                                        <Input
                                          name={`items[${index}].customColor`}
                                          placeholder="Custom color"
                                          value={item.customColor}
                                          onChange={(e) =>
                                            setFieldValue(
                                              `items[${index}].customColor`,
                                              e.target.value,
                                            )
                                          }
                                        />
                                        <button
                                          type="button"
                                          className="text-xs text-primary hover:underline"
                                          onClick={() =>
                                            setFieldValue(
                                              `items[${index}].color`,
                                              "",
                                            )
                                          }
                                        >
                                          ← Back to options
                                        </button>
                                      </div>
                                    )}
                                  </div>

                                  {/* Quantity */}
                                  <div>
                                    <Text
                                      size="sm"
                                      weight="medium"
                                      className="mb-2 text-gray-700"
                                    >
                                      Quantity
                                    </Text>
                                    <Input
                                      name={`items[${index}].quantity`}
                                      type="number"
                                      placeholder="1"
                                      value={item.quantity}
                                      onChange={(e: any) =>
                                        setFieldValue(
                                          `items[${index}].quantity`,
                                          e.target.value,
                                        )
                                      }
                                      min="1"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}

                            {/* Add Another Item Button */}
                            <button
                              type="button"
                              onClick={() => push(initialItem)}
                              className=" rounded-xl hover:border-primary  transition-all flex items-center justify-center gap-1 text-gray-600 hover:text-primary"
                            >
                              <PlusIcon className="w-5 h-5" />
                              <Text size="sm" weight="medium">
                                Add another item
                              </Text>
                            </button>
                          </div>

                          {/* Single Modal outside the map */}
                          <Modal
                            isOpen={isModalOpen}
                            onClose={() => {
                              setIsModalOpen(false);
                              setItemToRemove(null);
                            }}
                          >
                            <div className=" space-y-2 mt-5">
                              <Text size="lg" weight="normal">
                                Are you sure you want to remove this item?
                              </Text>

                              <div className="flex justify-center gap-3">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setIsModalOpen(false);
                                    setItemToRemove(null);
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    if (itemToRemove !== null) {
                                      remove(itemToRemove);
                                    }
                                    setIsModalOpen(false);
                                    setItemToRemove(null);
                                  }}
                                >
                                  Proceed
                                </Button>
                              </div>
                            </div>
                          </Modal>
                        </>
                      )}
                    </FieldArray>
                  </div>

                  {/* Step 3: Delivery Address */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-highlight flex items-center justify-center">
                        <span className="text-secondary font-bold">3</span>
                      </div>
                      <div>
                        <Heading size="md" weight="semibold">
                          Shipping Address
                        </Heading>
                        <Text size="md" color="subtle">
                          Where should we deliver your items?
                        </Text>
                      </div>
                    </div>

                    {addresses?.data?.results?.length === 0 &&
                    !addresses.loading ? (
                      <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                        <div className="w-12 h-12 rounded-full bg-highlight flex items-center justify-center mx-auto mb-3">
                          <MapPinIcon className="w-6 h-6 text-secondary" />
                        </div>
                        <Text size="md" className="mb-4">
                          No shipping address saved yet
                        </Text>
                        <Button
                          type="button"
                          variant="primary"
                          onClick={() => handleNavigation(values)}
                          className="w-auto"
                        >
                          Add Shipping Address
                        </Button>
                      </div>
                    ) : (
                      <div className=" rounded-xl p-5 border border-primary/20">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="w-5 h-5 text-primary" />
                            <Text
                              size="sm"
                              weight="semibold"
                              className="text-primary"
                            >
                              Shipping Address
                            </Text>
                          </div>
                          <button
                            type="button"
                            className="text-xs text-primary hover:underline font-medium"
                            onClick={() => handleNavigation(values)}
                          >
                            Change
                          </button>
                        </div>

                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Text
                              size="sm"
                              weight="semibold"
                              className="text-gray-700 min-w-[100px]"
                            >
                              Name:
                            </Text>
                            <Text size="sm" className="text-gray-900">
                              {selectedAddress?.firstName &&
                              selectedAddress?.lastName ? (
                                `${capitalizeFirstLetter(selectedAddress.firstName)} ${capitalizeFirstLetter(selectedAddress.lastName)}`
                              ) : (
                                <TextLoader />
                              )}
                            </Text>
                          </div>

                          <div className="flex gap-2">
                            <Text
                              size="sm"
                              weight="semibold"
                              className="text-gray-700 min-w-[100px]"
                            >
                              Address:
                            </Text>
                            <Text size="sm" className="text-gray-900">
                              {selectedAddress?.street || <TextLoader />}
                            </Text>
                          </div>

                          <div className="flex gap-2">
                            <Text
                              size="sm"
                              weight="semibold"
                              className="text-gray-700 min-w-[100px]"
                            >
                              Location:
                            </Text>
                            <Text size="sm" className="text-gray-900">
                              {selectedAddress?.lga &&
                              selectedAddress?.state ? (
                                `${capitalizeFirstLetter(selectedAddress.lga)}, ${capitalizeFirstLetter(selectedAddress.state)}`
                              ) : (
                                <TextLoader />
                              )}
                            </Text>
                          </div>

                          <div className="flex gap-2">
                            <Text
                              size="sm"
                              weight="semibold"
                              className="text-gray-700 min-w-[100px]"
                            >
                              Phone:
                            </Text>
                            <Text size="sm" className="text-gray-900">
                              {selectedAddress?.phone || <TextLoader />}
                            </Text>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Summary Sidebar - Right Side */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                    <Heading size="md" weight="semibold" className="mb-4">
                      Order Summary
                    </Heading>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <Text size="sm" color="subtle">
                          Store
                        </Text>
                        <Text size="sm" weight="medium">
                          {values.store ? (
                            storeOptions.find((s) => s.value === values.store)
                              ?.label
                          ) : (
                            <span className="text-gray-400">Not selected</span>
                          )}
                        </Text>
                      </div>

                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <Text size="sm" color="subtle">
                          Products
                        </Text>
                        <Text size="sm" weight="medium">
                          {
                            values.items.filter((item: any) => item.itemLink)
                              .length
                          }{" "}
                          {values.items.filter((item: any) => item.itemLink)
                            .length === 1
                            ? "product"
                            : "products"}
                        </Text>
                      </div>

                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <Text size="sm" color="subtle">
                          Total Quantity
                        </Text>
                        <Text size="sm" weight="medium">
                          {values.items.reduce((total: number, item: any) => {
                            const quantity = parseInt(item.quantity) || 0;
                            return total + quantity;
                          }, 0)}{" "}
                          {values.items.reduce(
                            (total: number, item: any) =>
                              total + (parseInt(item.quantity) || 0),
                            0,
                          ) === 1
                            ? "item"
                            : "items"}
                        </Text>
                      </div>
                    </div>

                    <Button
                      type="button"
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
                          (item: { itemLink: string }) => item.itemLink,
                        )
                      }
                      loading={createOrder.loading}
                      onClick={() => setIsConfirmModalOpen(true)}
                      className="w-full"
                    >
                      Proceed to Order
                    </Button>

                    <Text size="xs" color="subtle" className="text-center mt-3">
                      By proceeding, you agree to our terms and conditions
                    </Text>
                  </div>
                </div>
              </div>

              <Modal
                isOpen={isCreateOrderModalOpen}
                onClose={() => setIsCreateOrderModalOpen(false)}
                className="w-full max-w-sm"
              >
                <div className="w-full flex flex-col items-center justify-center text-center p-4 sm:p-6">
                  <Lottie
                    animationData={success}
                    loop={true}
                    style={{ width: 80, height: 80 }}
                  />

                  <Text
                    size="lg"
                    weight="semibold"
                    className="mt-2"
                    color="primary"
                  >
                    Thank you for your order!
                  </Text>

                  <Text
                    size="sm"
                    weight="normal"
                    className="mt-2"
                    color="subtle"
                  >
                    We’re reviewing your order and will update you shortly.
                  </Text>

                  <div className="flex justify-center gap-4 mt-6 w-full mb-3">
                    <Button
                      className="w-auto "
                      variant="primary"
                      onClick={() => {
                        setIsModalOpen(false);
                        navigate(
                          `/dashboard/orders/order-details/${createdOrderId}`,
                        );
                      }}
                    >
                      See order details
                    </Button>
                    <Button
                      className="w-auto "
                      variant="outline"
                      onClick={() => {
                        dispatch(clearFormData());

                        // Reset Formik form to initial values

                        formikRef.current?.resetForm({
                          values: {
                            store: "",
                            items: [initialItem],
                            ...deliveryFields,
                          },
                        });

                        setIsCreateOrderModalOpen(false);
                      }}
                    >
                      Create new order
                    </Button>
                  </div>
                </div>
              </Modal>

              <Modal
                isOpen={isConfirmModalOpen}
                onClose={() => {
                  setIsConfirmModalOpen(false);
                  setHasConsented(false);
                  dispatch(clearTAndC());
                }}
                className="
  w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%]
  max-w-md
 
  flex flex-col justify-center items-center
"
              >
                <div className="flex flex-col justify-center items-center">
                  <Text size="lg" weight="bold" className="mb-2">
                    Tax & Duties Information
                  </Text>

                  <Text
                    size="sm"
                    weight="normal"
                    color="subtle"
                    className="text-center"
                  >
                    Your order may be subject to customs and import charges. If
                    applicable, these will be shown in your order quote.
                    <span
                      className="text-primary_dark cursor-pointer font-medium"
                      onClick={() => handleTandC(values)}
                    >
                      {" "}
                      Learn more
                    </span>
                  </Text>

                  {/* Consent Checkbox */}
                  <label className="flex items-start gap-2 mt-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasConsented}
                      onChange={(e) => setHasConsented(e.target.checked)}
                      className="w-4 h-4 mt-0.5 cursor-pointer"
                    />
                    <span className="text-xs text-gray-700">
                      I understand there may be tax and duty fees on my order
                    </span>
                  </label>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsConfirmModalOpen(false);
                        setHasConsented(false);
                        dispatch(clearTAndC());
                      }}
                      className="w-auto"
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      variant="primary"
                      loading={createOrder.loading}
                      className="w-auto"
                      disabled={!hasConsented}
                    >
                      Create order
                    </Button>
                  </div>
                </div>
              </Modal>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewOrder;

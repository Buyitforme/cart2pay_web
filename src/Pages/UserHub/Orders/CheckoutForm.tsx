import { useState } from "react";
import { Button } from "../../../Components/Button";
import { Heading, Text } from "../../../Components/Typography";
import { Input } from "../../../Components/Inputfield";
import Select from "../../../Components/Select";
import { lgaOptions, stateOptions, storeOptions } from "./ordersHelpers";
import Modal from "../../../Components/Modal"; 

type CheckoutFormSectionProps = {
  index: number;
  checkouts: any[];
  setFieldValue: (field: string, value: any) => void;
};

const CheckoutFormSection = ({
  index,
  checkouts,
  setFieldValue,
}: CheckoutFormSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const checkout = checkouts[index];

  const handleRemove = () => {
    const newCheckouts = [...checkouts];
    newCheckouts.splice(index, 1);
    setFieldValue("checkouts", newCheckouts);
    setIsModalOpen(false);
  };

  return (
    <div className="mb-8 bg-white rounded-xl shadow p-6 space-y-10 text-accent">
      <div className="space-y-2">
        <Heading size="md" weight="semibold">
          Select Store
        </Heading>
        <Select
          name={`checkouts[${index}].store`}
          options={storeOptions}
          value={checkout.store}
          onChange={(e) =>
            setFieldValue(`checkouts[${index}].store`, e.target.value)
          }
          placeholder="Choose a store"
        />
      </div>

      {/* Cart Link */}
      <div className="space-y-4">
        <Heading size="md" weight="semibold">
          Paste Cart link
        </Heading>
        <Input
          name={`checkouts[${index}].itemLink`}
          placeholder="Paste cart link from selected store"
          value={checkout.itemLink}
       
        />
      </div>

      {/* Delivery Info */}
      <div className="space-y-4">
        <Heading size="md" weight="semibold">
          Delivery Info
        </Heading>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={checkout.useSavedAddress}
            onChange={() =>
              setFieldValue(
                `checkouts[${index}].useSavedAddress`,
                !checkout.useSavedAddress
              )
            }
          />
          <Text>Use saved address</Text>
        </label>

        {!checkout.useSavedAddress && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name={`checkouts[${index}].fullName`}
              label="Full Name"
              value={checkout.fullName}
            
            />
            <Input
              name={`checkouts[${index}].phone`}
              label="Phone"
              value={checkout.phone}
              type="number"
            />
            <Input
              name={`checkouts[${index}].email`}
              label="Email"
              placeholder="Enter email"
            />

            <Select
              name={`checkouts[${index}].state`}
              label="State"
              options={stateOptions}
              value={checkout.state}
              onChange={(e) => {
                setFieldValue(`checkouts[${index}].state`, e.target.value);
                setFieldValue(`checkouts[${index}].lga`, "");
              }}
              placeholder="Select your state"
            />
            <Select
              name={`checkouts[${index}].lga`}
              label="LGA"
              options={lgaOptions[checkout.state] || []}
              value={checkout.lga}
              onChange={(e) =>
                setFieldValue(`checkouts[${index}].lga`, e.target.value)
              }
              placeholder="Select your LGA"
            />
            <Input
              name={`checkouts[${index}].address`}
              label="Delivery Address"
              value={checkout.address}
            />
          </div>
        )}
      </div>

      {/* Remove Button */}
      {checkouts.length > 1 && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="destructive"
            onClick={() => setIsModalOpen(true)}
          >
            Remove Checkout
          </Button>
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Text size="lg" weight="bold">
          Are you sure?
        </Text>
        <Text size="md" color="subtle">
          This action cannot be undone.
        </Text>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleRemove}>
            Yes, Remove
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutFormSection;

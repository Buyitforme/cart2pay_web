import { useEffect, useState } from "react";
import { Button } from "../../../Components/Button";
import { Heading, Text } from "../../../Components/Typography";
import { Input } from "../../../Components/Inputfield";
import Select from "../../../Components/Select";
import Modal from "../../../Components/Modal";
import ProductPreviewCard from "./ProductPreviewCard";
import { colorOptions, sizeOptions, quantityOptions, storeOptions } from "./ordersHelpers";

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
    const updatedCheckouts = [...checkouts];
    updatedCheckouts.splice(index, 1);
    setFieldValue("checkouts", updatedCheckouts);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (
      checkout.itemLink &&
      checkout.itemLink !== checkout.itemLink.toLowerCase()
    ) {
      setFieldValue(
        `checkouts[${index}].itemLink`,
        checkout.itemLink.toLowerCase()
      );
    }
  }, [checkout.itemLink, index, setFieldValue]);

  return (
    <div className="mb-8 bg-white rounded-xl shadow p-6 space-y-10 text-accent">
      <div>
        <Heading size="md" weight="semibold">
          Choose a store
        </Heading>
        <Select
          name={`checkouts[${index}].store`} // ✅ Correct
          options={storeOptions}
          value={checkout.store}
          onChange={(e) =>
            setFieldValue(`checkouts[${index}].store`, e.target.value)
          }
          placeholder="Choose a store"
        />
      </div>

      {/* Product Section */}
      <div className="space-y-3">
        <Heading size="md" weight="semibold">
          Product Details
        </Heading>

        <Input
          name={`checkouts[${index}].itemLink`}
          label="Product Link"
          placeholder="Paste individual product link"
          value={checkout.itemLink}
        />

        {checkout.itemLink && (
          <ProductPreviewCard url={checkout.itemLink} className="w-fit py-6" />
        )}

        <div className="grid md:grid-cols-3 gap-4">
          <Select
            name={`checkouts[${index}].color`}
            options={colorOptions}
            value={checkout.color}
            onChange={(e) =>
              setFieldValue(`checkouts[${index}].color`, e.target.value)
            }
            placeholder="Choose a color"
          />
          <Select
            name={`checkouts[${index}].size`}
            options={sizeOptions}
            value={checkout.size}
            onChange={(e) =>
              setFieldValue(`checkouts[${index}].size`, e.target.value)
            }
            placeholder="Select size"
          />
          <Select
            name={`checkouts[${index}].quantity`}
            options={quantityOptions}
            value={checkout.quantity}
            onChange={(e) =>
              setFieldValue(`checkouts[${index}].quantity`, e.target.value)
            }
            placeholder="Choose quantity"
          />
        </div>
      </div>

      {/* Remove Button */}
      {checkouts.length > 1 && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="destructive"
            onClick={() => setIsModalOpen(true)}
          >
            Remove Item
          </Button>
        </div>
      )}

      {/* Remove Modal */}
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

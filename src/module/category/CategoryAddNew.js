import { Button } from "components/button";
import Radio from "components/checkbox/Radio";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { db } from "firebase-app/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { categoryStatus } from "utils/constants";

const CategoryAddNew = () => {
  const {
    control,
    setValue,
    reset,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createAt: new Date(),
    },
  });

  const watchStatus = watch("status");
  const handleAddNewCategory = async (values) => {
    const cloneValue = { ...values };
    cloneValue.slug = slugify(values.slug || values.name, { lower: true });
    const colRef = collection(db, "categories");

    try {
      await addDoc(colRef, {
        ...cloneValue,
        status: Number(cloneValue.status),
        createAt: serverTimestamp(),
      });

      toast.success("Create category successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({ name: "", slug: "", status: 1, createAt: new Date() });
    }
  };

  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)}>
        <div className="flex gap-20 form-layout">
          <Field className="flex-1">
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            ></Input>
          </Field>
          <Field className="flex-1">
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                value={categoryStatus.UNAPPROVED}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          padding="20px"
          fontSize="16px"
          maxWidth="200px"
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;

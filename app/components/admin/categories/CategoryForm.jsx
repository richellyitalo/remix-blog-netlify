import {
  Form,
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";
import Title from "../shared/Title";

export default function CategoryForm() {
  const errors = useActionData();
  const navigation = useNavigation();
  const params = useParams();
  const matches = useMatches();

  const isSubmitting = navigation.state !== "idle";
  const isEditing = params.categoryId !== undefined;

  let category = undefined;
  if (isEditing) {
    const categories = matches.find(
      (match) => match.id === "routes/admin/categories"
    ).data;

    category = categories.find((category) => category.id === params.categoryId);
  }

  const defaultValues =
    category !== undefined
      ? {
          name: category.name,
        }
      : {
          name: "",
        };

  if (isEditing && !category) {
    return (
      <>
        <h3 className="mb-2 text-red-400">Theres no category with this ID.</h3>
        <p className="mb-3 border-b-3 border-slate-300 border-b-2 pb-3">
          You can add a new category by{" "}
          <Link
            to="../add"
            className="text-purple-500 font-bold hover:text-purple-400"
          >
            clicking here.
          </Link>
        </p>
        <Link
          to=".."
          className="pt-1"
        >
          Close this panel
        </Link>
      </>
    );
  }

  return (
    <>
      <Title className="text-center">
        {isEditing ? "Edit Category" : "New Category"}
      </Title>
      <Form
        method={isEditing ? "patch" : "post"}
        className="form-data"
        autocomplete="off"
      >
        <p>
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={defaultValues.name}
          />
        </p>

        {errors && errors.name && (
          <p className="text-red-500 text-xs mb-3">{errors.name}</p>
        )}

        <p className="flex justify-end my-2">
          <Link
            to=".."
            className="pt-1"
          >
            Cancel
          </Link>
          <button
            className={`p-1 px-2 rounded-md ml-2 ${
              isSubmitting ? "bg-gray-300" : "bg-green-300 hover:bg-green-400"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "...Saving" : "Save"}
          </button>
        </p>
      </Form>
    </>
  );
}

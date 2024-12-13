import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

import { getAllCategories } from "../api/categorie";
import { addNewListing } from "../api/listing";

// Define the schema using Zod
const listingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Price must be greater than 0")
  ),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["available", "unavailable"], {
    errorMap: () => ({ message: "Select a valid status" }),
  }),
  image: z.string().url("Must be a valid URL"),
  capacity: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Capacity must be greater than 0")
  ),
  numberOfRooms: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Number of rooms must be greater than 0")
  ),
  numberOfBathrooms: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Number of bathrooms must be greater than 0")
  ),
  amenities: z.array(z.string()).nonempty("At least one amenity is required"),
  category: z.string().nonempty("Category is required"),
});

const AddListingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hostId, setHostId] = useState("");
  const [categories, setCategories] = useState([]);
  const [amenityInput, setAmenityInput] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const storedHostId = JSON.parse(localStorage.getItem("user"));
    if (storedHostId) {
      setHostId(storedHostId.userId);
    }
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(listingSchema),
    defaultValues: { amenities: [] },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const listingData = {
        ...data,
        hostId,
        availableFrom: new Date(Date.now()),
        availableTo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      };
      console.log("Form submitted with data: ", listingData);
      addNewListing(listingData).then(() => {
        toast({
          title: "Listing Created",
          description: "Your listing has been created successfully!",
          type: "success",
        });
      });
      // reset();
    } catch (error) {
      toast({
        title: "Error Creating Listing",
        description: error.message,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddAmenity = () => {
    if (amenityInput.trim() !== "") {
      const currentAmenities = getValues("amenities");
      const updatedAmenities = [...currentAmenities, amenityInput.trim()];
      setValue("amenities", updatedAmenities); // Update the form state
      setAmenityInput(""); // Clear the input
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Field */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                id="title"
                placeholder="Enter title"
                {...field}
                className="mt-1"
              />
            )}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Location Field */}
        <div>
          <Label htmlFor="location">Location</Label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Input
                id="location"
                placeholder="Enter location"
                {...field}
                className="mt-1"
              />
            )}
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Price Field */}
        <div>
          <Label htmlFor="price">Price</Label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input
                id="price"
                placeholder="Enter price"
                {...field}
                className="mt-1"
                type="number"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                id="description"
                placeholder="Enter description"
                {...field}
                className="mt-1"
              />
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Status Field */}
        <div>
          <Label htmlFor="status">Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value || ""}
                id="status"
                className="mt-1"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>

        {/* Image Field */}
        <div>
          <Label htmlFor="image">Image URL</Label>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <Input
                id="image"
                placeholder="Enter image URL"
                {...field}
                className="mt-1"
              />
            )}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Capacity Field */}
        <div>
          <Label htmlFor="capacity">Capacity</Label>
          <Controller
            name="capacity"
            control={control}
            render={({ field }) => (
              <Input
                id="capacity"
                placeholder="Enter capacity"
                {...field}
                className="mt-1"
                type="number"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
          {errors.capacity && (
            <p className="text-red-500 text-sm">{errors.capacity.message}</p>
          )}
        </div>

        {/* Rooms Field */}
        <div>
          <Label htmlFor="numberOfRooms">Number of Rooms</Label>
          <Controller
            name="numberOfRooms"
            control={control}
            render={({ field }) => (
              <Input
                id="numberOfRooms"
                placeholder="Enter number of rooms"
                {...field}
                className="mt-1"
                type="number"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
          {errors.rooms && (
            <p className="text-red-500 text-sm">{errors.rooms.message}</p>
          )}
        </div>

        {/* Bathrooms Field */}
        <div>
          <Label htmlFor="numberOfBathrooms">Number of Bathrooms</Label>
          <Controller
            name="numberOfBathrooms"
            control={control}
            render={({ field }) => (
              <Input
                id="numberOfBathrooms"
                placeholder="Enter number of bathrooms"
                {...field}
                className="mt-1"
                type="number"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
          {errors.bathrooms && (
            <p className="text-red-500 text-sm">{errors.bathrooms.message}</p>
          )}
        </div>

        {/* Amenities Field */}
        <div>
          <Label htmlFor="amenities">Amenities</Label>
          <div className="flex items-center gap-2">
            <Input
              id="amenity-input"
              placeholder="Add amenity"
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              className="mt-1"
            />
            <Button type="button" onClick={handleAddAmenity}>
              Add
            </Button>
          </div>
          <ul className="mt-2">
            {getValues("amenities").map((amenity, index) => (
              <li key={index} className="text-sm text-gray-700">
                {amenity}
              </li>
            ))}
          </ul>
          {errors.amenities && (
            <p className="text-red-500 text-sm">{errors.amenities.message}</p>
          )}
        </div>

        {/* Categories Field */}
        <div>
          <Label htmlFor="category">Category</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value || ""}
                id="category"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full max-w-xs"
          >
            {isSubmitting ? "Submitting..." : "Create Listing"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddListingForm;

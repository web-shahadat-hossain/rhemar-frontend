"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { FiUpload, FiSave, FiRefreshCw, FiEye, FiTrash2 } from "react-icons/fi";

export default function BrandAdmin() {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState("");
  const [activeTab, setActiveTab] = useState("content");
  const [hasChanges, setHasChanges] = useState(false);

  const [formData, setFormData] = useState({
    subtitle: "",
    title: "",
    highlightedWord: "",
    descriptionOne: "",
    descriptionTwo: "",
    year: "",
    buttonText: "",
    buttonLink: "",
  });

  const [image, setImage] = useState<File | null>(null);
  console.log(formData);
  // Fetch existing data on component mount
  useEffect(() => {
    fetchBrandData();
  }, []);

  // Track changes
  useEffect(() => {
    setHasChanges(true);
  }, [formData, image]);

  const fetchBrandData = async () => {
    try {
      setFetchLoading(true);
      const response = await fetch(`http://localhost:5010/api/brand`);
      const data = await response.json();

      const brand = data.data || data;

      if (brand) {
        setFormData({
          subtitle: brand.subtitle || "",
          title: brand.title || "",
          highlightedWord: brand.highlightedWord || "",
          descriptionOne: brand.descriptionOne || "",
          descriptionTwo: brand.descriptionTwo || "",
          year: brand.year || "",
          buttonText: brand.buttonText || "",
          buttonLink: brand.buttonLink || "",
        });
        setExistingImage(data.image || "");
      }
    } catch (error) {
      toast.error("Failed to fetch brand data");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string" || reader.result === null) {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    setExistingImage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          data.append(key, value);
        }
      });

      if (image) {
        data.append("image", image);
      }

      const response = await fetch(`http://localhost:5010/api/brand`, {
        method: "PUT",
        body: data,
      });

      const result = await response.json();
      console.log(result);
      if (result) {
        toast.success("Brand Story Updated Successfully!");
        await fetchBrandData(); // Refresh data
        setImagePreview(null);
        setImage(null);
        setHasChanges(false);
      } else {
        toast.error(result.message || "Failed to update");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all changes?")) {
      fetchBrandData();
      setImagePreview(null);
      setImage(null);
      setHasChanges(false);
      toast.success("Changes reverted");
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-accent/30 border-t-accent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-accent/20 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary luxury-gradient py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Gold Accent */}
        <div className="mb-8 relative">
          <div className="absolute left-0 top-0 w-1 h-full bg-accent"></div>
          <div className="pl-6">
            <h1 className="font-heading text-4xl md:text-5xl text-secondary mb-2">
              Brand Story
              <span className="text-accent ml-3">Settings</span>
            </h1>
            <p className="text-muted font-sans text-lg">
              Craft your brand narrative with elegance
            </p>
          </div>

          {/* Status Indicators */}
          <div className="absolute top-0 right-0 flex items-center space-x-4">
            {hasChanges && (
              <span className="flex items-center px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse mr-2"></span>
                Unsaved changes
              </span>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 border-b border-charcoal">
          {["content", "media", "button"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-6 py-3 font-heading text-sm uppercase tracking-wider transition-premium
                ${
                  activeTab === tab
                    ? "text-accent border-b-2 border-accent"
                    : "text-muted hover:text-secondary"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Content Tab */}
          {activeTab === "content" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Subtitle Card */}
                <div className="bg-charcoal/50 backdrop-blur-sm rounded-lg border border-charcoal overflow-hidden group hover:border-accent/30 transition-premium">
                  <div className="px-6 py-4 border-b border-charcoal">
                    <h2 className="font-heading text-xl text-secondary">
                      Subtitle
                    </h2>
                  </div>
                  <div className="p-6">
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleInputChange}
                      placeholder="e.g., Our Story"
                      className="w-full px-4 py-3 bg-primary border border-charcoal rounded-md text-secondary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-premium placeholder-muted/50"
                    />
                    <p className="mt-2 text-xs text-muted">
                      A brief introduction to your brand story
                    </p>
                  </div>
                </div>

                {/* Title Card */}
                <div className="bg-charcoal/50 backdrop-blur-sm rounded-lg border border-charcoal overflow-hidden group hover:border-accent/30 transition-premium">
                  <div className="px-6 py-4 border-b border-charcoal">
                    <h2 className="font-heading text-xl text-secondary">
                      Title & Highlight
                    </h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., The Journey of Excellence"
                      className="w-full px-4 py-3 bg-primary border border-charcoal rounded-md text-secondary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-premium placeholder-muted/50"
                    />
                    <div>
                      <input
                        type="text"
                        name="highlightedWord"
                        value={formData.highlightedWord}
                        onChange={handleInputChange}
                        placeholder="Word to highlight"
                        className="w-full px-4 py-3 bg-primary border border-charcoal rounded-md text-secondary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-premium placeholder-muted/50"
                      />
                      <p className="mt-2 text-xs text-muted">
                        This word will be highlighted in{" "}
                        <span className="text-accent">gold</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Description */}
              <div className="bg-charcoal/50 backdrop-blur-sm rounded-lg border border-charcoal overflow-hidden group hover:border-accent/30 transition-premium">
                <div className="px-6 py-4 border-b border-charcoal">
                  <h2 className="font-heading text-xl text-secondary">
                    Description
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <textarea
                    name="descriptionOne"
                    value={formData.descriptionOne}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      const { name, value } = e.target;
                      setFormData((prev) => ({
                        ...prev,
                        [name]: value,
                      }));
                    }}
                    rows={4}
                    placeholder="First paragraph of your brand story..."
                    className="w-full px-4 py-3 bg-primary border border-charcoal rounded-md text-secondary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-premium placeholder-muted/50 resize-none"
                  />
                  <textarea
                    name="descriptionTwo"
                    value={formData.descriptionTwo}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      const { name, value } = e.target;
                      setFormData((prev) => ({
                        ...prev,
                        [name]: value,
                      }));
                    }}
                    rows={4}
                    placeholder="Second paragraph of your brand story..."
                    className="w-full px-4 py-3 bg-primary border border-charcoal rounded-md text-secondary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-premium placeholder-muted/50 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === "media" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Year Card */}
              <div className="bg-charcoal/50 backdrop-blur-sm rounded-lg border border-charcoal overflow-hidden group hover:border-accent/30 transition-premium">
                <div className="px-6 py-4 border-b border-charcoal">
                  <h2 className="font-heading text-xl text-secondary">Year</h2>
                </div>
                <div className="p-6">
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="e.g., Since 2020"
                    className="w-full px-4 py-3 bg-primary border border-charcoal rounded-md text-secondary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-premium placeholder-muted/50"
                  />
                </div>
              </div>

              {/* Image Card */}
              <div className="bg-charcoal/50 backdrop-blur-sm rounded-lg border border-charcoal overflow-hidden group hover:border-accent/30 transition-premium lg:col-span-2">
                <div className="px-6 py-4 border-b border-charcoal">
                  <h2 className="font-heading text-xl text-secondary">
                    Brand Image
                  </h2>
                </div>
                <div className="p-6">
                  {/* Image Preview */}
                  {(imagePreview || existingImage) && (
                    <div className="mb-6 relative group/image">
                      <div className="relative w-full h-80 rounded-lg overflow-hidden border border-charcoal">
                        <Image
                          src={imagePreview || existingImage}
                          alt="Brand preview"
                          fill
                          className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity"></div>

                        {/* Remove Image Button */}
                        {(imagePreview || existingImage) && (
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-4 right-4 p-2 bg-red-500/20 backdrop-blur-sm text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-premium"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Upload Area */}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-charcoal rounded-lg cursor-pointer hover:border-accent hover:bg-accent/5 transition-premium group"
                    >
                      <FiUpload className="w-8 h-8 text-muted group-hover:text-accent mb-2" />
                      <span className="text-sm text-muted group-hover:text-accent">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-xs text-muted/50 mt-1">
                        SVG, PNG, JPG (max. 5MB)
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Button Tab */}
          {activeTab === "button" && (
            <div className="bg-charcoal/50 backdrop-blur-sm rounded-lg border border-charcoal overflow-hidden group hover:border-accent/30 transition-premium">
              <div className="px-6 py-4 border-b border-charcoal">
                <h2 className="font-heading text-xl text-secondary">
                  Button Settings
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-heading text-muted mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    name="buttonText"
                    value={formData.buttonText}
                    onChange={handleInputChange}
                    placeholder="e.g., Learn More"
                    className="w-full px-4 py-3 bg-primary border border-charcoal rounded-md text-secondary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-premium placeholder-muted/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-heading text-muted mb-2">
                    Button Link
                  </label>
                  <input
                    type="url"
                    name="buttonLink"
                    value={formData.buttonLink}
                    onChange={handleInputChange}
                    placeholder="e.g., /about or https://example.com"
                    className="w-full px-4 py-3 bg-primary border border-charcoal rounded-md text-secondary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-premium placeholder-muted/50"
                  />
                </div>

                {/* Preview */}
                <div className="lg:col-span-2 mt-4">
                  <p className="text-sm text-muted mb-3">Preview:</p>
                  <button
                    type="button"
                    className="group relative px-8 py-3 bg-transparent border border-accent text-accent hover:bg-accent hover:text-primary transition-premium overflow-hidden"
                  >
                    <span className="relative z-10 font-heading tracking-wider">
                      {formData.buttonText || "Button Text"}
                    </span>
                    <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-charcoal">
            <button
              type="button"
              onClick={handleReset}
              disabled={!hasChanges || loading}
              className={`
                px-8 py-3 border border-charcoal text-muted rounded-md
                hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/50
                transition-premium font-heading tracking-wider
                ${!hasChanges || loading ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <FiRefreshCw className="inline-block mr-2 -mt-1" />
              Reset
            </button>

            <button
              type="submit"
              disabled={loading || !hasChanges}
              className={`
                group relative px-8 py-3 bg-accent text-primary font-heading tracking-wider rounded-md
                overflow-hidden transition-premium
                ${loading || !hasChanges ? "opacity-50 cursor-not-allowed" : "hover:bg-accent/90"}
              `}
            >
              <span className="relative z-10 flex items-center">
                {loading ? (
                  <>
                    <FiRefreshCw className="animate-spin mr-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <FiSave className="mr-2 group-hover:scale-110 transition-transform" />
                    Save Changes
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left mix-blend-overlay"></div>
            </button>
          </div>
        </form>

        {/* Default Data Indicator */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted">
            {existingImage
              ? "Brand story data exists"
              : "No existing data - will create new entry"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  Save,
  Plus,
  Trash,
  Upload,
  AlertCircle,
} from "lucide-react";

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
    location: "",
    bio: "",
    profileImage: "",

    // Skills section
    skills: [{ name: "", level: 50 }],

    // Projects section
    projects: [{ name: "", description: "" }],

    // Achievements section
    achievements: [""],
  });

  // Fetch current user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/users/profile");

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        // Populate form with existing data
        setFormData({
          name: data.name || "",
          username: data.username || "",
          email: data.email || "",
          role: data.role || "",
          location: data.location || "",
          bio: data.bio || "",
          profileImage: data.profileImage || "",
          skills: data.skills?.length ? data.skills : [{ name: "", level: 50 }],
          projects: data.projects?.length
            ? data.projects
            : [{ name: "", description: "" }],
          achievements: data.achievements?.length ? data.achievements : [""],
        });
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle skill changes
  const handleSkillChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setFormData({ ...formData, skills: updatedSkills });
  };

  // Add new skill
  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: "", level: 50 }],
    });
  };

  // Remove skill
  const removeSkill = (index: number) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updatedSkills });
  };

  // Handle project changes
  const handleProjectChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setFormData({ ...formData, projects: updatedProjects });
  };

  // Add new project
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { name: "", description: "" }],
    });
  };

  // Remove project
  const removeProject = (index: number) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };

  // Handle achievement changes
  const handleAchievementChange = (index: number, value: string) => {
    const updatedAchievements = [...formData.achievements];
    updatedAchievements[index] = value;
    setFormData({ ...formData, achievements: updatedAchievements });
  };

  // Add new achievement
  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, ""],
    });
  };

  // Remove achievement
  const removeAchievement = (index: number) => {
    const updatedAchievements = formData.achievements.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, achievements: updatedAchievements });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Remove any empty entries
    const cleanFormData = {
      ...formData,
      skills: formData.skills.filter((skill) => skill.name.trim() !== ""),
      projects: formData.projects.filter(
        (project) => project.name.trim() !== ""
      ),
      achievements: formData.achievements.filter(
        (achievement) => achievement.trim() !== ""
      ),
    };

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setSuccess(true);

      // Redirect after successful update
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) {
    return (
      <div className="container mx-auto flex h-screen items-center justify-center py-8">
        <div className="text-center">
          <div className="mx-auto size-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-2xl font-bold">Edit Profile</h1>

        {error && (
          <div className="mb-6 flex items-center rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            <AlertCircle className="mr-2 size-5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 rounded border border-green-200 bg-green-50 px-4 py-3 text-green-700">
            Profile updated successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Basic Information</h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                  disabled
                />
                <p className="mt-1 text-xs text-gray-500">
                  You cannot change your email address
                </p>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="City, Country"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  rows={4}
                  placeholder="Tell us about yourself, your expertise, and experience..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Skills</h2>
              <button
                type="button"
                onClick={addSkill}
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="mr-1 size-4" /> Add Skill
              </button>
            </div>

            {formData.skills.map((skill, index) => (
              <div key={index} className="mb-4 flex items-center gap-4">
                <div className="grow">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) =>
                      handleSkillChange(index, "name", e.target.value)
                    }
                    placeholder="Skill name (e.g. Python, React, Machine Learning)"
                    className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={skill.level}
                      onChange={(e) =>
                        handleSkillChange(index, "level", e.target.value)
                      }
                      className="mr-4 w-full"
                    />
                    <span className="w-12 text-sm text-gray-600">
                      {skill.level}%
                    </span>
                  </div>
                </div>
                {formData.skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="size-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Projects Section */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Projects</h2>
              <button
                type="button"
                onClick={addProject}
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="mr-1 size-4" /> Add Project
              </button>
            </div>

            {formData.projects.map((project, index) => (
              <div
                key={index}
                className="mb-4 rounded-md border border-gray-200 p-4"
              >
                <div className="flex justify-between">
                  <div className="grow">
                    <div className="mb-3">
                      <label className="mb-1 block text-sm font-medium">
                        Project Name
                      </label>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) =>
                          handleProjectChange(index, "name", e.target.value)
                        }
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Description
                      </label>
                      <textarea
                        value={project.description}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                        rows={2}
                      ></textarea>
                    </div>
                  </div>
                  {formData.projects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      <Trash className="size-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Achievements Section */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Achievements</h2>
              <button
                type="button"
                onClick={addAchievement}
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="mr-1 size-4" /> Add Achievement
              </button>
            </div>

            {formData.achievements.map((achievement, index) => (
              <div key={index} className="mb-3 flex items-center gap-3">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) =>
                    handleAchievementChange(index, e.target.value)
                  }
                  className="grow rounded-md border border-gray-300 px-3 py-2"
                  placeholder="e.g. Best Paper Award, Certification, Competition Winner"
                />
                {formData.achievements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAchievement(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="size-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? (
                <>
                  <div className="mr-2 size-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="mr-2 size-5" />
                  <span>Save Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

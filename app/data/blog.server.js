import { prisma } from "./database.server";

function isValidInputTitle(title) {
  return title && title.trim().length > 0 && title.trim().length < 60;
}

function isValidContent(content) {
  return content && content.trim().length > 0;
}

export function validatePostRequest(input) {
  let validationErrors = {};

  if (!isValidInputTitle(input.title)) {
    validationErrors.title = "Title is required. Provide until 60 characters.";
  }

  if (!isValidContent(input.content)) {
    validationErrors.content = "Content is required";
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}

/**
 * Posts
 */

export async function getPosts({ limit = null, userId = null} = {}) {
  try {
    let paramsFind = {
      orderBy: { createdAt: "desc" },
      include: {
        categories: true,
      },
    };
    if (limit) {
      paramsFind["take"] = limit;
    }

    if (userId) {
      paramsFind["where"] = { userId };
    }


    return await prisma.post.findMany(paramsFind);
  } catch (error) {
    console.log(error.message)
    throw new Error("Failed to get posts");
  }
}

export async function getPost(id) {
  try {
    return await prisma.post.findUniqueOrThrow({
      where: { id },
      include: {
        categories: true,
      },
    });
  } catch (error) {
    throw new Error("Failed to get post");
  }
}

export async function addPost(postData, userId) {
  try {
    return await prisma.post.create({
      data: {
        title: postData.title,
        content: postData.content,
        categories: {
          connect: postData?.categories.map((id) => ({ id })),
        },
        user: {
          connect: { id: userId },
        },
      },
    });
  } catch (error) {
    throw new Error("Failed to add post");
  }
}

export async function updatePost(id, postData) {
  try {
    return await prisma.post.update({
      where: { id },
      data: {
        title: postData.title,
        content: postData.content,
        categories: {
          set: postData?.categories.map((id) => ({ id })),
        },
      },
    });
  } catch (error) {
    throw new Error("Failed to add post");
  }
}

export async function deletePost(id) {
  try {
    return await prisma.post.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error("Failed to delete post");
  }
}

export function validateCategoryRequest(input) {
  let validationErrors = {};

  if (!isValidInputTitle(input.name)) {
    validationErrors.name = "Title is required. Provide until 60 characters.";
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}

/**
 * Categories
 */

export async function addCategory(categoryData) {
  try {
    return await prisma.category.create({
      data: categoryData,
    });
  } catch (error) {
    throw new Error("Failed to add category");
  }
}

export async function updateCategory(id, categoryData) {
  try {
    return await prisma.category.update({
      where: {
        id,
      },
      data: {
        name: categoryData.name,
      },
    });
  } catch (error) {
    throw new Error("Failed to update category");
  }
}

export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        posts: true,
      },
    });
  } catch (error) {
    throw new Error("Failed to get category");
  }
}

export async function getCategory(categoryId) {
  try {
    return await prisma.category.findUniqueOrThrow({
      where: { id: categoryId },
      include: {
        posts: true,
      },
    });
  } catch (error) {
    throw new Error("Failed to get category");
  }
}

export async function deleteCategory(id) {
  try {
    return await prisma.category.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error("Failed to delete category");
  }
}

import prisma from "../db/prismaClient.js";


export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "ProductId is required",
      });
    }

    // check if item already exists
    const existingItem = await prisma.cart.findFirst({
      where: {
        userId: req.user.id,
        productId: Number(productId),
      },
    });

    if (existingItem) {
      const updated = await prisma.cart.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + (quantity || 1),
        },
        include: {
          product: true
        }
      });

      return res.status(200).json(updated);
    }

    const cartItem = await prisma.cart.create({
      data: {
        userId: req.user.id,
        productId: Number(productId),
        quantity: quantity || 1,
      },
      include: {
        product: true
      }
    });

    res.status(201).json(cartItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to add item",
      error: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        product: true, // 🔥 join product data
      },
    });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const deleted = await prisma.cart.deleteMany({
      where: {
        id,
        userId: req.user.id,
      },
    });

    res.status(200).json({
      message: "Item deleted",
      deleted,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const EmptyCart = async (req, res) => {
  try {
    await prisma.cart.deleteMany({
      where: {
        userId: req.user.id,
      },
    });

    res.status(200).json({
      message: "Cart emptied successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Issue",
    });
  }
};
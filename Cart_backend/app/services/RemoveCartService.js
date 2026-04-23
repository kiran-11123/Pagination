import prisma from "../../global/db.js";




export const RemoveItemsService = async(user_id, cart_id, item_id) => {
    try {
        // Verify the cart belongs to this user
        const userCart = await prisma.cart.findUnique({
            where: {
                user_id: user_id
            }
        });

        if (!userCart) {
            throw new Error('Cart not found for this user');
        }

        // Verify the provided cart_id matches the user's cart
        if (userCart.Cart_id !== cart_id) {
            throw new Error('Cart does not belong to this user');
        }

        // Delete the specific cart item
        const deletedItem = await prisma.cartItem.delete({
            where: {
                id: item_id
            }
        });

        return deletedItem;
    } catch (err) {
        throw err;
    }
}
// export const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${baseDevelopUrl}/marketplace/category-list/`);
//       setCategories(response.data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
// };

// export  const fetchProducts = async () => {
//     try {
//       const response = await axios.get(`${baseDevelopUrl}/marketplace/products/?on_main_page=true`);
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
// };

// export const fetchSlider = async () => {
//     try {
//       const response = await axios.get(`${baseDevelopUrl}/marketplace/slider/`);
//       setSlider(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
// };

// export const toggleCategories = () => {
//     setShowCategories(!showCategories);
// };

// export const handleAddToCart = async (productId) => {
//     const accessToken = localStorage.getItem('accessToken');
    
//     if (!accessToken) {
//         console.error('No access token found');
//         return;
//     };

//     try {
//         const response = await fetch(`${baseDevelopUrl}/marketplace/carts/add-to-cart/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${accessToken}`,
//             },
//           body: JSON.stringify({ product_id: productId }),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             toast.success('Товар успешно добавлен в корзину!');
//         } else {
//             const errorData = await response.json();
//             toast.success('Произошла ошибка при попытке добавить товар в корзину');
//         }
//     } catch (error) {
//         console.error('Error adding product to cart:', error);
//     }
// };

function BackendImage({ src, alt, ...props }) {
    const backendBaseUrl = 'http://localhost:8020';
    const imageUrl = `${backendBaseUrl}${src}`;
    return <img src={imageUrl} alt={alt} {...props} />;
  }
  export default BackendImage;
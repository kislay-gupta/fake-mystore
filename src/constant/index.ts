export interface ProductProps {
  quantity: number;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export interface CartProductProps extends ProductProps {
  quantity: number;
}
export type MenuLink = {
  route: string;
  label: string;
};

export const menuLink: MenuLink[] = [
  {
    route: "/category/men's clothing",
    label: "Men",
  },
  {
    route: "/category/women's clothing",
    label: "women",
  },

  {
    route: "/category/electronics",
    label: "electronics",
  },
  {
    route: "/category/jewelery",
    label: "jewelery",
  },
];

export const url = "https://fakestoreapi.com/products";

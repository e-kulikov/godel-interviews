interface Ability {
  ability: {
    name: string;
  };
}
const parseAbilities = ({ abilities }: { abilities: Ability[] }) =>
  abilities.map(({ ability }) => ability.name);

interface Sprites {
  front_default: string;
}
const parsePicture = ({ sprites }: { sprites: Sprites }) =>
  sprites.front_default;

export interface Customer {
  name: string;
}

export interface CustomerListResponse {
  results: Customer[];
}
export const parseCustomersList = ({
  results,
}: CustomerListResponse): Customer[] => results;

export interface CustomerData extends Customer {
  id: number;
  height: number;
  weight: number;
  abilities: string[];
  picture: string;
}
export type CustomerResponse = CustomerData & {
  abilities: Ability[];
  sprites: Sprites;
};
export const parseCustomerData = ({
  name,
  id,
  height,
  weight,
  ...customer
}: CustomerResponse): CustomerData => ({
  id,
  name,
  height,
  weight,
  abilities: parseAbilities(customer),
  picture: parsePicture(customer),
});

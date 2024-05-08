interface Ability {
  ability: {
    name: string;
  };
}

interface Move {
  move: {
    name: string;
  }
}

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  }
}

interface Type {
  type: {
    name: string;
  }
}

const parseAbilities = ({ abilities }: { abilities: Ability[] }) =>
  abilities.map(({ ability }) => ability.name);

const parseMoves = ({ moves }: { moves: Move[] }) => 
  moves.map(({ move }) => move.name);

const parseTypes = ({ types }: { types: Type[] }) =>
  types.map(({ type }) => type.name)

const parseStats = ({ stats }: { stats: Stat[] }) =>
  stats.map(({ stat, base_stat }) => ({
    name: stat.name,
    value: base_stat
  }))

interface Sprites {
  front_default: string;
}
const parsePicture = ({ sprites }: { sprites: Sprites }) =>
  sprites.front_default;

export interface Customer {
  name: string;
  id: number;
}

export interface CustomerListResponse {
  clients: Customer[];
}
export const parseCustomersList = ({
  clients,
}: CustomerListResponse): Customer[] => clients;

export interface CustomerData extends Customer {
  id: number;
  height: number;
  weight: number;
  abilities: string[];
  picture: string;
  moves: string[];
  types: string[];
  stats: { name: string; value: number }[]
}
export interface CustomerResponse {
  client: CustomerData & {
    abilities: Ability[];
    sprites: Sprites;
    moves: Move[];
    stats: Stat[];
    types: Type[];
  }
}
export const parseCustomerData = ({
  client: { name,
    id,
    height,
    weight,
    ...customer }
}: CustomerResponse): CustomerData => ({
  id,
  name,
  height,
  weight,
  abilities: parseAbilities(customer),
  picture: parsePicture(customer),
  moves: parseMoves(customer),
  types: parseTypes(customer),
  stats: parseStats(customer)
});
